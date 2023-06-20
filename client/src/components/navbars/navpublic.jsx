import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Navbar = ({rol}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const navigate = useNavigate();
  const cerrarSesion = () =>{
    try {
      localStorage.getItem('admin') ? localStorage.removeItem('admin')  : null
    localStorage.getItem('colaborador') ? localStorage.removeItem('colaborador')  : null
    navigate('/loginDicc');
    } catch (error) {
      console.log("Error SC", error)
    }
    
  }

  return (
    <nav className="bg-mfColor w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 flex-grow">
          <div className="w-full flex items-center">
            <div className="flex-shrink-0">
              <a href="https://mercadofacil.mx/">
              <span className="text-white font-bold text-xl">Mercadofácil.mx</span>
              </a>
             
            </div>
            <div className="hidden md:flex md:w-full justify-between">
              <div className="ml-10 flex items-center space-x-4">

            
                <Link href="/" className='text-white font-medium hover:border-b-2'>Inicio</Link>
                <Link href="/colaborar" className='text-white font-medium hover:border-b-2'>Colaborar</Link>
               
              </div>
              <button onClick={cerrarSesion} className="hover:bg-white hover:text-mfColor hover:font-semibold text-white font-medium py-2 px-3 rounded-lg">
                Acceder
              </button>
            </div>
            
          </div>
           
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleNavbar}
              type="button"
              className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a href="https://mercadofacil.mx/" className='text-white font-medium hover:bg-gray-300  rounded'>Mercado Fácil</a>
          <Link to="/" className='text-white font-medium hover:bg-gray-300  rounded'><p>Ver Diccionario</p></Link>
          <button onClick={cerrarSesion} className="hover:bg-gray-300 text-white font-bold  rounded">
                  Cerrar Sesión
                </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
