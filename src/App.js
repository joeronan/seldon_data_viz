import './App.css';
import reference from './data/reference.json'
import live from './data/live.json'
import { VictoryChart, VictoryHistogram, VictoryZoomContainer, VictoryBrushContainer, VictoryAxis, VictoryScatter } from 'victory'
import { useEffect, useState } from 'react';
import moment from 'moment';

function App() {

  const minTime = Math.min.apply(Math, live.map((d) => moment(d['timestamp'], 'DD-MM-YYYY HH:mm:ss.SSSSSS')))
  const maxTime = Math.max.apply(Math, live.map((d) => moment(d['timestamp'], 'DD-MM-YYYY HH:mm:ss.SSSSSS')))

  const minDate = new Date(minTime)
  const maxDate = new Date(maxTime)

  const [zoomDomain, setZoomDomain] = useState({ x: [-25, 25], y: [-25, 25] })
  const [timeDomain, setTimeDomain] = useState({ x: [minDate, maxDate] })

  const [slicedLiveData, setSlicedLiveData] = useState(live)

  useEffect(() => {
    setSlicedLiveData(live.filter((d) => moment(d['timestamp'], 'DD-MM-YYYY HH:mm:ss.SSSSSS') > timeDomain.x[0] && moment(d['timestamp'], 'DD-MM-YYYY HH:mm:ss.SSSSSS') < timeDomain.x[1]))
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
    <div className="App">
      <div style={{ width: '50vw', height: '100vh', position: 'absolute', left: 0 }}>
        <VictoryChart width={1000} height={1000}
          containerComponent={
            <VictoryZoomContainer
              zoomDomain={zoomDomain}
              onZoomDomainChange={setZoomDomain}
            // downsample={500}
            />
          }
        >
          <VictoryScatter
            data={reference.slice(0, 1000)}
            style={{
              data: { fill: ({ datum }) => (colorDictionary[datum['truth']]) }
            }}
            x={(d) => (d[0])}
            y={(d) => (d[1])}
          />

          <VictoryScatter
            style={{
              data: { fill: 'white' }
            }}
            data={[{ x: 25, y: 25 }, { x: -25, y: -25 }]}
            x='x'
            y='y'
          />
        </VictoryChart>
      </div>

      <div style={{ width: '50vw', height: '100vh', position: 'absolute', right: 0 }}>
        <VictoryChart width={1000} height={1000}
          containerComponent={
            <VictoryZoomContainer
              zoomDomain={zoomDomain}
              onZoomDomainChange={setZoomDomain}
            // downsample={500}
            />
          }
        >
          <VictoryScatter
            data={slicedLiveData}
            style={{
              data: { fill: ({ datum }) => (colorDictionary[datum['prediction']]) }
            }}
            x={(d) => (d[0])}
            y={(d) => (d[1])}
          />

          <VictoryScatter
            style={{
              data: { fill: 'white' }
            }}
            data={[{ x: 25, y: 25 }, { x: -25, y: -25 }]}
            x='x'
            y='y'
          />
        </VictoryChart>
      </div>

      {/* Second Chart */}

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
            bins={50}
            x={(d) => (moment(d['timestamp'], 'DD-MM-YYYY HH:mm:ss.SSSSSS'))}
          // x={(d) => (Date.parse(d['timestamp']))}
          />
        </VictoryChart>
      </div>
    </div>
  );
}

export default App;
