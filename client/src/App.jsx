<<<<<<< HEAD
import { useState } from 'react'
import './App.css'
import Card from './components/Card/seccDiccChoco'
import { Routes, Route } from 'react-router-dom'
import FormAdmin from './components/formularios/formAdminAdd'
import FormPublic from './components/formularios/formPublic'

function App() {
  return (
    <>
       <Routes>
        <Route path='/' element={<Card></Card>}>  
        </Route>
        <Route path='/loginDicc' element={<LoginAdmin></LoginAdmin>}>   
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
=======
import { useState } from 'react'
import './App.css'
import Card from './components/Card/seccDiccChoco'
import { Routes, Route } from 'react-router-dom'
import FormAdmin from './components/formularios/formAdminAdd'
import FormPublic from './components/formularios/formPublic'
import TablaPalabras from './components/formularios/tablapalabras'

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
        <Route path='/tablapalabras' element={<TablaPalabras></TablaPalabras>}>   
        </Route>
      </Routes>
      
     
    </>
  )
}

export default App
>>>>>>> admin-diego
