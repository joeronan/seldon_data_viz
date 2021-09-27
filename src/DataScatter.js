import React from 'react'

import { VictoryChart, VictoryZoomContainer, VictoryScatter, VictoryTooltip } from 'victory'

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

const DataScatter = ({ data, fillColumn, zoomDomain, setZoomDomain }) => {

  return (
    <VictoryChart width={1000} height={1000}
      containerComponent={
        <VictoryZoomContainer
          zoomDomain={zoomDomain}
          onZoomDomainChange={setZoomDomain}
        />
      }
    >
      <VictoryScatter
        labelComponent={<VictoryTooltip />}
        labels={({ datum }) => datum[fillColumn]}
        data={data}
        style={{
          data: { fill: ({ datum }) => (colorDictionary[datum[fillColumn]]) }
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
  )
}

export default DataScatter
