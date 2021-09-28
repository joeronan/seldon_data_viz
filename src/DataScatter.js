import React from 'react'
import { VictoryChart, VictoryZoomContainer, VictoryScatter, VictoryTooltip } from 'victory'
import shuffle from 'lodash.shuffle'

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

const updateCentroidData = (data, fillColumn) => {
  const resultsList = []
  Object.keys(colorDictionary).forEach((item) => {
    const itemData = data.filter((x) => (x[fillColumn] == item))
    const resultsDict = {}
    resultsDict[fillColumn] = item
    resultsDict[0] = itemData.reduce((a, b) => a + b[0], 0) / itemData.length
    resultsDict[1] = itemData.reduce((a, b) => a + b[1], 0) / itemData.length
    resultsList.push(resultsDict)
  })
  return resultsList
}

const DataScatter = ({ data, fillColumn, zoomDomain, setZoomDomain }) => {

  const [sampleSize, setSampleSize] = React.useState(100)

  const [scatterData, setScatterData] = React.useState(data.slice(0, sampleSize))
  React.useEffect(() => { setScatterData(data.slice(0, sampleSize)) }, [data, sampleSize])

  const [centroidData, setCentroidData] = React.useState(updateCentroidData(data, fillColumn))
  React.useEffect(() => { setCentroidData(updateCentroidData(data, fillColumn)) }, [data])

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
        data={centroidData}
        style={{
          data: {
            fill: ({ datum }) => (colorDictionary[datum[fillColumn]]),
            stroke: "#c43a31",
            strokeWidth: 3,
          }
        }}
        x={(d) => (d[0])}
        y={(d) => (d[1])}
        size={10}
      />

      <VictoryScatter
        labelComponent={<VictoryTooltip />}
        labels={({ datum }) => datum[fillColumn]}
        data={scatterData}
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

export default React.memo(DataScatter)
