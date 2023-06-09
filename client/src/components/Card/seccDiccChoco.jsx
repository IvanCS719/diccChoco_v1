//import axios from 'axios';
import { useEffect, useState } from 'react';
import Cards from './Cards';
//import './cards.css'
export default function Card() {

    const [datos, setDatos] = useState([])
    const [currentPage, setCurrent] = useState(1)
    const [newFilter, setFiltro] = useState([])
    const [inicio, setInicio] = useState(false)

    function filtroLetra(e) {
        setCurrent(1)
        //console.log(e.target.value);
        if (e.target.value == 'ALL') {
            setFiltro(datos)

        } else {
            const result = datos.filter(element => {
                //const regex = /^(¡¿")?/i;
                // console.log(element.palabra.startsWith(e.target.value.toUpperCase()) ? element.palabra.startsWith(e.target.value.toUpperCase()) : "No hay")    
                return element.palabra.toUpperCase().startsWith(e.target.value.toUpperCase()) || ((element.palabra.startsWith('¡' || '¿' || '"') && element.palabra.toUpperCase().startsWith(e.target.value.toUpperCase(), 1)))
                //regets

            })
            if (result.length > 0) { setFiltro(result) } else { setFiltro([]) }

        }

        if (!inicio) {
            setInicio(true)
        }



        //console.log(newFilter)
    }


    function realTimeSearch(e) {
        setCurrent(1)

        const result = datos.filter(element => {
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



    //console.log(newFilter)
    useEffect(() => {
        if (!datos.length) {
            fetch('http://localhost:3000/palabras')
                .then(res => res.json())
                .then((res) => { setDatos(res) })
        }
    }, [datos])


    let next = currentPage * 6
    let prev = next - 6
    let partirData
    //if(newFilter.length > 0){partirData = newFilter.slice(prev, next)} else {partirData = []/*datos.slice(prev, next)*/}

    if (inicio) {
        if (newFilter.length > 0) {
            partirData = newFilter.slice(prev, next)
        } else {
            partirData = []/*datos.slice(prev, next)*/
        }
    } else {
        partirData = datos.slice(prev, next)
    }

    const allPages = newFilter.length > 0 ? Math.ceil(newFilter.length / 6) : Math.ceil(datos.length / 6)
    const allWords = newFilter.length > 0 ? newFilter.length : datos.length

    return (
        <div className='container px-4 lg:px-0 w-screen min-h-screen'>

            <h2 id='sectionId' className='text-3xl font-bold text-mfColor mb-5'>Palabras del Choco</h2>
            <div className='xl:mx-4 mb-6 w-auto flex flex-col gap-2'>
                <div className='w-full flex flex-col gap-2 md:flex-row md:gap-0 md:justify-between items-center'>

                    <div className="">
                        <input
                            onChange={realTimeSearch}
                            type="text"
                            className="px-3 py-2 bg-white border shadow-sm border-slate-500 placeholder-slate-500 focus:outline-none focus:border-mfColor focus:ring-mfColor block w-full sm:w-64 rounded-md sm:text-base focus:ring-1" placeholder="Buscar palabra..."
                        ></input>

                    </div>

                    <div className="flex gap-2">
                        <p className='py-1 sm:text-lg font-medium text-gray-800'>Visualizar:</p>
                        <select
                            className="block w-auto rounded-md border-0 px-2 py-1 font-medium text-gray-800 shadow-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:outline-none focus:border-mfColor focus:ring-mfColor text-center sm:max-w-xs sm:leading-6"
                            onChange={filtroLetra}>
                            <option value='ALL'>Todos</option>
                            <option>A</option>
                            <option>B</option>
                            <option>C</option>
                            <option>D</option>
                            <option>E</option>
                            <option>F</option>
                            <option>G</option>
                            <option>H</option>
                            <option>I</option>
                            <option>J</option>
                            <option>K</option>
                            <option>L</option>
                            <option>M</option>
                            <option>N</option>
                            <option>Ñ</option>
                            <option>O</option>
                            <option>P</option>
                            <option>Q</option>
                            <option>R</option>
                            <option>S</option>
                            <option>T</option>
                            <option>U</option>
                            <option>V</option>
                            <option>W</option>
                            <option>X</option>
                            <option>Y</option>
                            <option>Z</option>
                        </select>
                    </div>
                </div>
                <div className='w-full md:text-lg font-medium text-gray-900 mt-1'>
                    {partirData.length > 0 ?
                        <div className='w-full flex flex-col sm:flex-row sm:justify-between'>
                            <p className=''>Palabras Encontradas: <span className='text-mfColor font-semibold'>{allWords}</span></p>


                        </div>
                        :
                        <div className='w-full flex flex-col sm:flex-row sm:justify-between'>
                            <p className=''>Palabras Encontradas: <span className='text-mfColor font-semibold'>0</span></p>

                        </div>
                    }

                </div>
            </div>

            {partirData.length > 0 ?
                <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center md:px-8 lg:px-2 xl:px-9'>
                    {partirData.map(e =>
                        <Cards key={e.id} /*imagen={e.Multimedium.url_imagen} region={e.Region.region}*/palabra={e.palabra} significado={e.significado} sinonimos={e.sinonimos}
                            categoria={e.Categorium.categoria} acepciones={e.acepciones} comoSeUsa={e.como_se_usa} ejemploNeutro={e.Ejemplo.ejemplo_neutro} ejemploChoco={e.Ejemplo.ejemplo_choco} />
                    )}
                </div> :
                <div className='w-full h-full grid gap-1 grid-cols-1'>
                    <p className='text-center text-3xl md:text-4xl font-bold text-mfColor'>Sin Resultados</p>
                    <p className='text-center md:text-lg font-medium text-gray-800'>Por el momento no se han encontrado palabras que coincidan</p>
                    <p></p>
                </div>
            }

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

            <div className='mt-5 w-full flex justify-center gap-3'>
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
    )
}