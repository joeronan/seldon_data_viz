import React from 'react'
import { VictoryChart, VictoryZoomContainer, VictoryScatter, VictoryTooltip, VictoryTheme } from 'victory'
import Slider, { createSliderWithTooltip } from 'rc-slider';
import 'rc-slider/assets/index.css';

const SliderWithTooltip = createSliderWithTooltip(Slider);

const colorDictionary = {
  'ankle boot': '#fff100',
  't-shirt': '#ff8c00',
  'dress': '#e81123',
  'pullover': '#ec008c',
  'sneaker': '#68217a',
  'sandal': '#00188f',
  'trouser': '#00bcf2',
  'shirt': '#00b294',
  'coat': '#009e49',
  'bag': '#bad80a',
}

const updateCentroidData = (data, fillColumn) => {
  const resultsList = []
  Object.keys(colorDictionary).forEach((item) => {
    const itemData = data.filter((x) => (x[fillColumn] === item))
    const resultsDict = {}
    resultsDict[fillColumn] = `centroid: ${item}`
    resultsDict[0] = itemData.reduce((a, b) => a + b[0], 0) / itemData.length
    resultsDict[1] = itemData.reduce((a, b) => a + b[1], 0) / itemData.length
    resultsList.push(resultsDict)
  })
  return resultsList
}

const DataScatter = ({ data, fillColumn, zoomDomain, setZoomDomain }) => {

  const [sampleSize, setSampleSize] = React.useState(300)

  const [scatterData, setScatterData] = React.useState(data.slice(0, sampleSize))
  React.useEffect(() => { setScatterData(data.slice(0, sampleSize)) }, [data, sampleSize])

  const [centroidData, setCentroidData] = React.useState(updateCentroidData(data, fillColumn))
  React.useEffect(() => { setCentroidData(updateCentroidData(data, fillColumn)) }, [data, fillColumn])

  return (
    <>
      <div style={{ width: '50vw', height: 'min(40vw,70vh)' }}>
        <VictoryChart width={1000} height={1000}
          padding={{ top: 0, bottom: 0, left: 0, right: 0 }}
          containerComponent={
            <VictoryZoomContainer
              zoomDomain={zoomDomain}
              onZoomDomainChange={setZoomDomain}
            />
          }
          theme={VictoryTheme.material}
        >

          {/* Main Scatter */}
          <VictoryScatter
            labelComponent={<VictoryTooltip style={{ fontSize: '25px', fontFamily: 'monospace' }} />}
            labels={({ datum }) => datum[fillColumn]}
            data={scatterData}
            style={{
              data: { fill: ({ datum }) => (colorDictionary[datum[fillColumn]]) }
            }}
            x={(d) => (d[0])}
            y={(d) => (d[1])}
          />

          {/* Centroid Scatter */}
          <VictoryScatter
            labelComponent={<VictoryTooltip style={{ fontSize: '25px', fontFamily: 'monospace' }} />}
            labels={({ datum }) => datum[fillColumn]}
            data={centroidData}
            style={{
              data: {
                fill: ({ datum }) => (colorDictionary[datum[fillColumn].slice(10)]),
                stroke: "#000000",
                strokeWidth: 3,
              }
            }}
            x={(d) => (d[0])}
            y={(d) => (d[1])}
            size={10}
          />

          {/* Making sure the plot is large enough */}
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

      <div style={{ margin: 'auto', width: '50%', padding: '10px 0 10px 0' }}>
        Number of points sampled: {sampleSize}
        <SliderWithTooltip
          min={100}
          step={100}
          max={4000}
          defaultValue={300}
          onAfterChange={(d) => { setSampleSize(d) }} />
      </div>
    </>
  )
}

export default React.memo(DataScatter)
