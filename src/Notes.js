import React from 'react'

const Notes = () => {

  const [showText, setShowText] = React.useState(true)

  return (
    <>
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
    </>
  )
}

export default Notes
