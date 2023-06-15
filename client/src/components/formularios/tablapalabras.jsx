import React, { useEffect, useState } from 'react';

const TablaDatos = ({ setValoresForm, newFilter, setFiltro, setModalUpdate, idUpdate, setIdUpdate,
   data, setData, setIndexUp, setArrTama, setDataNeutroActu, setDataChocoActu }) => {
  // const [data, setData] = useState([]);
  const [currentPage, setCurrent] = useState(1)

  // buscar palabras
  //const [newFilter, setFiltro] = useState([])
  const [inicio, setInicio] = useState(false)
  const [eliPalabra, setEliPalabra] = useState('');


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {

    try {
      const response = await fetch('http://localhost:3000/palabrasall');
      const jsonData = await response.json();
      setData(jsonData);
      console.log(jsonData)

    } catch (error) {
      console.error(error);
    }

  };

  const eliminarDato = (id, palabra) => {
    setEliPalabra(palabra);
    setItemToDelete(id);
    setShowWarningModal(true);
  };

  const actualizarDato = (row) => {
    const ejeNeutro = []
    row.Ejemplo.ejemplo_neutro.split("|").map((segment) => (
      ejeNeutro.push(segment)
    ))
    setDataNeutroActu(ejeNeutro)
    setArrTama(ejeNeutro)

    const ejeChoco = []
    row.Ejemplo.ejemplo_choco.split("|").map((segment) => (
      ejeChoco.push(segment)
    ))
    setDataNeutroActu(ejeChoco)
    //setArrTama(ejeChoco)

    //setIdUpdate(row.id);
    setModalUpdate(true)
    console.log("resultado Row", row.id)
    setValoresForm(row)

  };
  const handleDeleteConfirm = async () => {
    try {
      // Realiza la solicitud de eliminación al servidor utilizando el ID del dato
      await fetch(`http://localhost:3000/palabras/${itemToDelete}`, {
        method: 'DELETE',
      });
      // Actualiza los datos después de la eliminación
      fetchData();
      setFiltro(data)
    } catch (error) {
      console.error(error);
    } finally {
      // Cierra el modal de advertencia
      setShowWarningModal(false);
    }
  };

  //filtrar datos de búsqueda
  function realTimeSearch(e) {
    setCurrent(1)

    const result = data.filter(element => {
      // console.log(e.target.value)
      //const regex = /^(¡¿")?/i;
      // console.log(element.palabra.startsWith(e.target.value.toUpperCase()) ? element.palabra.startsWith(e.target.value.toUpperCase()) : "No hay")    
      return element.palabra.toLowerCase().includes(e.target.value.toLowerCase())
      //regets

    })
    //console.log(result)
    if (result.length > 0) { setFiltro(result) } else { setFiltro([]) }



    if (!inicio) {
      setInicio(true)
    }

  }

  let next = currentPage * 6
  let prev = next - 6
  let partirData

  if (inicio) {
    if (newFilter.length > 0) {
      partirData = newFilter.slice(prev, next)
    } else {
      partirData = []/*datos.slice(prev, next)*/
    }
  } else {
    partirData = data.slice(prev, next)
  }

  const allPages = newFilter.length > 0 ? Math.ceil(newFilter.length / 6) : Math.ceil(data.length / 6)
  //const allWords = newFilter.length > 0 ? newFilter.length : datos.length
  //const allWords = data.length


  const [showWarningModal, setShowWarningModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);



  return (
    <div className="divide-orange-700 flex flex-col min-h-screen">

      <input
        className='px-3 py-2 bg-white border shadow-sm border-slate-500 placeholder-slate-500 focus:outline-none focus:border-mfColor focus:ring-mfColor block w-full sm:w-64 rounded-md sm:text-base focus:ring-1'
        type="text"
        onChange={realTimeSearch}
        placeholder="Buscar palabra..."
      />
      <div className='w-full overflow-x-auto'>
        <table id='sectionId' className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="text-md  text-blue-600 bg-gray-300 ">
              <th className="px-4">ID</th>
              <th className="px-4">PALABRA</th>
              <th className="px-4">SIGNIFICADO</th>
              <th className="px-4">CATEGORIA</th>
              <th className="px-4">ACEPCIONES</th>
              <th className="px-4">SINÓNIMOS</th>
              <th className="px-4">COMO SE USA</th>
              <th className="px-4">EJEMPLO NEUTRO</th>
              <th className="px-4">EJEMPLO CHOCO</th>
              <th className="px-4">OPCIONES</th>
              {/* ...otras columnas */}
            </tr>
          </thead>
          <tbody>
            {partirData.length > 0 ?

              partirData.map((e, index) => (
                <tr key={e.id} className="hover:bg-gray-200 border-b border-gray-300">
                  <td>{e.id}</td>
                  <td>{e.palabra}</td>

                  <td>{e.significado}</td>
                  <td>{e.Categorium.categoria}</td>
                  <td >{e.acepciones}</td>
                  <td>{e.sinonimos}</td>
                  <td >{e.como_se_usa}</td>
                  <td>{e.Ejemplo.ejemplo_neutro.split("|").map((segment, index) => (
                    <React.Fragment  key={index}>
                      {`${index + 1}. ${segment}`}
                      <br />
                    </React.Fragment>
                  ))}</td>
                  <td>{e.Ejemplo.ejemplo_choco.split("|").map((segment, index) => (
                    <React.Fragment key={index}>
                      {`${index + 1}. ${segment}`}
                      <br />
                    </React.Fragment>
                  ))}</td>
                  
                  <td className="text-black-600 hover:bg-blue-100">
                    <button className="max-w-max my-auto h-min rounded-md bg-blue-500 px-3 py-2 mr-2 text-lg text-white shadow-md font-medium" onClick={() => actualizarDato(e)}><i className="fa-solid fa-pen-to-square"></i></button>
                    <button className="max-w-max my-auto h-min rounded-md bg-red-500 px-3 py-2 text-lg text-white shadow-md font-medium" onClick={() => eliminarDato(e.id, e.palabra)}>
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>

                </tr>

              ))

              :
              <tr><td colSpan={9} className='font-bold text-gray-700 text-2xl'>Sin Resultados</td></tr>
            }
          </tbody>
        </table>

      </div>


      {/*muestra mensaje de advertencias para eliminar datos*/}
      {showWarningModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-modal">
          <div className="bg-white sm:mx-5 sm:w-96 p-5 rounded-xl shadow-mfBoxShadow border mx-2">
            <p>¿Estás seguro de que deseas eliminar <span className='font-semibold'>{eliPalabra}</span>?</p>
            <div className="flex justify-end mt-6">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
                onClick={() => setShowWarningModal(false)}
              >
                Cancelar
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md"
                onClick={handleDeleteConfirm}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
      {/* ...otras celdas */}
      <div className='w-full md:text-lg font-medium text-gray-800 mt-4'>
        {partirData.length > 0 ?
          <div className='w-full'>

            <p className=''>Página <span className='text-mfColor font-semibold'>{currentPage}</span> de <span className='text-mfColor font-semibold'>{allPages}</span></p>
          </div>
          :
          <div className='w-full'>

            <p className=''>Página <span className='text-mfColor font-semibold'>0</span> de <span className='text-mfColor font-semibold'>0</span></p>

          </div>
        }

      </div>

      <div className='mt-5 mb-4 w-full flex justify-center gap-3'>
        {currentPage > 1 ?
          <button className='rounded-md bg-mfColor px-3 py-2 text-white shadow-md font-medium' onClick={() => setCurrent(currentPage - 1)}><i className="fa-solid fa-circle-left"></i> Anterior</button> : null}
        {currentPage < allPages && partirData.length > 0 ?
          <button className='rounded-md bg-mfColor px-3 py-2 text-white shadow-md font-medium' onClick={() => {
            setCurrent(currentPage + 1)
            const section = document.getElementById('sectionId');
            if (section) {
              section.scrollIntoView({ behavior: 'smooth' });
            }

          }}>Siguiente <i className="fa-solid fa-circle-right"></i></button> : null}
      </div>
    </div>
  );
};

export default TablaDatos;