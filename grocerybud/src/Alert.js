
import React, { useEffect } from 'react'

const Alert = ({type, msg, removeAlert, list}) => {
  useEffect (() => {
      const timeout = setTimeout (( ) => {
        removeAlert ()
      }, 3000)
      return () => {
        clearTimeout (timeout)
      }
  }, [list])
  //the list is added to the dependency array so if something changes,we clear the timeout and setup a new one

  return <p className={`alert alert-${type}`}>{msg}</p>
}
export default Alert
