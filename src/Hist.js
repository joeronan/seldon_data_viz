import React from 'react'
import { VictoryChart, VictoryHistogram, VictoryBrushContainer, VictoryAxis } from 'victory'
import moment from 'moment';

const Hist = ({ live }) => {
  return (
    <>
      <VictoryAxis />

      <VictoryHistogram
        data={live.slice(0, 100)}
        bins={20}
        x={(d) => (moment(d['timestamp'], 'DD-MM-YYYY HH:mm:ss.SSSSSS'))}
      />
    </>
  )
}

export default React.memo(Hist)
