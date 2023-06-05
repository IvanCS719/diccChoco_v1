import { useState } from 'react'
export default function Cards({ /*imagen, categoria*/ palabra, significado, sinonimos,categoria ,acepciones, comoSeUsa,
    ejemploNeutro, ejemploChoco }) {
    let [activeDiv, setActiveDiv] = useState(false)

    const arrNeutro = ejemploNeutro.split("|");
    const arrChoco = ejemploChoco.split("|");

    const renderEjemplos = () => {
        const ejemplos = [];
    
        for (let i = 0; i < arrNeutro.length; i++) {
          ejemplos.push(
            <p className="text-left mb-2" key={i}><span className='font-semibold'>{i+1}-</span> {arrNeutro[i]} / {arrChoco[i]}</p>
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
                    <p className='font-bold text-white'>Acepciones</p>
                    <p className="">{acepciones}</p>
                </div>;

            case 2:
                return <div>
                    <p className="text-2xl font-bold text-white">{palabra}</p>
                    <p className='font-bold text-white mb-1'>Ejemplo Neutro / Ejemplo Choco</p>
                    {/*{ arrNeutro.map((e, index) =>  <p className=""><span className='font-semibold'>{index+1}-</span> {e}</p>)}
    
                    <p className='font-bold text-white mt-2'>Ejemplo(s) Choco</p>
                    { arrChoco.map((e, index) => <p className=""><span className='font-semibold'>{index+1}-</span> {e}</p>)}*/}
                    {renderEjemplos()}
                </div>;

            case 3:
                return <div>
                    <p className="text-2xl font-bold text-white">{palabra}</p>
                    <p className='font-bold text-white'>¿Comó se usa?</p>
                    <p className="">{comoSeUsa}</p>
                </div>;
            default:
                return null;
        }
    };

    


    return (
        <div className="group w-80 md:w-80 xl:w-96 h-72 [perspective:1000px]">
            <div className={`relative h-full w-full transition-all duration-300 [transform-style:preserve-3d] ${activeDiv ? '[transform:rotateY(180deg)]' : ''} shadow-mfBoxShadow rounded-lg flex flex-col justify-center gap-1 border-solid border-2 border-mfColor`}>
                <div className='absolute inset-0 rounded-lg px-5 py-3'>

                    <div>
                        <p className="text-3xl font-bold text-mfColor">{palabra}</p>
                        <p className="cardPalabras-lugar"><span>(</span>{categoria}<span>)</span></p>
                    </div>
                    <div className='my-1'>
                        <p className='font-bold text-mfColor'>Significado</p>
                        <div className='overflow-auto h-14 w-full'>
                            <p className="">{significado}</p>
                        </div>
                    </div>
                    <div className='my-1'>
                        <p className='font-bold text-mfColor'>Sinonimos</p>
                        <p className="overflow-auto h-8 w-full">{sinonimos}</p>
                    </div>
                    <div className='container flex gap-3 justify-center'>

                        <button className="rounded-md bg-mfColor px-3 py-2 text-white shadow-sm" title='Acepciones' onClick={() => handleButtonClick(1)}><i className="fa-solid fa-book-open"></i></button>
                        <button className="rounded-md bg-mfColor px-3 py-2 text-white shadow-sm" title='Ejemplos' onClick={() => handleButtonClick(2)}><i className="fa-solid fa-lightbulb"></i></button>

                        <button className="rounded-md bg-mfColor px-3 py-2 text-white shadow-sm" title='¿Comó se usa?' onClick={() => handleButtonClick(3)}><i className="fa-solid fa-circle-question"></i></button>

                    </div>
                </div>

                <div className='absolute inset-0 overflow-auto h-full w-full rounded-lg bg-mfColor text-center text-white px-5 py-3 [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col items-center gap-1'>
                    {renderContent(activeDiv)}
                    <button className="rounded-md w-auto shadow-sm px-3 py-2 text-white font-semibold" title='Volver' onClick={() => handleButtonClick(0)}>Volver <i className="fa-solid fa-rotate-left"></i></button>
                </div>
            </div>
        </div>
    )
}