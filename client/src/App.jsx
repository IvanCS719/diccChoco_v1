import { useState } from 'react'
import './App.css'
import Card from './components/Card/seccDiccChoco'
import CardIngles from './components/CardIngles/CardsIngles'
import SeccDiccChocoIngles from './components/CardIngles/seccDiccChocoIngles'
import { Routes, Route } from 'react-router-dom'
import FormAdmin from './components/formularios/formAdminAdd'
import LoginAdmin from './components/formularios/loginAdmin'
import FormPublic from './components/formularios/formPublic'


function App() {
  return (
    <>
       <Routes>
        <Route path='/' element={<Card></Card>}>  
        </Route>
        <Route path='/loginDicc' element={<LoginAdmin></LoginAdmin>}>   
        </Route>
        <Route path='/admin' element={<FormAdmin></FormAdmin>}>   
        </Route>
        <Route path='/colaborar' element={<FormPublic></FormPublic>}>   
        </Route>
        <Route path='/Ingles' element={<SeccDiccChocoIngles></SeccDiccChocoIngles>}>       
        </Route>

      </Routes>
      
     
    </>
  )
}

export default App