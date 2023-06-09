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
    const [formularioenviado, cambiarformularioenviado] = useState(false);
    const [dataCategoria, setDataCategoria] = useState([]);
    const [arrTama, setArrTama] = useState([]);
    const [dataNeutro, setDataNeutro] = useState([]);
    const [dataChoco, setDataChoco] = useState([]);


    let newDataNeutro = [];
    let newDataChoco = [];


    useEffect(() => {
        if (!dataCategoria.length) {
            fetch('http://localhost:3000/categoriagra')
                .then(res => res.json())
                .then((res) => { setDataCategoria(res) })
        }
    }, [dataCategoria])

    const handleSubmit = (values, { resetForm }) => {

        addEjemplos();

        console.log('newDataNeutro:', newDataNeutro);
        console.log('newDataChoco:', newDataChoco);

        //Convertir los arreglos de ejemplos a una string

        const dataNeutroString = newDataNeutro.join('|');
        const dataChocoString = newDataChoco.join('|');



        // Agregar las cadenas de texto al objeto values
        values.ejemplo_neutro = dataNeutroString;
        values.ejemplo_choco = dataChocoString;

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
                newDataNeutro = [];
                newDataChoco = [];
                resetForm();

            })
            .catch((error) => {
                // Manejar el error
                console.error(error);
            });

        cambiarformularioenviado(true)
    };

    function addEjemplos() {
        console.log(dataNeutro)

        arrTama.map((item, index) => {
            const inputNeutro = document.getElementById(`ejemplo_neutro${index}`).value;
            const inputChoco = document.getElementById(`ejemplo_choco${index}`).value;
            newDataNeutro.push(inputNeutro);
            newDataChoco.push(inputChoco);


        })



    };

    function newEjemplos() {

        const newDataEjemplo = [...arrTama, 1];
        setArrTama(newDataEjemplo)
    };

    function arrEjemNeutro(v,i) {
        const newDataNeutro = [...dataNeutro]

        newDataNeutro[i] = v

        setDataNeutro(newDataNeutro)

        
    }

    function arrEjemChoco(v,i) {
        const newDataChoco = [...dataChoco]
        newDataChoco[i] = v
        setDataChoco(newDataChoco)
        
    }
    return (
        <div className='container px-4 lg:px-0 w-screen min-h-screen'>

            <>
                <Formik
                    //almacena los valores de cada campo
                    initialValues={{
                        palabra: '',
                        significado: '',
                        acepciones: '',
                        sinonimos: '',
                        como_se_usa: '',
                        titleEjemplo: '',
                        id_categoria: 0,
                        id_tipo: 1,
                        autorizado: true,
                        colaborador: 'Mercado Fácil'

                    }}
                    //validar que los valores escritos dentro del campo, correspondan a lo solicitado en cada tabla
                    validate={(valores) => {
                        let errores = {};

                        //valores de palabra
                        if (!valores.palabra) {
                            errores.palabra = 'Campo obligatorio*'
                        } else if (!/^[a-zA-Z\s.,;:?!¡¿()"'-]+$/.test(valores.palabra)) {
                            errores.palabra = 'solo puedes escribir palabra y signos de puntuación'
                        }

                        //valores de significado
                        if (!valores.significado) {
                            errores.significado = 'Campo obligatorio*'
                        } else if (!/^[a-zA-Z\s.,;:?!¡¿()"'-]+$/.test(valores.significado)) {
                            errores.significado = 'solo puedes escribir palabras'
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
                        /*if (!valores.como_se_usa) {
                            errores.como_se_usa = 'Campo obligatorio'
                        } else if (!/^[a-zA-Z\s.,;:?!¡¿()"'-]+$/.test(valores.como_se_usa)) {
                            errores.como_se_usa = 'solo puedes escribir palabras'
                        }*/

                        //valores de ejemplo neutro

                        if (arrTama.length == 0) {
                            errores.titleEjemplo = 'Debes agregar un ejemplo*'
                        }

                        arrTama.map((item, index) => {
                            if (!dataNeutro[index]) {
                                errores[`ejemplo_neutro${index}`] = 'Ejemplo neutro necesario*'
                            } else if (!/^[a-zA-Z\s.,;:?!¡¿()"'-]+$/.test(valores[`ejemplo_neutro${index}`])) {
                                errores[`ejemplo_neutro${index}`] = 'solo puedes escribir palabras'
                            }

                            //valores de ejemplo choco
                            if (!dataChoco[index]) {
                                errores[`ejemplo_choco${index}`] = 'Ejemplo choco necesario*'
                            } else if (!/^[a-zA-Z\s.,;:?!¡¿()"'-]+$/.test(valores[`ejemplo_choco${index}`])) {
                                errores[`ejemplo_choco${index}`] = 'solo puedes escribir palabras'
                            }
                        })



                        return errores;
                    }}
                    //para enviar formulario
                    onSubmit={handleSubmit}
                >
                    {({ values, errors }) => (
                        <Form className='w-full p-4 mt-3 rounded-lg shadow-lg'>
                            <h1 className='mb-4 font-semibold text-zinc-800 text-3xl'>Agregar Nueva Palabra</h1>
                            <div className='w-full flex'>
                                <div className='w-full'>
                                    <div className='w-full flex justify-around'>
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
                                    </div>
                                    <div className='w-full flex justify-around'>
                                        <FormField
                                            label="Significado"
                                            name="significado"
                                            placeholder="Significado de la palabra"
                                            errors={errors}
                                        />

                                        <FormField
                                            label="Sinónimos"
                                            name="sinonimos"
                                            placeholder="Sinónimos de la palabra"
                                        // errors={errors}
                                        />


                                    </div>


                                    <div className='w-full flex justify-around'>
                                        <FormField
                                            label="Acepciones"
                                            name="acepciones"
                                            placeholder="Acepciones de la palabra"
                                        // errors={errors}
                                        />

                                        <FormField
                                            label="¿Cómo se usa?"
                                            name="como_se_usa"
                                            placeholder="¿Cómo se usa?"
                                        // errors={errors}
                                        />
                                    </div>
                                </div>

                                <div className='w-full'>
                                    <div className='w-full flex justify-around content-end'>
                                        <div className='text-left'>
                                            <label htmlFor='titleEjemplo'>Ejemplos {`${arrTama.length}`}</label>
                                            <Field
                                                type='text'
                                                id='titleEjemplo'
                                                name='titleEjemplo'
                                                placeholder='acepsion'
                                                hidden
                                            />
                                            <ErrorMessage name="titleEjemplo" component={() => (
                                                <div className='error text-red-600 font-medium'>{errors.titleEjemplo}</div>
                                            )} />
                                        </div>
                                        <button type="button" className='w-auto h-min rounded-md bg-mfColor px-3 py-1.5 text-white shadow-md font-medium' onClick={newEjemplos}>Nuevo Ejemplo</button>
                                    </div>

                                    <div className='w-full max-h-52 overflow-auto mb-2'>
                                        {arrTama.map((item, index) => (
                                            <div key={index} className='w-full flex justify-around content-end'>
                                                <div className='text-left mb-3'>
                                                    <label htmlFor={`ejemplo_neutro${index}`}>{`${index + 1}- Ejemplo Neutro`}</label>
                                                    <Field
                                                        type='text'
                                                        id={`ejemplo_neutro${index}`}
                                                        name={`ejemplo_neutro${index}`}
                                                        value={dataNeutro[index] || ''}
                                                        placeholder="Escribe un ejemplo neutro"
                                                        className="px-2 py-1.5 bg-white border shadow-sm border-slate-500 placeholder-slate-500 focus:outline-none focus:border-mfColor focus:ring-mfColor block w-full sm:w-64 rounded-md sm:text-base focus:ring-1"
                                                        onChange={(event) => arrEjemNeutro(event.target.value, index)}
                                                    />
                                                    <ErrorMessage name={`ejemplo_neutro${index}`} component={() => (
                                                        <div className='error text-red-600 font-medium'>{errors[`ejemplo_neutro${index}`]}</div>
                                                    )} />
                                                </div>

                                                <div className='text-left mb-3'>
                                                    <label htmlFor={`ejemplo_choco${index}`}>{`${index + 1}- Ejemplo Choco`}</label>
                                                    <Field
                                                        type='text'
                                                        id={`ejemplo_choco${index}`}
                                                        name={`ejemplo_choco${index}`}
                                                        value={dataChoco[index] || ''}
                                                        placeholder="Escribe un ejemplo neutro"
                                                        className="px-2 py-1.5 bg-white border shadow-sm border-slate-500 placeholder-slate-500 focus:outline-none focus:border-mfColor focus:ring-mfColor block w-full sm:w-64 rounded-md sm:text-base focus:ring-1"
                                                        onChange={(event) => arrEjemChoco(event.target.value, index)}
                                                    />
                                                    <ErrorMessage name={`ejemplo_choco${index}`} component={() => (
                                                        <div className='error text-red-600 font-medium'>{errors[`ejemplo_choco${index}`]}</div>
                                                    )} />
                                                </div>
                                                <button type="button" className='w-auto my-auto h-min rounded-md bg-mfColor px-3 py-1.5 text-white shadow-md font-medium' onClick={() => {

                                                    const newDataNeutro = [...dataNeutro]; // Copia el arreglo original
                                                    newDataNeutro.splice(index, 1); // Realiza la modificación en la copia
                                                    setDataNeutro(newDataNeutro);

                                                    const newDataChoco = [...dataChoco]; // Copia el arreglo original
                                                    newDataChoco.splice(index, 1); // Realiza la modificación en la copia
                                                    setDataChoco(newDataChoco);

                                                    const newArrTama = [...arrTama]; // Copia el arreglo original
                                                    newArrTama.splice(index, 1); // Realiza la modificación en la copia
                                                    setArrTama(newArrTama);
                                                }}><i className="fa-solid fa-trash"></i></button>
                                            </div>
                                        ))}

                                    </div>




                                </div>
                            </div>

                            <button type='submit' className='w-auto rounded-md mt-2 bg-mfColor px-3 py-2 text-white shadow-md font-medium'>Agregar Palabra</button>
                            {formularioenviado ? <p className='enviado'>Formulario enviado</p> : null}
                        </Form>
                    )}
                </Formik>

            </>
        </div>
    );
}

export default Formulario;