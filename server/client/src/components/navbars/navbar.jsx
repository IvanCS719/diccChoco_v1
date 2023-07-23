import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Navbar = ({ rol, mfLogo, mfLink, verDicc, verDiccLink, tar, CS, mfLogoAd, mfLinkAd, cola, colaLink,
  masInfo, masInfoLink, VA, VC}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const navigate = useNavigate();
  const cerrarSesion = () => {
    try {
      localStorage.getItem('token') ? localStorage.removeItem('token') : null
      navigate('/loginDicc');
    } catch (error) {
      console.log("Error SC", error)
    }

  }

  return (
    <nav className="bg-mfColor w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-7">
        <div className="flex items-center justify-between h-16 flex-grow">
          <div className="w-full flex items-center">
            <div className="flex-shrink-0">

              {rol ? <span title='Modo de acceso' className="text-white font-bold text-xl">{rol === "Admin" ? "Administrador" : rol}</span> : null}
              {mfLogo ? <a href={mfLink}>
                <span className="text-white font-bold text-xl">{mfLogo}</span>
              </a> : null}


            </div>
            <div className="hidden md:flex md:w-full justify-between">
              <div className="ml-10 flex items-center space-x-4">


                {verDicc ? <Link to={verDiccLink} target={tar ? tar : ''} className='text-white font-medium hover:border-b-2'>{verDicc}</Link> : null}

                {mfLogoAd ? <a href={mfLinkAd} className="text-white font-medium hover:border-b-2">
                  {mfLogoAd}
                </a> : null}
                {masInfo ? <a href={masInfoLink} className="text-white font-medium hover:border-b-2">
                  {masInfo}
                </a> : null}
                {VC == 1 ? <Link to='/vercuentas' className="text-white font-medium hover:border-b-2">Ver Colaboradores</Link> : null}

              </div>
              {CS ? <button onClick={cerrarSesion} className="hover:bg-white hover:text-mfColor hover:font-semibold border-solid border-2 border-white text-white font-medium py-2 px-3 rounded-lg">
                {CS}
              </button>: null}
              {cola ? <Link to={colaLink} className="hover:bg-white hover:text-mfColor hover:font-semibold border-solid border-2 border-white text-white font-medium py-2 px-3 rounded-lg">{cola}</Link> : null}
              {VA ? <Link to='/admin' className="hover:bg-white hover:text-mfColor hover:font-semibold border-solid border-2 border-white text-white font-medium py-2 px-3 rounded-lg">{VA}</Link> : null}
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
          <div className="flex flex-col items-center gap-2 py-3">
          {verDicc ? <Link to={verDiccLink} className='text-white font-medium hover:border-b-2'>{verDicc}</Link> : null}
          {mfLogoAd ? <a href={mfLinkAd} className="text-white font-medium hover:border-b-2">
                  {mfLogoAd}
                </a> : null}
                {masInfo ? <a href={masInfoLink} className="text-white font-medium hover:border-b-2">
                  {masInfo}
                </a> : null}
                {VC == 1 ? <Link to='/vercuentas' className="text-white font-medium hover:border-b-2">Ver Colaboradores</Link> : null}
           
            {CS ? <button onClick={cerrarSesion} className="hover:bg-white hover:text-mfColor hover:font-semibold text-white font-medium py-2 px-3 rounded-lg">
                {CS}
              </button>: null}
              {cola ? <Link to={colaLink} className="hover:bg-white hover:text-mfColor hover:font-semibold border-solid border-2 border-white text-white font-medium py-2 px-3 rounded-lg">{cola}</Link> : null}
              {VA ? <Link to='/admin' className="hover:bg-white hover:text-mfColor hover:font-semibold border-solid border-2 border-white text-white font-medium py-2 px-3 rounded-lg">{VA}</Link> : null}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
