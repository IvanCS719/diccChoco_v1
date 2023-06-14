import React, { useEffect, useState } from 'react';

const TablaDatos = ({setValoresForm, newFilter, setFiltro, setModalUpdate, idUpdate,setIdUpdate, data,setData, setIndexUp,result}) => {
 // const [data, setData] = useState([]);
  const [currentPage, setCurrent] = useState(1)
  
  // buscar palabras
  //const [newFilter, setFiltro] = useState([])
  const [inicio, setInicio] = useState(false)


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    
      try {
        const response = await fetch('http://localhost:3000/palabras');
        const jsonData = await response.json();
        setData(jsonData);
        console.log(jsonData)
        
      } catch (error) {
        console.error(error);
      }
    
  };

  const eliminarDato = (id) => {
    setItemToDelete(id);
    setShowWarningModal(true);
  };

  const actualizarDato = (row) => {
    result = row;
    setValoresForm({
      palabra: row.palabra,
        significado: row.significado,
        significadoIng:'',
        acepciones: row.acepciones,
        acepcionesIng: '',
        sinonimos: row.sinonimos,
        sinonimosIng: '',
        como_se_usa: row.como_se_usa,
        como_se_usa_Ing: '',
        titleEjemplo: '',
        EjemploChoco: '',
        EjemploNeutror: '',
        id_categoria: 1,
        id_tipo: 1,
        autorizado: true,
        colaborador: 'Mercado Fácil',
        correo_electronico: ''
    });
    setModalUpdate(true)
    console.log("resultado",row)
    console.log(result.palabra)

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
    <div className="divide-orange-700 flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <br />
      <br />
      <input
        className='px-3 py-2 bg-white border shadow-sm border-slate-500 placeholder-slate-500 focus:outline-none focus:border-mfColor focus:ring-mfColor block w-full sm:w-64 rounded-md sm:text-base focus:ring-1'
        type="text"
        onChange={realTimeSearch}
        placeholder="Buscar palabra..."
      />
      <table id='sectionId' className="table w-full border-separate">
        <thead>
          <tr className="text-md  text-blue-600 bg-gray-300 ">
            <th className="px-6 ">ID</th>
            <th className="px-6">PALABRA</th>
            <th className="px-6">SIGNIFICADO</th>
            <th className="px-3">ACEPCIONES</th>
            <th className="px-6">SINÓNIMOS</th>
            <th className="px-10">COMO SE USA</th>
            <th className="px-8">EJEMPLO NEUTRO</th>
            <th className="px-8">EJEMPLO CHOCO</th>
            <th className="px-8">OPCIONES</th>
            {/* ...otras columnas */}
          </tr>
        </thead>
        <tbody>
          {partirData.length > 0 ?
            
              partirData.map((e, index) => (
                <tr key={e.id} className="hover:bg-orange-200 border-b border-gray-300">
                  <td>{e.id}</td>
                  <td>{e.palabra}</td>

                  <td>{e.significado}</td>
                  <td >{e.acepciones}</td>
                  <td>{e.sinonimos}</td>
                  <td >{e.como_se_usa}</td>
                  <td>{e.Ejemplo.ejemplo_neutro}</td>
                  <td >{e.Ejemplo.ejemplo_choco}</td>
                  <td className="text-black-600 hover:bg-blue-100">
                    <button className="max-w-max my-auto h-min rounded-md bg-blue-500 px-3 py-2 mr-2 text-lg text-white shadow-md font-medium" onClick={() => actualizarDato(e)}><i className="fa-solid fa-pen-to-square"></i></button>
                    <button className="max-w-max my-auto h-min rounded-md bg-red-500 px-3 py-2 text-lg text-white shadow-md font-medium" onClick={() => eliminarDato(e.id)}>
                    <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>

                  {/*muestra mensaje de advertencias para eliminar datos*/}
                  {showWarningModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
                      <div className="bg-white p-8 rounded-md">
                        <p>¿Estás seguro de que deseas eliminar este dato?</p>
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
                </tr>

              ))
            
            :
              <tr><td colSpan={9} className='font-bold text-gray-700 text-2xl'>Sin Resultados</td></tr>
          }
        </tbody>
      </table>

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