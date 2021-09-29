import React from 'react'
import { VictoryChart, VictoryHistogram, VictoryBrushContainer, VictoryAxis } from 'victory'

const HistController = ({ live, timeDomain, setTimeDomain }) => {
  return (
    <VictoryChart
      padding={{ top: 0, left: 50, right: 50, bottom: 30 }}
      width={600} height={100} scale={{ x: "time" }}
      containerComponent={
        <VictoryBrushContainer
          brushDimension="x"
          brushDomain={timeDomain}
          onBrushDomainChangeEnd={setTimeDomain}
        />
      }
    >
      <VictoryAxis />

      <VictoryHistogram
        data={live.slice(0, 1000)}
        bins={20}
        x={(d) => d['timestamp']}
      />

    </VictoryChart>
  )
}

export default React.memo(HistController)
