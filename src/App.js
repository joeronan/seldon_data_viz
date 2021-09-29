import React from 'react'
import rawReference from './data/reference.json'
import rawLive from './data/live.json'
import moment from 'moment';
import DataScatter from './DataScatter'
import HistController from './HistController';
import Notes from './Notes';
import shuffle from 'lodash.shuffle'

const reference = shuffle(rawReference)
const live = shuffle(rawLive).map((d) => ({ '0': d[0], '1': d[1], 'timestamp': moment(d['timestamp'], 'DD-MM-YYYY HH:mm:ss.SSSSSS'), 'prediction': d['prediction'] }))

const minTime = Math.min.apply(Math, live.map((d) => d['timestamp']))
const maxTime = Math.max.apply(Math, live.map((d) => d['timestamp']))

const minDate = new Date(minTime)
const maxDate = new Date(maxTime)

function App() {

  const [zoomDomain, setZoomDomain] = React.useState({ x: [-25, 25], y: [-25, 25] })
  const [timeDomain, setTimeDomain] = React.useState({ x: [minDate, maxDate] })

  const [liveData, setLiveData] = React.useState(live)

  React.useEffect(() => {
    setLiveData(live.filter((d) => d['timestamp'] > timeDomain.x[0] && d['timestamp'] < timeDomain.x[1]))
  }, [timeDomain])

  return (
    <>
      <div style={{ width: '50vw', height: '100vh', position: 'absolute', left: 0 }}>
        <h1 style={{ paddingLeft: '20px' }}>Reference:</h1>
        <DataScatter data={reference} fillColumn={'truth'} zoomDomain={zoomDomain} setZoomDomain={setZoomDomain} />
      </div>

      <div style={{ width: '50vw', height: '100vh', position: 'absolute', right: 0 }}>
        <h1 style={{ paddingLeft: '20px' }}>Live:</h1>
        <DataScatter data={liveData} fillColumn={'prediction'} zoomDomain={zoomDomain} setZoomDomain={setZoomDomain} />

        <div style={{ height: '10vh', position: 'relative', bottom: 0 }}>
          <HistController live={live} timeDomain={{ x: [minDate, maxDate] }} setTimeDomain={setTimeDomain} />
        </div>
      </div>

      <Notes />

    </>
  );
}

export default App;
