import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const FormField = ({ label, name, placeholder, errors, type = 'text' }) => (
    <div className='text-left mb-3'>
        <label htmlFor={name}>{label}</label>
        <Field
            type={type}
            id={name}
            name={name}
            placeholder={placeholder}
            className="px-2 py-1.5 bg-white border shadow-sm border-slate-500 placeholder-slate-500 focus:outline-none focus:border-mfColor focus:ring-mfColor block w-full sm:w-64 rounded-md sm:text-base focus:ring-1"
        />
        <ErrorMessage name={name} component={() => (
            <div className='error text-red-600 font-medium'>{errors[name]}</div>
        )} />
    </div>
);

const Formulario = () => {
   // const [formularioenviado, cambiarformularioenviado] = useState(false);
    const [dataCategoria, setDataCategoria] = useState([]);
    const [arrTama, setArrTama] = useState([]);
    const [dataNeutro, setDataNeutro] = useState([]);
    const [dataNeutroIng, setDataNeutroIng] = useState([]);
    const [dataChocoIng, setDataChocoIng] = useState([]);
    const [dataChoco, setDataChoco] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    //let newDataNeutro = [];
    //let newDataChoco = [];


    useEffect(() => {
        if (!dataCategoria.length) {
            fetch('http://localhost:3000/categoriagra')
                .then(res => res.json())
                .then((res) => { setDataCategoria(res) })
        }
    }, [dataCategoria])

    const handleSubmit = (values, { resetForm }) => {
        try {
            //addEjemplos();

            console.log('newDataNeutro:', dataNeutro);
            console.log('newDataChoco:', dataChoco);

            //Convertir los arreglos de ejemplos a una string

            const dataNeutroString = dataNeutro.join('|');
            const dataChocoString = dataChoco.join('|');

            const dataNeutroIngString = dataNeutroIng.length ? dataNeutroIng.join('|') : 'No translation yet';
            const dataChocoIngString = dataChocoIng.length ? dataChocoIng.join('|') : 'No translation yet';



            // Agregar las cadenas de texto al objeto values
            values.ejemplo_neutro = dataNeutroString;
            values.ejemplo_choco = dataChocoString;
            values.ejemplo_neutro_ingles = dataNeutroIngString;
            values.ejemplo_choco_ingles = dataChocoIngString;
            //values.significado = values.significado ? values.significado : 'No Aplica';
            values.acepciones = values.acepciones ? values.acepciones: 'No Aplica';
            values.sinonimos = values.sinonimos ? values.sinonimos : 'No Aplica';
            values.significadoIng = values.significadoIng ? values.significadoIng : 'No translation yet';
            values.acepcionesIng = values.acepcionesIng ? values.acepcionesIng : 'No translation yet';
            values.sinonimosIng = values.sinonimosIng ? values.sinonimosIng : 'No translation yet';
            values.como_se_usa_Ing = values.como_se_usa_Ing ? values.como_se_usa_Ing : 'No translation yet';

            // Enviar los datos a la ruta del servidor
            fetch('http://localhost:3000/palabras', {
                method: 'POST',
                body: JSON.stringify(values),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    // Hacer algo con la respuesta del servidor
                    console.log(data);
                    setArrTama([]);
                    setDataNeutro([]);
                    setDataChoco([]);
                    resetForm();

                })
                .catch((error) => {
                    // Manejar el error
                    console.error(error);
                });

            setIsOpen(true);
        } catch (error) {
            console.log("mensaje", error)
        }


    };

    /*function addEjemplos() {
        console.log(dataNeutro)

        arrTama.map((item, index) => {
            const inputNeutro = document.getElementById(`ejemplo_neutro${index}`).value;
            const inputChoco = document.getElementById(`ejemplo_choco${index}`).value;
            newDataNeutro.push(inputNeutro);
            newDataChoco.push(inputChoco);


        })



    };*/

    function newEjemplos() {

        const newDataEjemplo = [...arrTama, 1];
        setArrTama(newDataEjemplo)
    };

    function arrEjemNeutro(v, i) {
        const newDataNeutro = [...dataNeutro]

        newDataNeutro[i] = v

        setDataNeutro(newDataNeutro)


    }

    function arrEjemNeutroIng(v, i) {
        const newDataNeutroIng = [...dataNeutroIng]

        newDataNeutroIng[i] = v

        setDataNeutroIng(newDataNeutroIng)


    }

    function arrEjemChoco(v, i) {
        const newDataChoco = [...dataChoco]
        newDataChoco[i] = v
        setDataChoco(newDataChoco)

    }

    function arrEjemChocoIng(v, i) {
        const newDataChocoIng = [...dataChocoIng]

        newDataChocoIng[i] = v

        setDataChocoIng(newDataChocoIng)


    }

    const closeModal = () => {
        setIsOpen(false);
        //onClose();
    };

    return (
        <div className='container px-4 lg:px-0 min-h-screen'>

            <p className='mb-4 mt-3 font-semibold text-mfColor text-4xl'>Administrador del Diccionario Choco</p>
            <>
                <Formik
                    //almacena los valores de cada campo
                    initialValues={{
                        palabra: '',
                        significado: '',
                        significadoIng: '',
                        acepciones: '',
                        acepcionesIng: '',
                        sinonimos: '',
                        sinonimosIng: '',
                        como_se_usa: '',
                        como_se_usa_Ing: '',
                        titleEjemplo: '',
                        EjemploChoco: '',
                        EjemploNeutror: '',
                        id_categoria: 0,
                        id_tipo: 1,
                        autorizado: true,
                        colaborador: 'Mercado Fácil',
                        correo_electronico:''

                    }}
                    //validar que los valores escritos dentro del campo, correspondan a lo solicitado en cada tabla
                    validate={(valores) => {
                        let errores = {};

                        //valores de palabra
                        if (!valores.palabra) {
                            errores.palabra = 'Campo obligatorio*'
                        }

                        //valores de significado
                        if (!valores.significado) {
                            errores.significado = 'Campo obligatorio*'
                        }

                        if (valores.id_categoria == 0) {
                            errores.id_categoria = 'Debe seleccionar una categoría*'
                        }

                        //valores de acepsiones
                        /*if (!valores.acepciones) {
                            errores.acepciones = 'ingrese una palabra'
                        } else if (!/^[a-zA-Z\s.,;:?!¡¿()"'-]+$/.test(valores.acepciones)) {
                            errores.acepciones = 'solo puedes escribir palabras'
                        }*/

                        //valores de sinónimos
                        /*if (!valores.sinonimos) {
                            errores.sinonimos = 'ingrese una palabra'
                        } else if (!/^[a-zA-Z\s.,;:?!¡¿()"'-]+$/.test(valores.sinonimos)) {
                            errores.sinonimos = 'solo puedes escribir palabras'
                        }*/

                        //valores de como se usa
                        if (!valores.como_se_usa) {
                            errores.como_se_usa = 'Campo obligatorio*'
                        } 
                        

                        //valores de ejemplo neutro

                        if (arrTama.length == 0) {
                            errores.titleEjemplo = 'Debe agregar almenos un ejemplo*'
                        }

                        arrTama.map((item, index) => {
                            if (!dataNeutro[index]) {
                                errores.titleEjemplo = 'Ejemplo neutro necesario*'
                            }
                            //valores de ejemplo choco
                            if (!dataChoco[index]) {
                                errores.EjemploChoco = 'Ejemplo choco necesario*'
                            }
                        })



                        return errores;
                    }}
                    //para enviar formulario
                    onSubmit={handleSubmit}
                >
                    {({ values, errors }) => (
                        <Form className='w-full p-4 mt-3 bg-white rounded-2xl shadow-mfBoxShadow'>
                            <h2 className='mb-4 font-semibold text-mfColor text-3xl'>Agregar Nueva Palabra</h2>
                            <div className='w-full flex flex-col xl:flex-row gap-4'>
                                <div className='w-full'>
                                    <div className='w-auto flex flex-col md:flex-row justify-center items-center gap-1 md:gap-5'>
                                        <FormField
                                            label="Palabra:"
                                            name="palabra"
                                            placeholder="Ingrese la palabra"
                                            errors={errors}
                                        />

                                        <div className='text-left'>
                                            <label htmlFor="selectedOption">Categoría Gramatical:</label>
                                            <Field as="select" name="id_categoria" id="id_categoria"
                                                className="block w-64 mb-4 rounded-md border-0 px-2 py-2 shadow-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:outline-none focus:border-mfColor focus:ring-mfColor sm:max-w-xs sm:leading-6">
                                                <option value="">Selecciona una categoría</option>
                                                {dataCategoria.map((e) => (
                                                    <option key={e.id} value={e.id}>
                                                        {e.categoria}
                                                    </option>
                                                ))}
                                            </Field>
                                            <ErrorMessage name='id_categoria' component={() => (
                                                <div className='error text-red-600 font-medium'>{errors.id_categoria}</div>
                                            )} />
                                        </div>
                                    </div>
                                    <div className='w-auto flex flex-col md:flex-row justify-center items-center gap-1 md:gap-5'>
                                        <FormField
                                            label="Significado:"
                                            name="significado"
                                            placeholder="Significado de la palabra"
                                            errors={errors}
                                        />

                                        <FormField
                                            label="Sinónimos (separados por coma):"
                                            name="sinonimos"
                                            placeholder="Sinónimos de la palabra"
                                        // errors={errors}
                                        />


                                    </div>


                                    <div className='w-auto flex flex-col md:flex-row justify-center items-center gap-1 md:gap-5'>
                                        <FormField
                                            label="Acepciones:"
                                            name="acepciones"
                                            placeholder="Acepciones de la palabra"
                                        // errors={errors}
                                        />

                                        <FormField
                                            label="¿Cómo se usa?:"
                                            name="como_se_usa"
                                            placeholder="¿Cómo se usa?"
                                            errors={errors}
                                        />
                                    </div>
                                </div>

                                <div className='w-full'>
                                    <div className='w-full flex justify-between flex-col gap-2 md:gap-0 xl:flex-row items-center'>
                                        <div className='text-left md:mb-2'>
                                            <label htmlFor='titleEjemplo'>Ejemplos Agregados: <span className='font-bold'>{`${arrTama.length}`}</span></label>
                                            <Field
                                                type='text'
                                                id='titleEjemplo'
                                                name='titleEjemplo'
                                                placeholder='acepsion'
                                                hidden
                                                className='hidden'
                                            />
                                            <ErrorMessage name="titleEjemplo" component={() => (
                                                <div className='error text-red-600 font-medium'>{errors.titleEjemplo}</div>
                                            )} />

                                            <ErrorMessage name="EjemploChoco" component={() => (
                                                <div className='error text-red-600 font-medium'>{errors.EjemploChoco}</div>
                                            )} />

                                        </div>
                                        <button type="button" className='w-auto h-min rounded-md bg-mfColor px-3 py-1.5 text-white shadow-md font-medium mb-2' onClick={newEjemplos}><i className="fa-solid fa-plus"></i> Nuevo Ejemplo</button>
                                    </div>

                                    <div className='w-full max-h-52 overflow-auto mb-2'>
                                        {arrTama.map((item, index) => (
                                            <div key={index} className='w-auto flex flex-col md:flex-row gap-1 justify-center items-center md:gap-4'>
                                                <div className='text-left mb-3'>
                                                    <label htmlFor={`ejemplo_neutro${index}`}>{`${index + 1}- Ejemplo Neutro:`}</label>
                                                    <Field
                                                        type='text'
                                                        id={`ejemplo_neutro${index}`}
                                                        name={`ejemplo_neutro${index}`}
                                                        value={dataNeutro[index] || ''}
                                                        placeholder="Escribe el ejemplo neutro"
                                                        className="px-2 py-1.5 bg-white border shadow-sm border-slate-500 placeholder-slate-500 focus:outline-none focus:border-mfColor focus:ring-mfColor block w-full sm:w-64 rounded-md sm:text-base focus:ring-1"
                                                        onChange={(event) => arrEjemNeutro(event.target.value, index)}
                                                    />
                                                    <ErrorMessage name={`ejemplo_neutro${index}`} component={() => (
                                                        <div className='error text-red-600 font-medium'>{errors[`ejemplo_neutro${index}`]}</div>
                                                    )} />
                                                </div>

                                                <div className='text-left mb-3'>
                                                    <label htmlFor={`ejemplo_choco${index}`}>{`${index + 1}- Ejemplo Choco:`}</label>
                                                    <Field
                                                        type='text'
                                                        id={`ejemplo_choco${index}`}
                                                        name={`ejemplo_choco${index}`}
                                                        value={dataChoco[index] || ''}
                                                        placeholder="Escribe el ejemplo choco"
                                                        className="px-2 py-1.5 bg-white border shadow-sm border-slate-500 placeholder-slate-500 focus:outline-none focus:border-mfColor focus:ring-mfColor block w-full sm:w-64 rounded-md sm:text-base focus:ring-1"
                                                        onChange={(event) => arrEjemChoco(event.target.value, index)}
                                                    />
                                                    <ErrorMessage name={`ejemplo_choco${index}`} component={() => (
                                                        <div className='error text-red-600 font-medium'>{errors[`ejemplo_choco${index}`]}</div>
                                                    )} />
                                                </div>
                                                <button type="button" className='max-w-max my-auto h-min rounded-md bg-mfColor px-3 py-1.5 text-white shadow-md font-medium' onClick={() => {

                                                    try {
                                                        const newDataNeutro = [...dataNeutro]; // Copia el arreglo original
                                                        newDataNeutro.splice(index, 1); // Realiza la modificación en la copia
                                                        setDataNeutro(newDataNeutro);

                                                        const newDataChoco = [...dataChoco]; // Copia el arreglo original
                                                        newDataChoco.splice(index, 1); // Realiza la modificación en la copia
                                                        setDataChoco(newDataChoco);

                                                        const newDataNeutroIng = [...dataNeutroIng]; // Copia el arreglo original
                                                        newDataNeutroIng.splice(index, 1); // Realiza la modificación en la copia
                                                        setDataNeutroIng(newDataNeutroIng);

                                                        const newDataChocoIng = [...dataChocoIng]; // Copia el arreglo original
                                                        newDataChocoIng.splice(index, 1); // Realiza la modificación en la copia
                                                        setDataChocoIng(newDataChocoIng);

                                                        const newArrTama = [...arrTama]; // Copia el arreglo original
                                                        newArrTama.splice(index, 1); // Realiza la modificación en la copia
                                                        setArrTama(newArrTama);
                                                    } catch (error) {
                                                        console.log("Mensaje", error)
                                                    }
                                                }}><i className="fa-solid fa-trash"></i></button>
                                            </div>
                                        ))}

                                    </div>




                                </div>
                            </div>
                            <hr className='border-solid border-2 border-gray-200 my-2' />

                            <h2 className='mb-4 font-semibold text-mfColor text-3xl'>Traducir A Inglés</h2>
                            <div className='w-full flex flex-col xl:flex-row gap-4'>
                                <div className='w-full'>
                                    {/*<div className='w-full flex justify-around'>
                                        <FormField
                                            label="Palabra"
                                            name="palabra"
                                            placeholder="Ingrese la palabra"
                                            errors={errors}
                                        />

                                        <div className='text-left'>
                                            <label htmlFor="selectedOption">Categoría Gramatical:</label>
                                            <Field as="select" name="id_categoria" id="id_categoria"
                                                className="block w-64 rounded-md border-0 px-2 py-2 shadow-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:outline-none focus:border-mfColor focus:ring-mfColor sm:max-w-xs sm:leading-6">
                                                <option value="">Selecciona una categoría</option>
                                                {dataCategoria.map((e) => (
                                                    <option key={e.id} value={e.id}>
                                                        {e.categoria}
                                                    </option>
                                                ))}
                                            </Field>
                                            <ErrorMessage name='id_categoria' component={() => (
                                                <div className='error text-red-600 font-medium'>{errors.id_categoria}</div>
                                            )} />
                                        </div>
                                            </div>*/}
                                    <div className='w-auto flex flex-col md:flex-row justify-center items-center gap-1 md:gap-5'>
                                        <FormField
                                            label="Significado:"
                                            name="significadoIng"
                                            placeholder="Traducir significado de la palabra"
                                        //errors={errors}
                                        />

                                        <FormField
                                            label="Sinónimos (separados por coma):"
                                            name="sinonimosIng"
                                            placeholder="Traducir sinónimos de la palabra"
                                        // errors={errors}
                                        />


                                    </div>


                                    <div className='w-auto flex flex-col md:flex-row justify-center items-center gap-1 md:gap-5'>
                                        <FormField
                                            label="Acepciones:"
                                            name="acepcionesIng"
                                            placeholder="Traducir acepciones de la palabra"
                                        // errors={errors}
                                        />

                                        <FormField
                                            label="¿Cómo se usa?:"
                                            name="como_se_usa_Ing"
                                            placeholder="Traducir ¿Cómo se usa?"
                                        // errors={errors}
                                        />
                                    </div>
                                </div>

                                <div className='w-full'>
                                    <div className='w-full flex'>
                                        <div className='w-full flex justify-center xl:justify-normal items-center mb-2'>
                                            <label htmlFor='titleEjemplo'>Ejemplos a traducir: <span className='font-bold'>{`${arrTama.length}`}</span></label>
                                            <Field
                                                type='text'
                                                id='titleEjemplo'
                                                name='titleEjemplo'
                                                placeholder='acepsion'
                                                hidden
                                            />

                                        </div>

                                    </div>

                                    <div className='w-full max-h-52 overflow-auto mb-2'>
                                        {arrTama.map((item, index) => (
                                            <div key={index} className='w-auto flex flex-col md:flex-row gap-1 justify-center xl:justify-normal items-center md:gap-4'>
                                                <div className='text-left mb-3'>
                                                    <label htmlFor={`ejemplo_neutro${index}`}>{`${index + 1}- Ejemplo Neutro:`}</label>
                                                    <Field
                                                        type='text'
                                                        id={`ejemplo_neutro${index}`}
                                                        name={`ejemplo_neutro${index}`}
                                                        value={dataNeutroIng[index] || ''}
                                                        placeholder="Traducir ejemplo neutro"
                                                        className="px-2 py-1.5 bg-white border shadow-sm border-slate-500 placeholder-slate-500 focus:outline-none focus:border-mfColor focus:ring-mfColor block w-full sm:w-64 rounded-md sm:text-base focus:ring-1"
                                                        onChange={(event) => arrEjemNeutroIng(event.target.value, index)}
                                                    />
                                                    <ErrorMessage name={`ejemplo_neutro${index}`} component={() => (
                                                        <div className='error text-red-600 font-medium'>{errors[`ejemplo_neutro${index}`]}</div>
                                                    )} />
                                                </div>

                                                <div className='text-left mb-3'>
                                                    <label htmlFor={`ejemplo_choco${index}`}>{`${index + 1}- Ejemplo Choco:`}</label>
                                                    <Field
                                                        type='text'
                                                        id={`ejemplo_choco${index}`}
                                                        name={`ejemplo_choco${index}`}
                                                        value={dataChocoIng[index] || ''}
                                                        placeholder="Traducir ejemplo choco"
                                                        className="px-2 py-1.5 bg-white border shadow-sm border-slate-500 placeholder-slate-500 focus:outline-none focus:border-mfColor focus:ring-mfColor block w-full sm:w-64 rounded-md sm:text-base focus:ring-1"
                                                        onChange={(event) => arrEjemChocoIng(event.target.value, index)}
                                                    />
                                                    <ErrorMessage name={`ejemplo_choco${index}`} component={() => (
                                                        <div className='error text-red-600 font-medium'>{errors[`ejemplo_choco${index}`]}</div>
                                                    )} />
                                                </div>
                                            </div>
                                        ))}

                                    </div>




                                </div>
                            </div>

                            <button type='submit' className='w-auto rounded-md mt-2 bg-mfColor px-3 py-2 text-white shadow-md font-medium'>Agregar Palabra</button>
                            <div
                                className={`fixed inset-0 flex items-center justify-center transition-all duration-200 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                                    }`}
                            >
                                <div className="bg-white w-80 lg:w-auto p-5 rounded-xl shadow-mfBoxShadow border">
                                    <p className="text-2xl text-gray-800 font-bold mb-3">¡Palabra Agregada!</p>
                                    <p className='text-8xl mb-2 text-green-600'><i className="fa-regular fa-circle-check"></i></p>
                                    <p className="text-lg text-gray-700 font-medium mb-4">La palabra se ha agregado exitosamente al diccionario<br/>choco.</p>
                                    <button type="button" className='w-auto h-min rounded-md bg-mfColor px-3 py-1.5 text-white shadow-md font-medium' onClick={closeModal}>Aceptar</button>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>

            </>
        </div>
    );
}

export default Formulario;