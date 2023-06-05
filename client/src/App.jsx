import { useState } from 'react'
import './App.css'
import Card from './components/Card/seccDiccChoco'
import { Routes, Route } from 'react-router-dom'
import FormAdmin from './components/formularios/formAdmin'

function App() {
  return (
    <>
       <Routes>
        <Route path='/formulario' element={<FormAdmin></FormAdmin>}>   
        </Route>
        <Route path='/' element={<Card></Card>}>   
        </Route>
      </Routes>

     
    </>
  )
}

export default App
