import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

const getLocalStorage = () => {
      let list = localStorage.getItem ('list')
      if (list) {
        return JSON.parse (localStorage.getItem ('list'))
      }
      else {
        return []
      }
}

function App() {
  const [name, setName] = useState ("")
  const [list, setList] = useState (getLocalStorage ())
  const [isEditing, setIsEditing] = useState (false)
  const [editID, setEditID] = useState (null)
  const [alert, setAlert] = useState ({show: false, msg: '', type: '' })

function handleSubmit (e) {
  e.preventDefault ()
  if (!name) {
    showAlert (true, 'danger', 'please enter a value')
  }
  else if (name && isEditing) {   //if name is true (there's a value inside, and isEditing is true...then do this...)
    setList (list.map ((item) => {
      if (item.id === editID) {  //if item.id matches w/ item id, then...
        return {...item, title: name} // change title to whatever is statevalue right now
      }
        return item
    }))
      setName ("");
      setEditID (null)
      setIsEditing (false)
      showAlert (true, 'success', 'list updated')
  } 
  else {
    const newItem = {
      id: Date.now() + Math.random(),
      title: name
};
      setList ([... list, newItem])
      setName ("")
      showAlert (true, 'success', `${newItem.title} added to the list`)
  }
}


function showAlert (show=false, type="", msg="") {
    setAlert ({show, type, msg})
}

function clearList () {
    showAlert (true, 'danger', 'empty list')
    setList ("")
}

function removeItem (id) {
  showAlert (true, 'danger', 'item removed');
  const newList = list.filter ((item) => item.id !== id)
  setList (newList)  //newList will be displayed
  // if item.id does not match with new id, then it will be added to new array - ID DID NOT MATCH
}

//list was the statevalue
function editItem (id) {
  const specificItem = list.find (item => item.id === id)
    setIsEditing (true)
    setEditID (id)
    setName (specificItem.title) //display which item am i editing in the input
  }
//here we want to find the id whose id matches the item.id

    useEffect (( ) => {
      localStorage.setItem ('list', JSON.stringify (list))
    }, [list])


  return <section className="section-center">
      <form className='grocery-form' onSubmit={handleSubmit}>
            {alert.show && <Alert {...alert} removeAlert={showAlert}  list={list} />}
            <h3>Grocery Buddy</h3>
            <div className='form-control'>
                  <input type='text' className='grocery' placeholder='e.g. lots of bacon' value={name} onChange={ (e) => setName(e.target.value)}  />
                  <button type='submit' className='submit-btn'>
                      {isEditing? "edit": "submit"}
                  </button>
            </div>
      </form>
      {list.length > 0 && (
        <div className='grocery-container'>
        <List items={list}  removeItem={removeItem} editItem={editItem}/>
        <button className='clear-btn' onClick={clearList}>Clear Items</button>
      </div>
      )}
  </section>
}

export default App
