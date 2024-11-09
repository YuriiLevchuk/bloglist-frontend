import { useState, useEffect } from "react"

const Notification = ({ notification, error }) => {
  if(!notification) return null

  return <>
    {!error
      ? <div className="notification message">{notification}</div>
      : <div className="notification error">{notification}</div>
    }
  </>
}

export default Notification