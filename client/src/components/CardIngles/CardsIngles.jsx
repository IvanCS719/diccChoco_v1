import { useState } from 'react'
import { Link } from 'react-router-dom';
export default function Cards({ /*imagen, categoria*/ palabra, region,significado, sinonimos, categoria, acepciones, comoSeUsa,
    ejemploNeutro, ejemploChoco, ejemploneutroingles, ejemplochocoingles, significadoIng, acepcionesIng, categoriaIng,sinonimosIng, como_se_usa_Ing }) {
    let [activeDiv, setActiveDiv] = useState(false)

    const arrNeutro = ejemploneutroingles.split("|");
    const arrChoco = ejemplochocoingles.split("|");
    const arrNeutroIng = ejemploneutroingles ? ejemploneutroingles.split("|") : '';
    const arrChocoIng = ejemplochocoingles ? ejemplochocoingles.split("|") : '';

    const renderEjemplos = () => {
        const ejemplos = [];
        for (let i = 0; i < arrNeutro.length; i++) {
            ejemplos.push(
                <p className="text-left mb-2" key={i}><span className='font-semibold'>{i + 1}-</span> {arrNeutro[i]} / {arrChoco[i]}</p>
            );
        }
        return ejemplos;
    };

    const renderEjemplosIng = () => {
        const ejemplos = [];
        for (let i = 0; i < arrNeutroIng.length; i++) {
            ejemplos.push(
                <p className="text-left mb-2" key={i}><span className='font-semibold'>{i + 1}-</span> {arrNeutroIng[i]} / {arrChocoIng[i]}</p>
            );
        }
        return ejemplos;
    };

    const handleButtonClick = (divId) => {
        setActiveDiv(divId);
    };


    const renderContent = (divId2) => {
        switch (divId2) {
            case 1:
                return <div>
                    <p className="text-2xl font-bold text-white">{palabra}</p>
                    <p className='font-bold text-white'>Meanings</p>
                    <p className="">{acepcionesIng}</p>
                </div>;

            case 2:
                return <div>
                    <p className="text-2xl font-bold text-white">{palabra}</p>
                    <p className='font-bold text-white mb-1'>Neutral example / Choco Example</p>
                    {/*{ arrNeutro.map((e, index) =>  <p className=""><span className='font-semibold'>{index+1}-</span> {e}</p>)}
    
                    <p className='font-bold text-white mt-2'>Ejemplo(s) Choco</p>
                    { arrChoco.map((e, index) => <p className=""><span className='font-semibold'>{index+1}-</span> {e}</p>)}*/}
                    {renderEjemplos()}
                </div>;

            case 3:
                return <div>
                    <p className="text-2xl font-bold text-white">{palabra}</p>
                    <p className='font-bold text-white'>How is it used?</p>
                    <p className="">{como_se_usa_Ing}</p>
                    <div className='mt-3 mb-1'>
                        <p className='font-bold text-white'>Tabasco region where it is heard more</p>
                        <p className="overflow-auto h-8 w-full">{region}</p>
                    </div>
                </div>;
            case 4:
                return <div>
                    <div>
                        <p className="text-3xl font-bold text-white">{palabra}</p>
                        <p className="cardPalabras-lugar"><span>(</span>{categoria}<span>)</span></p>
                    </div>
                    <p className='font-bold text-white mt-2'>Significados</p>
                    <div className='overflow-auto h-14 w-full'>
                        <p className="">{significado}</p>

                    </div>
                    <p className='font-bold text-mfColor' style={{ color: "#ffffff" }}>Sinónimos</p>
                    <p className="overflow-auto h-8 w-full">{sinonimos}</p>

                    <div className='container flex mt-2 gap-3 justify-center'>
                        <button className="rounded-lg  bg-mrColor px-3 py-2 text-white shadow-sm" title='Acepciones' onClick={() => handleButtonClick(5)}><i className="fa-solid fa-book-open"></i></button>
                        <button className="rounded-lg  bg-mrColor px-3 py-2 text-white shadow-sm" title='Ejemplos' onClick={() => handleButtonClick(6)}><i className="fa-solid fa-lightbulb"></i></button>
                        <button className="rounded-lg  bg-mrColor px-3 py-2 text-white shadow-sm" title='¿Cómo se usa?' onClick={() => handleButtonClick(7)}><i className="fa-solid fa-circle-question"></i></button>
                    </div>
                </div>;

            case 5:
                return <div>
                    <p className="text-2xl font-bold text-white">{palabra}</p>
                    <div className='my-2'>
                        <p className='font-bold text-white'>Acepciones</p>
                        <p className="">{acepciones}</p>
                    </div>
                    <button className="rounded-md w-auto shadow-sm px-3 py-2 text-white font-semibold" title='Return to the word in Spanish' onClick={() => handleButtonClick(4)}>Regresar <i className="fa-solid fa-rotate-left"></i></button>
                </div>;
            case 6:
                return <div>
                    <p className="text-2xl font-bold text-white">{palabra}</p>
                    <p className='font-bold text-white mb-1'>Ejemplo neutral / Ejemplo choco</p>
                    <div className='my-2'>
                        {renderEjemplos()}
                    </div>
                    <button className="rounded-md w-auto shadow-sm px-3 py-2 text-white font-semibold" title='Return to the word in Spanish' onClick={() => handleButtonClick(4)}>Regresar <i className="fa-solid fa-rotate-left"></i></button>
                </div>;

            case 7:
                return <div>
                    <p className="text-2xl font-bold text-white">{palabra}</p>
                    <div className='my-2'>
                        <p className='font-bold text-white'>¿Comó se usa?</p>
                        <p className="">{comoSeUsa}</p>
                    </div>
                    <div className='mt-2 mb-1'>
                        <p className='font-bold text-white'>Región de Tabasco donde más se escucha</p>
                        <p className="overflow-auto h-8 w-full">{region}</p>
                    </div>
                    <button className="rounded-md w-auto shadow-sm px-3 py-2 text-white font-semibold" title='Return to the word in Spanish' onClick={() => handleButtonClick(4)}>Go Back <i className="fa-solid fa-rotate-left"></i></button>
                </div>;


            default:
                return null;
        }
    };




    return (

        <div className="group w-80 md:w-80 xl:w-96 h-72 [perspective:1000px]">
            <div className={`relative h-full w-full transition-all duration-300 [transform-style:preserve-3d] ${activeDiv ? '[transform:rotateY(180deg)]' : ''} shadow-mfBoxShadow 
            rounded-lg flex flex-col justify-center gap-1`}>
                <div className='absolute inset-0 rounded-lg px-5 py-3 border-solid border-2 border-mfColor'>

                    <div>
                        <p className="text-3xl font-bold text-mfColor">{palabra}</p>
                        <p className="cardPalabras-lugar"><span>(</span>{categoriaIng}<span>)</span></p>
                    </div>
                    <div className='my-1'>
                        <p className='font-bold text-mfColor'>Meaning</p>
                        <div className='overflow-auto h-14 w-full'>
                            <p className="">{significadoIng}</p>
                        </div>
                    </div>
                    <div className='my-1'>
                        <p className='font-bold text-mfColor'>Synonyms</p>
                        <p className="overflow-auto h-8 w-full">{sinonimosIng}</p>
                    </div>
                    <div className='container flex gap-3 justify-center'>

                        <button className="rounded-md bg-mfColor px-3 py-2 text-white shadow-sm" title='Senses' onClick={() => handleButtonClick(1)}><i className="fa-solid fa-book-open"></i></button>
                        <button className="rounded-md bg-mfColor px-3 py-2 text-white shadow-sm" title='Example' onClick={() => handleButtonClick(2)}><i className="fa-solid fa-lightbulb"></i></button>
                        <button className="rounded-md bg-mfColor px-3 py-2 text-white shadow-sm" title='How is it used?' onClick={() => handleButtonClick(3)}><i className="fa-solid fa-circle-question"></i></button>
                        <button className="rounded-md bg-mfColor px-3 py-2 text-white shadow-sm" title='Spanish' onClick={() => handleButtonClick(4)}><i className="fa-solid fa-globe"></i></button>

                    </div>
                </div>

                <div className='absolute inset-0 overflow-auto h-full w-full rounded-lg bg-mfColor text-center text-white 
                px-5 py-3 [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col items-center gap-1'>

                    {activeDiv === 4 || activeDiv === 5 || activeDiv === 6 || activeDiv === 7 ? (

                        <div className="rounded-md absolute overflow-auto inset-0 h-72 w-full  bg-myColor text-center text-white 
                    px-5 py-3 flex flex-col items-center gap-1 ">
                            {renderContent(activeDiv)}
                            <button className="rounded-md w-auto shadow-sm px-3 py-2 text-white font-semibold" title='Volver' onClick={() => handleButtonClick(0)}>Inicio <i className="fa-solid fa-rotate-left"></i></button>
                        </div>
                    ) : (
                        <div>
                            {renderContent(activeDiv)}
                            <button className="rounded-md w-auto shadow-sm px-3 py-2 text-white font-semibold" title='Back' onClick={() => handleButtonClick(0)}>Home <i className="fa-solid fa-rotate-left"></i></button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}