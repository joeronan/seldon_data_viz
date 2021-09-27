import './App.css';
import rawReference from './data/reference.json'
import rawLive from './data/live.json'
import { VictoryChart, VictoryHistogram, VictoryBrushContainer, VictoryAxis } from 'victory'
import { useEffect, useState } from 'react';
import moment from 'moment';
import sampleSize from 'lodash.samplesize'
import DataScatter from './DataScatter'

const reference = sampleSize(rawReference, 400)
const live = sampleSize(rawLive, 1000)

const minTime = Math.min.apply(Math, live.map((d) => moment(d['timestamp'], 'DD-MM-YYYY HH:mm:ss.SSSSSS')))
const maxTime = Math.max.apply(Math, live.map((d) => moment(d['timestamp'], 'DD-MM-YYYY HH:mm:ss.SSSSSS')))

const minDate = new Date(minTime)
const maxDate = new Date(maxTime)

function App() {

  const [showText, setShowText] = useState(true)

  const [zoomDomain, setZoomDomain] = useState({ x: [-25, 25], y: [-25, 25] })
  const [timeDomain, setTimeDomain] = useState({ x: [minDate, maxDate] })

  const [referenceData, setReferenceData] = useState(reference)
  const [liveData, setLiveData] = useState(live)

  useEffect(() => {
    setLiveData(live.filter((d) => moment(d['timestamp'], 'DD-MM-YYYY HH:mm:ss.SSSSSS') > timeDomain.x[0] && moment(d['timestamp'], 'DD-MM-YYYY HH:mm:ss.SSSSSS') < timeDomain.x[1]))
  }, [timeDomain])

  const colorDictionary = {
    'ankle boot': '#000000',
    't-shirt': '#111111',
    'dress': '#222222',
    'pullover': '#333333',
    'sneaker': '#444444',
    'sandal': '#555555',
    'trouser': '#666666',
    'shirt': '#777777',
    'coat': '#888888',
    'bag': '#999999',
  }

  return (
    <div>
      <div style={{ width: '50vw', height: '100vh', position: 'absolute', left: 0 }}>
        <DataScatter data={referenceData} fillColumn={'truth'} zoomDomain={zoomDomain} setZoomDomain={setZoomDomain} />
      </div>

      <div style={{ width: '50vw', height: '100vh', position: 'absolute', right: 0 }}>
        <DataScatter data={liveData} fillColumn={'prediction'} zoomDomain={zoomDomain} setZoomDomain={setZoomDomain} />
      </div>

      <div style={{ width: '100vw', height: '10vh', position: 'absolute', bottom: 0 }}>
        <VictoryChart
          padding={{ top: 0, left: 50, right: 50, bottom: 30 }}
          width={600} height={100} scale={{ x: "time" }}
          containerComponent={
            <VictoryBrushContainer
              brushDimension="x"
              brushDomain={timeDomain}
              onBrushDomainChange={setTimeDomain}
            />
          }
        >
          <VictoryAxis />

          <VictoryHistogram
            data={live}
            bins={20}
            x={(d) => (moment(d['timestamp'], 'DD-MM-YYYY HH:mm:ss.SSSSSS'))}
          // x={(d) => (Date.parse(d['timestamp']))}
          />
        </VictoryChart>
      </div>

      {showText && <div style={{ position: 'absolute', width: '60vw', maxHeight: '80vh', overflowY: 'auto', top: 0, left: 0, padding: '30px 20px 20px 20px', backgroundColor: 'coral' }}>
        <h2>Controls:</h2>
        <ul>
          <li>The two scatter plots can be panned by clicking and dragging. They can be zoomed using the scroll wheel.</li>
          <li>The shaded area of the histogram can be manipulated to observe the live results at different time periods.</li>
        </ul>

        <h2>Observations:</h2>
        <ul>
          <li>On Saturday 4th there's a significant drop in all readings, as shown by the histogram at the bottom.</li>
          <li>On Monday 6th the t-shirt cluster jumps from being around (-5, 2) to (-8, 5). This move can be located in space using the two plots side-by-side, can be located in time using the histogram selector, and the product can be identified using color & tooltips.</li>
          <li>On Tuesday 7th a new pullover cluster appears around (15, -5). This is observed using the methods described above.</li>
        </ul>

        <h2>Thing's I'd change in production:</h2>
        <ul>
          <li>Currently the results are not performant, I would switch over to canvas rendering (most likely using the Nivo package). I chose not to do this for the task as implementing the histogram brush + panning and zooming would have taken much longer in canvas. This is because canvas can easily handle drawing elements but struggles with removing them (necessary for the histogram brush) & manipulating them (necessary for the panning & zooming)</li>
          <li>Ask the date format to be changed to be ISO 8601 compliant</li>
          <li>Add in controls for downsampling</li>
        </ul>
      </div>}

      <button
        style={{ position: 'absolute', top: 0, left: 0, height: 40, width: 40, backgroundColor: 'coral' }}
        onClick={() => { setShowText(!showText) }}
      >{showText ? '-' : '+'}</button>

    </div >
  );
}

export default App;
