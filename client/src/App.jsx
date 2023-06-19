import { useState } from 'react'
import './App.css'
import Card from './components/Card/seccDiccChoco'
import CardIngles from './components/CardIngles/CardsIngles'
import SeccDiccChocoIngles from './components/CardIngles/seccDiccChocoIngles'
import { Routes, Route } from 'react-router-dom'
import FormAdmin from './components/formularios/formAdminAdd'
import LoginAdmin from './components/formularios/loginAdmin'
import FormPublic from './components/formularios/formPublic'
import NavAdmin from './components/navbars/navadmin'
import NavPublic from './components/navbars/navpublic'

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
        <Route path='/navad' element={<NavAdmin></NavAdmin>}>       
        </Route>
        <Route path='/navpu' element={<NavPublic></NavPublic>}>       
        </Route>
      </Routes>
      
     
    </>
  )
}

export default App