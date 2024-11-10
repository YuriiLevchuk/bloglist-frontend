import { Component, useState } from "react"

const Togglable = (props) => {
  const { children, label } = props
  const [ visible, setVisible ] = useState(false)
  
  // button handlers //
  const toggleVisibility = () => 
    setVisible(x => !x)

  // set visibility for elements //
  const childrenStyle = visible 
   ? [{ display: 'none' }, { display: '' }]
   : [{ display: '' }, { display: 'none' }]

  return(
    <>
      <div style={childrenStyle[0]}> {/* before unrolling */}
        <button onClick={toggleVisibility}>
          {label}
        </button>
      </div>

      <div style={childrenStyle[1]}> {/* after unrolling */}
        {children}
        <button onClick={toggleVisibility}>
          Cancel
        </button>
      </div>
    </>
  )
}

export default Togglable