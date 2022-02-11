import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import About from './elements/About'
import Users from './elements/Users'
import Navbar from './elements/Navbar'

function App() {
  return (
    <Router>
      <Navbar/>
      <div className="container p-4">
        <Routes>

          <Route path="/about" element={ <About /> }/>
          <Route path="/" element={ <Users /> }/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
