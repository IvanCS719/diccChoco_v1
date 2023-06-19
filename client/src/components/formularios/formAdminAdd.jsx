import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TablaAdmin from './tablapalabras';
import NavbarAdmin from '../navbars/navadmin';
import { Formik, Form, Field, ErrorMessage } from 'formik';




    const FormField = ({ label, name, placeholder, errors, value, type = 'text', onChange }) => (
        <div className='text-left mb-3'>
            <label htmlFor={name}>{label}</label>
            <Field
                type={type}
                id={name}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="px-2 py-1.5 bg-white border shadow-sm border-slate-500 placeholder-slate-500 focus:outline-none focus:border-mfColor focus:ring-mfColor block w-full sm:w-64 rounded-md sm:text-base focus:ring-1"
            />
            <ErrorMessage name={name} component={() => (
                <div className='error text-red-600 font-medium'>{errors[name]}</div>
            )} />
        </div>
    );

    const FormField2 = ({ label, name, placeholder, errors, type = 'text', }) => (
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

        const [rol, setRol] = useState([""])
        const navigate = useNavigate();

        useEffect(() => {
            const expectedToken = 'admin23mf'; // Reemplaza 'token_esperado' con tu token esperado
            const storedToken = localStorage.getItem('admin');

            const expectedToken2 = 'cola23mf23'; // Reemplaza 'token_esperado' con tu token esperado
            const storedToken2 = localStorage.getItem('colaborador');
    
            if (storedToken === expectedToken) {
                setRol("Admin")
                // Si el token almacenado no coincide con el token esperado, redirige a la página de inicio de sesión
               
            } else if (storedToken2 === expectedToken2) {
                setRol("Colaborador")
                // Si el token almacenado no coincide con el token esperado, redirige a la página de inicio de sesión
                
            } else {
                navigate('/loginDicc');
            }
        }, [navigate]);

        // const [formularioenviado, cambiarformularioenviado] = useState(false);
        const [dataCategoria, setDataCategoria] = useState([]);
        const [arrTama, setArrTama] = useState([]);
        const [dataNeutro, setDataNeutro] = useState([]);
        const [dataNeutroIng, setDataNeutroIng] = useState([]);
        const [dataChocoIng, setDataChocoIng] = useState([]);
        const [dataChoco, setDataChoco] = useState([]);
        const [isOpen, setIsOpen] = useState(false);
        const [modalConfirUpdate, setModalConfirUpdate] = useState(false);
        const [modalAdd, setModalAdd] = useState(false);
        const [modalUpdate, setModalUpdate] = useState(false);

        const [newFilter, setFiltro] = useState([])
        const [data, setData] = useState([]);
        const [valoresForm, setValoresForm] = useState({
            palabra: '',
            significado: '',
            acepciones: '',
            sinonimos: '',
            como_se_usa: '',
            ejemplo_neutro: '',
            ejemplo_choco: '',
            colaborador: 'Mercado Fácil',
            correo_electronico: '',
            autorizado: true,
            id_categoria: 0,
            Categorium: {
                id: 0
            },
            Ingle: {
                significadoIng: '',
                sinonimosIng: '',
                acepcionesIng: '',
                como_se_usa_Ing: ''
            },
            id_tipo: 1,


            ejemplo_neutro_ingles: '',
            ejemplo_choco_ingles: '',
            EjemploChoco: '',
            titleEjemploAc: ''

        });

        const fetchData = async () => {

            try {
                const response = await fetch('http://localhost:3000/palabrasall');
                const jsonData = await response.json();
                setData(jsonData);
                setFiltro(data)
                console.log(jsonData)

            } catch (error) {
                console.error(error);
            }

        };

        useEffect(() => {
            if (!dataCategoria.length) {
                fetch('http://localhost:3000/categoriagra')
                    .then(res => res.json())
                    .then((res) => { setDataCategoria(res) })
            }
        }, [dataCategoria])

        const handleSubmitAdd = (values, { resetForm }) => {
            try {

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
                values.acepciones = values.acepciones ? values.acepciones : 'No Aplica';
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
                    .then((response) => {
                        // Hacer algo con la respuesta del servidor

                        setArrTama([]);
                        setDataNeutro([]);
                        setDataChoco([]);
                        setDataNeutroIng([]);
                        setDataChocoIng([]);
                        resetForm();
                        fetchData();
                        setFiltro(data);

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


        const handleSubmitUpdate = (values, { resetForm }) => {
            try {

                const newValoresForm = {
                    palabra: valoresForm.palabra,
                    significado: valoresForm.significado,
                    acepciones: '',
                    sinonimos: '',
                    como_se_usa: valoresForm.como_se_usa,
                    ejemplo_neutro: "",
                    ejemplo_choco: "",
                    colaborador: "Mercado Fácil",
                    correo_electronico: "",
                    autorizado: true,
                    id_categoria: 1,
                    id_tipo: 1,
                    significadoIng: "",
                    acepcionesIng: "",
                    sinonimosIng: "",
                    como_se_usa_Ing: "",
                    ejemplo_neutro_ingles: "",
                    ejemplo_choco_ingles: ""

                }

                //Convertir los arreglos de ejemplos a una string

                const dataNeutroString = dataNeutro.join('|');
                const dataChocoString = dataChoco.join('|');

                const dataNeutroIngString = dataNeutroIng.length && !(dataNeutroIng.every((elemento) => elemento === "")) ? dataNeutroIng.join('|') : 'No translation yet';
                const dataChocoIngString = dataChocoIng.length && !(dataChocoIng.every((elemento) => elemento === "")) ? dataChocoIng.join('|') : 'No translation yet';

                // Agregar las cadenas de texto al objeto values
                newValoresForm.ejemplo_neutro = dataNeutroString;
                newValoresForm.ejemplo_choco = dataChocoString;
                newValoresForm.ejemplo_neutro_ingles = dataNeutroIngString;
                newValoresForm.ejemplo_choco_ingles = dataChocoIngString;
                //values.significado = values.significado ? values.significado : 'No Aplica';
                newValoresForm.acepciones = valoresForm.acepciones ? valoresForm.acepciones : 'No Aplica';
                newValoresForm.sinonimos = valoresForm.sinonimos ? valoresForm.sinonimos : 'No Aplica';
                newValoresForm.significadoIng = valoresForm.Ingle.significadoIng ? valoresForm.Ingle.significadoIng : 'No translation yet';
                newValoresForm.acepcionesIng = valoresForm.Ingle.acepcionesIng ? valoresForm.Ingle.acepcionesIng : 'No translation yet';
                newValoresForm.sinonimosIng = valoresForm.Ingle.sinonimosIng ? valoresForm.Ingle.sinonimosIng : 'No translation yet';
                newValoresForm.como_se_usa_Ing = valoresForm.Ingle.como_se_usa_Ing ? valoresForm.Ingle.como_se_usa_Ing : 'No translation yet';

                newValoresForm.id_categoria = valoresForm.Categorium.id;
                // Enviar los datos a la ruta del servidor
                fetch(`http://localhost:3000/palabras/${valoresForm.id}`, {
                    method: 'PUT',
                    body: JSON.stringify(newValoresForm),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                    .then((response) => response.json())
                    .then((data2) => {
                        // Hacer algo con la respuesta del servidor
                        console.log(data2);
                        setArrTama([]);
                        setDataNeutro([]);
                        setDataChoco([]);
                        setDataNeutroIng([]);
                        setDataChocoIng([]);
                        resetForm();
                        fetchData();
                        setFiltro(data);

                    })
                    .catch((error) => {
                        // Manejar el error
                        console.error(error);
                    });

                setModalConfirUpdate(true);
            } catch (error) {
                console.log("mensaje", error)
            }


        };

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
            setModalAdd(false);
            //onClose();
        };

        const closeModalUp = () => {
            setModalConfirUpdate(false);
            setModalUpdate(false);
            //onClose();
        };

        const closeModalAdd = () => {
            setModalAdd(false);
            setArrTama([]);
            setDataNeutro([]);
            setDataChoco([]);
            setDataNeutroIng([]);
            setDataChocoIng([]);
            //onClose();
        };

        const closeModalUpdate = () => {
            setModalUpdate(false);
            setArrTama([]);
            setDataNeutro([]);
            setDataChoco([]);
            setDataNeutroIng([]);
            setDataChocoIng([]);
            //onClose();
        };


        const handleInputChange = (e) => {
            const { name, value } = e.target;
            setValoresForm((prevState) => ({
                ...prevState,
                [name]: value
            }));
        };
        const handleInputChange2 = (e) => {
            const { name, value } = e.target;
            setValoresForm((prevState) => ({
                ...prevState,
                Ingle: {
                    ...prevState.Ingle,
                    [name]: value
                }
            }));
        };
        const handleSelectChange = (e) => {
            const { name, value } = e.target;
            setValoresForm((prevState) => ({
                ...prevState,
                Categorium: {
                    ...prevState.Categorium,
                    id: value
                }
            }));
        };

        return (
            <div className='container px-4 lg:px-0 min-h-screen'>
                <NavbarAdmin rol={rol}/>

                <p className='my-5 font-semibold text-mfColor text-4xl'>Administrador del Diccionario Choco</p>


                <TablaAdmin newFilter={newFilter} setFiltro={setFiltro} setModalUpdate={setModalUpdate} data={data} setData={setData}
                    setValoresForm={setValoresForm} setArrTama={setArrTama} setDataNeutro={setDataNeutro}
                    setDataChoco={setDataChoco} setDataNeutroIng={setDataNeutroIng} setDataChocoIng={setDataChocoIng} fetchData={fetchData} setModalAdd={setModalAdd}
                    rol={rol} />
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
                            id_categoria: 0,
                            id_tipo: 1,
                            autorizado: true,
                            colaborador: 'Mercado Fácil',
                            correo_electronico: ''

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
                        onSubmit={handleSubmitAdd}
                    >
                        {({ values, errors }) => (
                            <Form >



                                <div
                                    className={`fixed bg-modal z-50 inset-0 flex items-center justify-center transition-all duration-200 ${modalAdd ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                                >
                                    <div className='w-full h-full p-3 max-h-full flex-col overflow-auto'>
                                        <div className='w-full p-4 bg-white rounded-2xl shadow-mfBoxShadow border-solid border-2 border-mfColor'>
                                            <h2 className='mb-4 font-semibold text-mfColor text-3xl'>Agregar Nueva Palabra</h2>
                                            <div className='w-full flex flex-col xl:flex-row gap-4'>
                                                <div className='w-full'>
                                                    <div className='w-auto flex flex-col md:flex-row justify-center items-center xl:items-start gap-1 md:gap-5 mb-4 xl:mb-0'>
                                                        <FormField2
                                                            label="Palabra:"
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
                                                    <div className='w-auto flex flex-col md:flex-row justify-center items-center xl:items-start gap-1 md:gap-5'>
                                                        <FormField2
                                                            label="Significado:"
                                                            name="significado"
                                                            placeholder="Significado de la palabra"
                                                            errors={errors}
                                                        />

                                                        <FormField2
                                                            label="Sinónimos (separados por coma):"
                                                            name="sinonimos"
                                                            placeholder="Sinónimos de la palabra"
                                                        // errors={errors}
                                                        />


                                                    </div>


                                                    <div className='w-auto flex flex-col md:flex-row justify-center items-center xl:items-start gap-1 md:gap-5'>
                                                        <FormField2
                                                            label="Acepciones:"
                                                            name="acepciones"
                                                            placeholder="Acepciones de la palabra"
                                                        // errors={errors}
                                                        />

                                                        <FormField2
                                                            label="¿Cómo se usa?:"
                                                            name="como_se_usa"
                                                            placeholder="¿Cómo se usa?"
                                                            errors={errors}
                                                        />
                                                    </div>
                                                </div>

                                                <div className='w-full'>
                                                    <div className='w-full flex justify-between flex-col gap-2 md:gap-0 xl:flex-row items-center xl:pr-5'>
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

                                                    <div className='w-auto flex flex-col md:flex-row justify-center items-center gap-1 md:gap-5'>
                                                        <FormField2
                                                            label="Significado:"
                                                            name="significadoIng"
                                                            placeholder="Traducir significado de la palabra"
                                                        //errors={errors}
                                                        />

                                                        <FormField2
                                                            label="Sinónimos (separados por coma):"
                                                            name="sinonimosIng"
                                                            placeholder="Traducir sinónimos de la palabra"
                                                        // errors={errors}
                                                        />


                                                    </div>


                                                    <div className='w-auto flex flex-col md:flex-row justify-center items-center gap-1 md:gap-5'>
                                                        <FormField2
                                                            label="Acepciones:"
                                                            name="acepcionesIng"
                                                            placeholder="Traducir acepciones de la palabra"
                                                        // errors={errors}
                                                        />

                                                        <FormField2
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

                                                                </div>
                                                            </div>
                                                        ))}

                                                    </div>




                                                </div>
                                            </div>

                                            <div className='w-full flex items-center flex-col-reverse sm:flex-row gap-1 justify-center sm:gap-2'>
                                                <button type='reset' className='w-auto rounded-md mt-2 bg-white px-3 py-2 text-mfColor shadow-md border-solid border-2 border-mfColor font-semibold' onClick={closeModalAdd}>Cancelar</button>
                                                <button type='submit' className='w-auto rounded-md mt-2 bg-mfColor px-3 py-2 text-white shadow-md font-medium'>Agregar Palabra</button>
                                            </div>
                                            <div
                                                className={`fixed bg-modal inset-0 flex items-center justify-center transition-all duration-200 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                                                    }`}
                                            >
                                                <div className="bg-white sm:mx-5 sm:w-96 p-5 rounded-xl shadow-mfBoxShadow border">
                                                    <p className="text-2xl text-gray-800 font-bold mb-3">¡Palabra Agregada!</p>
                                                    <p className='text-8xl mb-2 text-green-600'><i className="fa-regular fa-circle-check"></i></p>
                                                    <p className="text-lg text-gray-700 font-medium mb-4">La palabra se ha agregado exitosamente al diccionario del choco.</p>
                                                    <button type="button" className='w-auto h-min rounded-md bg-mfColor px-3 py-1.5 text-white shadow-md font-medium' onClick={closeModal}>Aceptar</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </Form>




                        )}
                    </Formik>


                    <Formik
                        //almacena los valores de cada campo
                        initialValues={valoresForm}
                        //validar que los valores escritos dentro del campo, correspondan a lo solicitado en cada tabla
                        validate={(valores) => {
                            let errores = {};


                            if (!valoresForm.palabra) {
                                errores.palabra = 'Campo obligatorio*'
                            }

                            //valores de significado
                            if (!valoresForm.significado || valoresForm.significado == 'No Aplica') {
                                errores.significado = 'Campo obligatorio*'
                            }

                            if (valoresForm.Categorium.id == 0) {
                                errores.id_categoria = 'Debe seleccionar una categoría*'
                            }

                            //valores de como se usa
                            if (!valoresForm.como_se_usa) {
                                errores.como_se_usa = 'Campo obligatorio*'
                            }


                            //valores de ejemplo neutro

                            if (arrTama.length == 0) {
                                errores.titleEjemploAc = 'Debe agregar almenos un ejemplo*'
                            }

                            //valores de ejemplo neutro

                            if (arrTama.length == 0) {
                                errores.titleEjemploAc = 'Debe agregar almenos un ejemplo*'
                            }

                            arrTama.map((item, index) => {
                                if (!dataNeutro[index]) {
                                    errores.titleEjemploAc = 'Ejemplo neutro necesario*'
                                }
                                //valores de ejemplo choco
                                if (!dataChoco[index]) {
                                    errores.EjemploChoco = 'Ejemplo choco necesario*'
                                }
                            })



                            return errores;
                        }}
                        //para enviar formulario
                        onSubmit={handleSubmitUpdate}
                    >
                        {({ values, errors }) => (
                            <Form >




                                <div
                                    className={`fixed bg-modal z-50 inset-0 flex items-center justify-center transition-all duration-200 ${modalUpdate ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                                >
                                    <div className='w-full h-full p-3 max-h-full flex-col overflow-auto'>
                                        <div className='w-full p-4 bg-white rounded-2xl shadow-mfBoxShadow border-solid border-2 border-mfColor'>
                                            <h2 className='mb-4 font-semibold text-mfColor text-3xl'>Actualizar Palabra</h2>
                                            <div className='w-full flex flex-col xl:flex-row gap-4'>
                                                <div className='w-full'>
                                                    <div className='w-auto flex flex-col md:flex-row justify-center items-center xl:items-start gap-1 md:gap-5 mb-4 xl:mb-0'>
                                                        <FormField
                                                            label="Palabra:"
                                                            name="palabra"
                                                            placeholder="Ingrese la palabra"
                                                            value={valoresForm.palabra}
                                                            onChange={handleInputChange}
                                                            errors={errors}
                                                        />

                                                        {console.log("Desde el formulario", valoresForm.palabra)}
                                                        <div className='text-left'>
                                                            <label htmlFor="selectedOption">Categoría Gramatical:</label>
                                                            <Field as="select" name="id_categoria" id="id_categoria"
                                                                value={valoresForm.Categorium.id}
                                                                onChange={handleSelectChange}
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
                                                        {console.log("id de categoria", valoresForm.Categorium.id)}
                                                    </div>
                                                    <div className='w-auto flex flex-col md:flex-row justify-center items-center xl:items-start gap-1 md:gap-5'>
                                                        <FormField
                                                            label="Significado:"
                                                            name="significado"
                                                            placeholder="Significado de la palabra"
                                                            value={valoresForm.significado == 'No Aplica' ? '' : valoresForm.significado}
                                                            onChange={handleInputChange}
                                                            errors={errors}
                                                        />

                                                        <FormField
                                                            label="Sinónimos (separados por coma):"
                                                            name="sinonimos"
                                                            placeholder="Sinónimos de la palabra"
                                                            value={valoresForm.sinonimos == 'No Aplica' ? '' : valoresForm.sinonimos}
                                                            onChange={handleInputChange}
                                                        // errors={errors}
                                                        />


                                                    </div>


                                                    <div className='w-auto flex flex-col md:flex-row justify-center items-center xl:items-start gap-1 md:gap-5'>
                                                        <FormField
                                                            label="Acepciones:"
                                                            name="acepciones"
                                                            placeholder="Acepciones de la palabra"
                                                            value={valoresForm.acepciones == 'No Aplica' ? '' : valoresForm.acepciones}
                                                            onChange={handleInputChange}
                                                        // errors={errors}
                                                        />

                                                        <FormField
                                                            label="¿Cómo se usa?:"
                                                            name="como_se_usa"
                                                            placeholder="¿Cómo se usa?"
                                                            value={valoresForm.como_se_usa}
                                                            onChange={handleInputChange}
                                                            errors={errors}
                                                        />
                                                    </div>
                                                </div>

                                                <div className='w-full'>
                                                    <div className='w-full flex justify-between flex-col gap-2 md:gap-0 xl:flex-row items-center xl:pr-5'>
                                                        <div className='text-left md:mb-2'>
                                                            <label htmlFor='titleEjemploAc'>Ejemplos Agregados: <span className='font-bold'>{`${arrTama.length}`}</span></label>

                                                            <ErrorMessage name="titleEjemploAc" component={() => (
                                                                <div className='error text-red-600 font-medium'>{errors.titleEjemploAc}</div>
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

                                            <h2 className='mb-4 font-semibold text-mfColor text-3xl'>Actualizar Traducción Inglés</h2>
                                            <div className='w-full flex flex-col xl:flex-row gap-4'>
                                                <div className='w-full'>
                                                    <div className='w-auto flex flex-col md:flex-row justify-center items-center gap-1 md:gap-5'>
                                                        <FormField
                                                            label="Significado:"
                                                            name="significadoIng"
                                                            placeholder="Traducir significado de la palabra"
                                                            value={valoresForm.Ingle.significadoIng == 'No translation yet' ? '' : valoresForm.Ingle.significadoIng}
                                                            onChange={handleInputChange2}
                                                        //errors={errors}
                                                        />
                                                        <FormField
                                                            label="Sinónimos (separados por coma):"
                                                            name="sinonimosIng"
                                                            placeholder="Traducir sinónimos de la palabra"
                                                            value={valoresForm.Ingle.sinonimosIng == 'No translation yet' ? '' : valoresForm.Ingle.sinonimosIng}
                                                            onChange={handleInputChange2}
                                                        // errors={errors}
                                                        />


                                                    </div>


                                                    <div className='w-auto flex flex-col md:flex-row justify-center items-center gap-1 md:gap-5'>
                                                        <FormField
                                                            label="Acepciones:"
                                                            name="acepcionesIng"
                                                            placeholder="Traducir acepciones de la palabra"
                                                            value={valoresForm.Ingle.acepcionesIng == 'No translation yet' ? '' : valoresForm.Ingle.acepcionesIng}
                                                            onChange={handleInputChange2}
                                                        // errors={errors}
                                                        />

                                                        <FormField
                                                            label="¿Cómo se usa?:"
                                                            name="como_se_usa_Ing"
                                                            placeholder="Traducir ¿Cómo se usa?"
                                                            value={valoresForm.Ingle.como_se_usa_Ing == 'No translation yet' ? '' : valoresForm.Ingle.como_se_usa_Ing}
                                                            onChange={handleInputChange2}
                                                        // errors={errors}
                                                        />
                                                    </div>
                                                </div>

                                                <div className='w-full'>
                                                    <div className='w-full flex'>
                                                        <div className='w-full flex justify-center xl:justify-normal items-center mb-2'>
                                                            <label htmlFor='titleEjemploAc'>Ejemplos a traducir: <span className='font-bold'>{`${arrTama.length}`}</span></label>

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
                                                                        value={dataNeutroIng[index] == 'No translation yet' ? '' : dataNeutroIng[index]}
                                                                        placeholder="Traducir ejemplo neutro"
                                                                        className="px-2 py-1.5 bg-white border shadow-sm border-slate-500 placeholder-slate-500 focus:outline-none focus:border-mfColor focus:ring-mfColor block w-full sm:w-64 rounded-md sm:text-base focus:ring-1"
                                                                        onChange={(event) => arrEjemNeutroIng(event.target.value, index)}
                                                                    />

                                                                </div>

                                                                <div className='text-left mb-3'>
                                                                    <label htmlFor={`ejemplo_choco${index}`}>{`${index + 1}- Ejemplo Choco:`}</label>
                                                                    <Field
                                                                        type='text'
                                                                        id={`ejemplo_choco${index}`}
                                                                        name={`ejemplo_choco${index}`}
                                                                        value={dataChocoIng[index] == 'No translation yet' ? '' : dataChocoIng[index]}
                                                                        placeholder="Traducir ejemplo choco"
                                                                        className="px-2 py-1.5 bg-white border shadow-sm border-slate-500 placeholder-slate-500 focus:outline-none focus:border-mfColor focus:ring-mfColor block w-full sm:w-64 rounded-md sm:text-base focus:ring-1"
                                                                        onChange={(event) => arrEjemChocoIng(event.target.value, index)}
                                                                    />

                                                                </div>
                                                            </div>
                                                        ))}

                                                    </div>


                                                </div>
                                            </div>

                                            <div className='w-full flex items-center flex-col-reverse sm:flex-row gap-1 justify-center sm:gap-2'>
                                                <button type='reset' className='w-auto rounded-md mt-2 bg-white px-3 py-2 text-mfColor shadow-md border-solid border-2 border-mfColor font-semibold' onClick={closeModalUpdate}>Cancelar</button>
                                                <button type='submit' className='w-auto rounded-md mt-2 bg-mfColor px-3 py-2 text-white shadow-md font-medium'>Actualizar Palabra</button>
                                            </div>
                                            <div
                                                className={`fixed bg-modal inset-0 flex items-center justify-center transition-all duration-200 ${modalConfirUpdate ? 'opacity-100' : 'opacity-0 pointer-events-none'
                                                    }`}
                                            >
                                                <div className="bg-white sm:mx-5 sm:w-96 p-5 rounded-xl shadow-mfBoxShadow border">
                                                    <p className="text-2xl text-gray-800 font-bold mb-3">¡Palabra Actualizada!</p>
                                                    <p className='text-8xl mb-2 text-green-600'><i className="fa-regular fa-circle-check"></i></p>
                                                    <p className="text-lg text-gray-700 font-medium mb-4">La palabra se ha actualizado exitosamente.</p>
                                                    <button type="button" className='w-auto h-min rounded-md bg-mfColor px-3 py-1.5 text-white shadow-md font-medium' onClick={closeModalUp}>Aceptar</button>
                                                </div>
                                            </div>
                                        </div>
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