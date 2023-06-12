import { useState } from 'react'
import './App.css'
import Card from './components/Card/seccDiccChoco'
import { Routes, Route } from 'react-router-dom'
import FormAdmin from './components/formularios/formAdmin'
import FormPublic from './components/formularios/formPublic'

function App() {
  return (
    <>
       <Routes>
        <Route path='/' element={<Card></Card>}>  
        </Route>
        <Route path='/formulario' element={<FormAdmin></FormAdmin>}>   
        </Route>
        <Route path='/colaborar' element={<FormPublic></FormPublic>}>   
        </Route>
      </Routes>
      
     
    </>
  )
}

export default App
