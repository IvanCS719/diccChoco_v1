import React, { useEffect, useState } from 'react';

const TablaDatos = ({ setValoresForm, newFilter, setFiltro, setModalUpdate,
  data, setData, setArrTama, setDataNeutro, setDataChoco, setDataNeutroIng, setDataChocoIng, fetchData,
  setModalAdd }) => {
  // const [data, setData] = useState([]);
  const [currentPage, setCurrent] = useState(1)

  // buscar palabras
  //const [newFilter, setFiltro] = useState([])
  const [inicio, setInicio] = useState(false)
  const [eliPalabra, setEliPalabra] = useState('');


  useEffect(() => {
    fetchData();
  }, []);


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
    setDataNeutro(ejeNeutro)
    setArrTama(ejeNeutro)

    const ejeChoco = []
    row.Ejemplo.ejemplo_choco.split("|").map((segment) => (
      ejeChoco.push(segment)
    ))
    setDataChoco(ejeChoco)

    const ejeNeutroIng = []
    row.Ejemplo.ejemplo_neutro_ingles.split("|").map((segment) => (
      ejeNeutroIng.push(segment)
    ))
    setDataNeutroIng(ejeNeutroIng)

    const ejeChocoIng = []
    row.Ejemplo.ejemplo_choco_ingles.split("|").map((segment) => (
      ejeChocoIng.push(segment)
    ))
    setDataChocoIng(ejeChocoIng)
    //setArrTama(ejeChoco)

    //setIdUpdate(row.id);
    setModalUpdate(true)
    console.log("resultado Row", row)
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

  let next = currentPage * 8
  let prev = next - 8
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

  const allPages = newFilter.length > 0 ? Math.ceil(newFilter.length / 8) : Math.ceil(data.length / 8)
  //const allWords = newFilter.length > 0 ? newFilter.length : datos.length
  const allWords = data.length


  const [showWarningModal, setShowWarningModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);



  return (
    <div className=" w-full divide-orange-700 flex flex-col min-h-max">
      <div className='w-full flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-0 sm:justify-between mb-2'>
        <button type='button' className='w-auto rounded-md bg-mfColor px-3 py-2 text-white shadow-md font-medium' onClick={() => { setModalAdd(true) }}><i className="fa-solid fa-plus"></i> Nueva Palabra</button>
        <div className='flex items-center gap-2'>
          <p className='font-medium text-base text-gray-800'>Contenido en:</p>
        <select name="" id="" className='block w-auto rounded-md border-0 px-2 py-2 font-medium text-gray-800 shadow-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:outline-none focus:border-mfColor focus:ring-mfColor text-center sm:max-w-xs sm:leading-6'>
          <option value="">Español</option>
          <option value="">Inglés</option>
        </select>
        </div>
        
      </div>
      <div className='w-full mb-3'>
        <p className='font-medium text-gray-800 text-xl '>Palabras Visibles: <span className='font-bold text-mfColor'>{allWords}</span></p>
      </div>
      <div className='w-full flex flex-col sm:flex-row  justify-between mb-5'>

        <input
          className='px-3 py-2 bg-white border shadow-sm border-slate-500 placeholder-slate-500 focus:outline-none focus:border-mfColor focus:ring-mfColor mx-auto sm:mx-0 mb-2 sm:mb-0 w-72 sm:w-64 rounded-md sm:text-base focus:ring-1'
          type="text"
          onChange={realTimeSearch}
          placeholder="Buscar palabra..."
        />

        <div className='flex justify-center items-center'>
          {currentPage > 1 ?
            <button className='rounded-md bg-mfColor px-3 py-1 text-white shadow-md border-solid border-2 border-mfColor font-bold' onClick={() => setCurrent(currentPage - 1)}><i className="fa-solid fa-chevron-left"></i></button> : <button className='rounded-md bg-white px-3 py-1 text-mfColor border-solid border-2 border-mfColor shadow-md font-bold'><i className="fa-solid fa-chevron-left"></i></button>}
          {partirData.length > 0 ?
            <div className='mx-2 text-lg'>

              <p className=''><span className='text-mfColor font-semibold'>{currentPage}</span> de <span className='text-mfColor font-semibold'>{allPages}</span></p>
            </div>
            :
            <div className='mx-2 text-lg'>

              <p className=''><span className='text-mfColor font-semibold'>0</span> de <span className='text-mfColor font-semibold'>0</span></p>

            </div>
          }

          {currentPage < allPages && partirData.length > 0 ?
            <button className='rounded-md bg-mfColor px-3 py-1 text-white shadow-md font-bold border-solid border-2 border-mfColor' onClick={() =>
              setCurrent(currentPage + 1)}><i className="fa-solid fa-chevron-right"></i></button> : <button className='rounded-md bg-white px-3 py-1 text-mfColor shadow-md font-bold border-solid border-2 border-mfColor'><i className="fa-solid fa-chevron-right"></i></button>}

        </div>
      </div>


      <div className='w-full overflow-y-auto rounded-xl shadow-mfBoxShadow p-1 h-table max-h-table mb-6'>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className=''>
            <tr className="font-bold text-gray-900">
              <th className="px-4 py-2">Id</th>
              <th className="px-4 py-2">Palabra</th>
              <th className="px-4 py-2">Significado</th>
              <th className="px-4 py-2">Categoría</th>
              <th className="px-4 py-2">Acepciones</th>
              <th className="px-4 py-2">Sinónimos</th>
              <th className="px-4 py-2">Cómo se usa</th>
              <th className="px-4 py-2">Ejemplo(s) Neutro</th>
              <th className="px-4 py-2">Ejemplo(s) Choco</th>
              <th className="px-4 py-2">Opciones</th>
              {/* ...otras columnas */}
            </tr>
          </thead>
          <tbody >
            {partirData.length > 0 ?

              partirData.map((e, index) => (
                <tr key={e.id} className="hover:bg-gray-100 border-b border-gray-300">
                  <td>{e.autorizado ? 'si' : 'no'}</td>
                  <td className="py-3">{e.id}</td>
                  <td className="py-3">{e.palabra}</td>

                  <td className="py-3">{e.significado}</td>
                  <td className="py-3">{e.Categorium.categoria}</td>
                  <td className="py-3">{e.acepciones}</td>
                  <td className="py-3">{e.sinonimos}</td>
                  <td className="py-3">{e.como_se_usa}</td>
                  <td className="py-3">{e.Ejemplo.ejemplo_neutro.split("|").map((segment, index) => (
                    <React.Fragment key={index}>
                      {`${index + 1}. ${segment}`}
                      <br />
                    </React.Fragment>
                  ))}</td>
                  <td className="py-3">{e.Ejemplo.ejemplo_choco.split("|").map((segment, index) => (
                    <React.Fragment key={index}>
                      {`${index + 1}. ${segment}`}
                      <br />
                    </React.Fragment>
                  ))}</td>

                  <td className="py-3 text-black-600 hover:bg-blue-100">
                    <button className="max-w-max my-auto h-min rounded-md bg-blue-500 px-3 py-2 mr-1 text-lg text-white shadow-md font-medium" onClick={() => actualizarDato(e)}><i className="fa-solid fa-pen-to-square"></i></button>
                    <button className="max-w-max my-auto h-min rounded-md bg-red-500 px-3 py-2 text-lg text-white shadow-md font-medium" onClick={() => eliminarDato(e.id, e.palabra)}>
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>

                </tr>

              ))

              :
              <tr><td colSpan={10} className='py-3 font-bold text-gray-600 text-3xl'>Sin Resultados</td></tr>
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

    </div>
  );
};

export default TablaDatos;