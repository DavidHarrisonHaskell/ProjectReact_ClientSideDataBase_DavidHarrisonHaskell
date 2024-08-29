import React from 'react'
import './App.css'
import LeftSideParent from './Components/LeftSideParent.jsx'
import RightSideParent from './Components/RightSideParent.jsx'

const App = () => {

  return (
    <div className="AppAppearance">
      <LeftSideParent />
      <RightSideParent />
    </div>
  )
}

export default App
