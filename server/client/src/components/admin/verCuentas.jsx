import { useEffect, useState } from 'react';
import NavBar from '../navbars/navbar';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const FormField = ({ label, name, placeholder, errors, value, onChange, type = 'text' }) => (
    <div className='text-left mb-5'>
        <label className='block text-base font-medium leading-6 text-gray-900 mb-2' htmlFor={name}>{label}</label>
        <Field
            type={type}
            id={name}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="px-2 py-1.5 bg-white border shadow-sm border-slate-400 placeholder-slate-500 focus:outline-none focus:border-mfColor focus:ring-mfColor block w-full rounded-md sm:text-base focus:ring-1"
        />
        <ErrorMessage name={name} component={() => (
            <div className='error text-red-600 font-medium'>{errors[name]}</div>
        )} />
    </div>
);

const FormField2 = ({ label, name, placeholder, errors, type = 'text' }) => (
    <div className='text-left mb-5'>
        <label className='block text-base font-medium leading-6 text-gray-900 mb-2' htmlFor={name}>{label}</label>
        <Field
            type={type}
            id={name}
            name={name}
            placeholder={placeholder}
            className="px-2 py-1.5 bg-white border shadow-sm border-slate-400 placeholder-slate-500 focus:outline-none focus:border-mfColor focus:ring-mfColor block w-full rounded-md sm:text-base focus:ring-1"
        />
        <ErrorMessage name={name} component={() => (
            <div className='error text-red-600 font-medium'>{errors[name]}</div>
        )} />
    </div>
);

const VerCuentas = () => {

    const [eliPalabra, setEliPalabra] = useState('');
    const [showWarningModal, setShowWarningModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [dataCola, setDataCola] = useState({});
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);
    const [modalAdd, setModalAdd] = useState(false);
    const [modalUpdate, setModalUpdate] = useState(false);
    const [modalConfirUpdate, setModalConfirUpdate] = useState(false);
    const [valoresForm, setValoresForm] = useState({
        rol: '',
        newContra: '',
        agregar_mf: '',
        editar_mf: '',
        eliminar_mf: '',
        aprobar_pu: '',
        eliminar_pu: '',
        tokenCode: ''


    });

    useEffect(() => {
        const fetchProtectedData = async () => {
            const { token } = { token: localStorage.getItem('token') };
            try {
                // Hacer la solicitud GET a la ruta protegida
                const response = await fetch('http://localhost:3000/api/auth/user', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ token }),
                });

                if (response.ok) {
                    // Obtener los datos del usuario desde la respuesta
                    const data = await response.json();

                    if (data.user.id != 1) {
                        navigate('/admin');
                    }

                } else {
                    // Error en la solicitud, redirigir a la página de inicio de sesión
                    navigate('/admin');
                }
            } catch (error) {
                console.error('Error al realizar la solicitud:', error);
                navigate('/admin');
            }
        };

        fetchProtectedData();
    }, [navigate]);


    const fetchData = async () => {

        try {
            const response = await fetch('http://localhost:3000/allcola');
            const jsonData = await response.json();
            setDataCola(jsonData);
            //setFiltro(data)


        } catch (error) {
            console.error(error);
        }

    };

    useEffect(() => {
        fetchData();
    }, []);


    const handleAddCola = (values, { resetForm }) => {


        try {
            const min = 10000000; // Valor mínimo (8 dígitos)
            const max = 99999999; // Valor máximo (8 dígitos)
            const resultR = Math.floor(Math.random() * (max - min + 1)) + min;
            values.contrasena = resultR.toString(); // Convertir el resultado en una cadena de texto
            values.agregar_mf = values.agregar_mf ? values.agregar_mf : false
            values.editar_mf = values.editar_mf ? values.editar_mf : false
            values.eliminar_mf = values.eliminar_mf ? values.eliminar_mf : false
            values.aprobar_pu = values.aprobar_pu ? values.aprobar_pu : false
            values.eliminar_pu = values.eliminar_pu ? values.eliminar_pu : false

            // Enviar los datos a la ruta del servidor
            fetch('http://localhost:3000/api/auth/chocoregister', {
                method: 'POST',
                body: JSON.stringify(values),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => response.json())
                .then((response) => {
                    // Hacer algo con la respuesta del servidor

                    resetForm();
                    fetchData();
                    setIsOpen(true)
                })
                .catch((error) => {
                    // Manejar el error
                    console.error(error);
                });
        } catch (error) {
            console.log("mensaje", error);
            console.log("No Entro 2")
        }
    };

    const handleUpdateCola = (values, { resetForm }) => {

        try {
            if (values.newContra) {
                const min = 10000000; // Valor mínimo (8 dígitos)
                const max = 99999999; // Valor máximo (8 dígitos)
                const resultR = Math.floor(Math.random() * (max - min + 1)) + min;
                valoresForm.contrasena = resultR.toString();
            } else {
                valoresForm.contrasena = valoresForm.tokenCode;
            }
            valoresForm.agregar_mf = valoresForm.agregar_mf ? valoresForm.agregar_mf : false
            valoresForm.editar_mf = valoresForm.editar_mf ? valoresForm.editar_mf : false
            valoresForm.eliminar_mf = valoresForm.eliminar_mf ? valoresForm.eliminar_mf : false
            valoresForm.aprobar_pu = valoresForm.aprobar_pu ? valoresForm.aprobar_pu : false
            valoresForm.eliminar_pu = valoresForm.eliminar_pu ? valoresForm.eliminar_pu : false

            // Enviar los datos a la ruta del servidor
            fetch(`http://localhost:3000/api/auth//updatecola/${valoresForm.id}`, {
                method: 'PUT',
                body: JSON.stringify(valoresForm),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => response.json())
                .then((response) => {
                    // Hacer algo con la respuesta del servidor

                    resetForm();
                    fetchData();
                    setModalConfirUpdate(true);
                })
                .catch((error) => {
                    // Manejar el error
                    console.error(error);
                });
        } catch (error) {
            console.log("mensaje", error);
            console.log("No Entro 2")
        }
    };

    const handleDeleteConfirm = async () => {
        try {
            // Realiza la solicitud de eliminación al servidor utilizando el ID del dato
            await fetch(`http://localhost:3000/api/auth/deletecola/${itemToDelete}`, {
                method: 'DELETE',
            });
            // Actualiza los datos después de la eliminación
            fetchData();
            //setFiltro(data)
            //setInicio(false)
        } catch (error) {
            console.error(error);
        } finally {
            // Cierra el modal de advertencia
            setShowWarningModal(false);
        }
    };


    const eliminarDato = (id, palabra) => {
        setEliPalabra(palabra);
        setItemToDelete(id);
        setShowWarningModal(true);
    };

    const closeModalAdd = () => {
        setModalAdd(false);
        //onClose();
    };
    const closeModalUp = () => {
        setModalConfirUpdate(false);
        setModalUpdate(false);
        //onClose();
    };
    const closeModalUpdate = () => {
        setModalUpdate(false);

        //onClose();
    };
    const closeModal = () => {
        setIsOpen(false);
        setModalAdd(false);
        //onClose();
    };

    const actualizarDato = (row) => {

        //setIdUpdate(row.id);
        setModalUpdate(true);

        setValoresForm(row);


    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValoresForm((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setValoresForm((prevState) => ({
            ...prevState,
            [name]: checked
        }));
    };

    return (
        <div className='w-full min-h-screen'>
            <NavBar rol={'Colaboradores'} verDicc={"Ver Diccionario"} verDiccLink={'/'} tar={'_blank'} mfLogoAd={"MercadoFácil.mx"} mfLinkAd={"https://mercadofacil.mx/"}
                VA={"Volver"} />
            <div className='w-full px-4 md:px-6 py-1'>
                <div className='w-full flex gap-3 flex-col'>
                    <div>
                        <Formik
                            //almacena los valores de cada campo
                            initialValues={{
                                rol: '',
                                contrasena: '',
                                agregar_mf: '',
                                editar_mf: '',
                                eliminar_mf: '',
                                aprobar_pu: '',
                                eliminar_pu: '',

                            }}
                            //validar que los valores escritos dentro del campo, correspondan a lo solicitado en cada tabla
                            validate={(valores) => {
                                let errores = {};

                                //valores de palabra
                                if (!valores.rol) {
                                    errores.rol = 'Usuario requerido*'
                                }




                                return errores;
                            }}
                            //para enviar formulario
                            onSubmit={handleAddCola}
                        >
                            {({ values, errors }) => (
                                <Form >

                                    <div
                                        className={`fixed bg-modal z-50 inset-0 flex items-center justify-center transition-all duration-200 ${modalAdd ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                                    >
                                        <div className='sm:mx-5 sm:w-96 p-5 max-h-full flex-col overflow-auto'>
                                            <div className='w-full p-4 bg-white rounded-2xl shadow-mfBoxShadow border-solid border-2 border-mfColor'>
                                                <h2 className='mb-4 font-semibold text-mfColor text-3xl'>Agregar Nuevo Colaborador</h2>

                                                <FormField2
                                                    label="Colaborador:"
                                                    name="rol"
                                                    placeholder="Ingrese el nombre del colaborador"
                                                    errors={errors}
                                                />


                                                <div className='w-full flex text-start mb-4'>
                                                    <label className=''><span className='block text-base font-medium text-gray-900'>Contraseña:</span>(Es generada automaticamente)</label>
                                                </div>

                                                <label className='block text-lg font-medium text-gray'>Permisos</label>
                                                <div className='w-full flex flex-col text-start mb-4 mt-1'>
                                                    <label className='block text-base font-medium text-gray-900'>Aportaciones de MercadoFácil.mx:</label>

                                                    <label className="flex items-center">
                                                        <Field
                                                            type="checkbox"
                                                            name="agregar_mf"
                                                            className="form-checkbox mr-2"
                                                        />
                                                        Agregar
                                                    </label>

                                                    <label className="flex items-center">
                                                        <Field
                                                            type="checkbox"
                                                            name="editar_mf"
                                                            className="form-checkbox mr-2"
                                                        />
                                                        Editar
                                                    </label>

                                                    <label className="flex items-center">
                                                        <Field
                                                            type="checkbox"
                                                            name="eliminar_mf"
                                                            className="form-checkbox mr-2"
                                                        />
                                                        Eliminar
                                                    </label>
                                                </div>
                                                <div className='w-full flex flex-col text-start mb-4'>
                                                    <label className='block text-base font-medium text-gray-900'>Aportaciones del Público:</label>

                                                    <label className="flex items-center">
                                                        <Field
                                                            type="checkbox"
                                                            name="aprobar_pu"
                                                            className="form-checkbox mr-2"
                                                        />
                                                        Aprobar/Editar
                                                    </label>

                                                    <label className="flex items-center">
                                                        <Field
                                                            type="checkbox"
                                                            name="eliminar_pu"
                                                            className="form-checkbox mr-2"
                                                        />
                                                        Eliminar
                                                    </label>
                                                </div>


                                                <div className='w-full flex items-center flex-col-reverse sm:flex-row gap-1 justify-center sm:gap-2'>
                                                    <button type='reset' className='w-auto rounded-md mt-2 bg-white px-3 py-2 text-mfColor shadow-md border-solid border-2 border-mfColor font-semibold' onClick={closeModalAdd}>Cancelar</button>
                                                    <button type='submit' className='w-auto rounded-md mt-2 bg-mfColor px-3 py-2 text-white shadow-md font-medium'>Agregar Colaborador</button>
                                                </div>

                                            </div>
                                            <div
                                                className={`fixed bg-modal inset-0 flex items-center justify-center transition-all duration-200 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                                                    }`}
                                            >
                                                <div className="bg-white mx-3 sm:mx-5 sm:w-96 p-5 rounded-xl shadow-mfBoxShadow border">
                                                    <p className="text-2xl text-gray-800 font-bold mb-3">Colaborador Agregado</p>
                                                    <p className='text-8xl mb-2 text-green-600'><i className="fa-regular fa-circle-check"></i></p>
                                                    <p className="text-lg text-gray-700 font-medium mb-4">El colaborador se ha agregado exitosamente.</p>
                                                    <button type="button" className='w-auto h-min rounded-md bg-mfColor px-3 py-1.5 text-white shadow-md font-medium' onClick={closeModal}>Aceptar</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Form>


                            )}
                        </Formik>
                    </div>


                    {/**Formulario de actualización de colaboradores */}

                    <div>
                        <Formik
                            //almacena los valores de cada campo
                            initialValues={{
                                valoresForm
                            }}
                            //validar que los valores escritos dentro del campo, correspondan a lo solicitado en cada tabla
                            validate={(valores) => {
                                let errores = {};

                                //valores de palabra
                                if (!valoresForm.rol) {
                                    errores.rol = 'Usuario requerido*'
                                }




                                return errores;
                            }}
                            //para enviar formulario
                            onSubmit={handleUpdateCola}
                        >
                            {({ values, errors }) => (
                                <Form >

                                    <div
                                        className={`fixed bg-modal z-50 inset-0 flex items-center justify-center transition-all duration-200 ${modalUpdate ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                                    >
                                        <div className='sm:mx-5 sm:w-96 p-5 max-h-full flex-col overflow-auto'>
                                            <div className='w-full p-4 bg-white rounded-2xl shadow-mfBoxShadow border-solid border-2 border-mfColor'>
                                                <h2 className='mb-4 font-semibold text-mfColor text-3xl'>Actualizar Colaborador</h2>

                                                <FormField
                                                    label="Colaborador:"
                                                    name="rol"
                                                    placeholder="Ingrese el nombre del colaborador"
                                                    value={valoresForm.rol}
                                                    onChange={handleInputChange}
                                                    errors={errors}
                                                />


                                                <div className='w-full flex flex-col text-start mb-4'>
                                                    <label className='block text-base font-medium text-gray-900'>Contraseña:</label>
                                                    <label className="flex items-center">
                                                        <Field
                                                            type="checkbox"
                                                            name="newContra"
                                                            className="form-checkbox mr-2"
                                                        />
                                                        Generar nueva contraseña
                                                    </label>
                                                </div>

                                                <label className='block text-lg font-medium text-gray'>Permisos</label>
                                                <div className='w-full flex flex-col text-start mb-4 mt-1'>
                                                    <label className='block text-base font-medium text-gray-900'>Aportaciones de MercadoFácil.mx:</label>

                                                    <label className="flex items-center">
                                                        <Field
                                                            type="checkbox"
                                                            name="agregar_mf"
                                                            className="form-checkbox mr-2"
                                                            checked={valoresForm.agregar_mf}
                                                            onChange={handleCheckboxChange}
                                                        />
                                                        Agregar
                                                    </label>

                                                    <label className="flex items-center">
                                                        <Field
                                                            type="checkbox"
                                                            name="editar_mf"
                                                            className="form-checkbox mr-2"
                                                            checked={valoresForm.editar_mf}
                                                            onChange={handleCheckboxChange}
                                                        />
                                                        Editar
                                                    </label>

                                                    <label className="flex items-center">
                                                        <Field
                                                            type="checkbox"
                                                            name="eliminar_mf"
                                                            className="form-checkbox mr-2"
                                                            checked={valoresForm.eliminar_mf}
                                                            onChange={handleCheckboxChange}
                                                        />
                                                        Eliminar
                                                    </label>
                                                </div>
                                                <div className='w-full flex flex-col text-start mb-4'>
                                                    <label className='block text-base font-medium text-gray-900'>Aportaciones del Público:</label>

                                                    <label className="flex items-center">
                                                        <Field
                                                            type="checkbox"
                                                            name="aprobar_pu"
                                                            className="form-checkbox mr-2"
                                                            checked={valoresForm.aprobar_pu}
                                                            onChange={handleCheckboxChange}
                                                        />
                                                        Aprobar/Editar
                                                    </label>

                                                    <label className="flex items-center">
                                                        <Field
                                                            type="checkbox"
                                                            name="eliminar_pu"
                                                            className="form-checkbox mr-2"
                                                            checked={valoresForm.eliminar_pu}
                                                            onChange={handleCheckboxChange}
                                                        />
                                                        Eliminar
                                                    </label>
                                                </div>


                                                <div className='w-full flex items-center flex-col-reverse sm:flex-row gap-1 justify-center sm:gap-2'>
                                                    <button type='reset' className='w-auto rounded-md mt-2 bg-white px-3 py-2 text-mfColor shadow-md border-solid border-2 border-mfColor font-semibold' onClick={closeModalUpdate}>Cancelar</button>
                                                    <button type='submit' className='w-auto rounded-md mt-2 bg-mfColor px-3 py-2 text-white shadow-md font-medium'>Actualizar Colaborador</button>
                                                </div>

                                            </div>
                                            <div
                                                className={`fixed bg-modal inset-0 flex items-center justify-center transition-all duration-200 ${modalConfirUpdate ? 'opacity-100' : 'opacity-0 pointer-events-none'
                                                    }`}
                                            >
                                                <div className="bg-white mx-3 sm:mx-5 sm:w-96 p-5 rounded-xl shadow-mfBoxShadow border">
                                                    <p className="text-2xl text-gray-800 font-bold mb-3">Colaborador Actualizado</p>
                                                    <p className='text-8xl mb-2 text-green-600'><i className="fa-regular fa-circle-check"></i></p>
                                                    <p className="text-lg text-gray-700 font-medium mb-4">El colaborador se ha actualizado exitosamente.</p>
                                                    <button type="button" className='w-auto h-min rounded-md bg-mfColor px-3 py-1.5 text-white shadow-md font-medium' onClick={closeModalUp}>Aceptar</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Form>


                            )}
                        </Formik>
                    </div>


                    {/**Aquí termina el formulario de actualización de colaboradores */}
                    <p className='font-semibold text-mfColor text-3xl mb-4'>Colaboradores del Diccionario Choco</p>
                    <div className='w-full flex flex-col md:flex-row justify-between items-center mb-2'>
                        <p className='text-2xl font-semibold text-gray-900'>Colaboradores y Permisos</p>
                        <button type='button' className='w-auto rounded-md bg-mfColor px-3 py-2 text-white shadow-md font-medium' onClick={() => { setModalAdd(true) }}><i className="fa-solid fa-plus"></i> Nuevo Colaborador</button>

                    </div>
                    <div className='w-full overflow-y-auto rounded-xl shadow-mfBoxShadow p-2 h-table max-h-table mb-6'>

                        <table className="min-w-full divide-y divide-gray-200 border border-x-2 border-gray-400">
                            <thead className='border border-x-2 border-gray-400'>
                                <tr className="font-bold text-gray-900">
                                    <th colSpan={3}></th>
                                    <th colSpan={3} className='border border-x-2 border-gray-400'>Aportaciones MercadoFácil.mx</th>
                                    <th colSpan={2} className='border border-x-2 border-gray-400'>Aportaciones Públicas</th>
                                </tr>
                                <tr className="font-bold text-gray-900">
                                    <th className="px-3 py-2 border border-x-2 border-gray-400">Id</th>
                                    <th className="px-3 py-2 border border-x-2 border-gray-400">Colaborador</th>
                                    <th className="px-3 py-2 border border-x-2 border-gray-400">Contraseña</th>
                                    <th className="px-3 py-2 border border-x-2 border-gray-400">Agregar</th>
                                    <th className="px-3 py-2 border border-x-2 border-gray-400">Editar</th>
                                    <th className="px-3 py-2 border border-x-2 border-gray-400">Eliminar</th>
                                    <th className="px-3 py-2 border border-x-2 border-gray-400">Aprobar/Editar</th>
                                    <th className="px-3 py-2 border border-x-2 border-gray-400">Eliminar</th>
                                    <th className="px-3 py-2 border border-x-2 border-gray-400">Opciones</th>
                                    {/* ...otras columnas */}
                                </tr>
                            </thead>
                            <tbody >

                                {dataCola.length > 0 ?
                                    dataCola.map((e) => (
                                        <tr key={e.id} className="hover:bg-gray-100 border-b border-gray-300">
                                            <td className="py-2 border border-x-2 border-gray-300">{e.id}</td>
                                            <td className="py-2 border border-x-2 border-gray-300">{e.rol}</td>
                                            <td className="py-2 border border-x-2 border-gray-300">{e.tokenCode}</td>
                                            <td className="py-2 border border-x-2 border-gray-300">{e.agregar_mf ? <p className='text-xl text-green-600'><i className="fa-solid fa-circle-check"></i></p> : <p className='text-xl  text-red-600'><i className="fa-solid fa-circle-xmark"></i></p>}</td>
                                            <td className="py-2 border border-x-2 border-gray-300">{e.editar_mf ? <p className='text-xl  text-green-600'><i className="fa-solid fa-circle-check"></i></p> : <p className='text-xl  text-red-600'><i className="fa-solid fa-circle-xmark"></i></p>}</td>
                                            <td className="py-2 border border-x-2 border-gray-300">{e.eliminar_mf ? <p className='text-xl  text-green-600'><i className="fa-solid fa-circle-check"></i></p> : <p className='text-xl text-red-600'><i className="fa-solid fa-circle-xmark"></i></p>}</td>
                                            <td className="py-2 border border-x-2 border-gray-300">{e.aprobar_pu ? <p className='text-xl  text-green-600'><i className="fa-solid fa-circle-check"></i></p> : <p className='text-xl text-red-600'><i className="fa-solid fa-circle-xmark"></i></p>}</td>
                                            <td className="py-2 border border-x-2 border-gray-300">{e.eliminar_pu ? <p className='text-xl  text-green-600'><i className="fa-solid fa-circle-check"></i></p> : <p className='text-xl text-red-600'><i className="fa-solid fa-circle-xmark"></i></p>}</td>

                                            <td className="py-2 border border-x-2 border-gray-300">
                                                <button className="max-w-max my-auto h-min rounded-md bg-blue-600 px-3 py-2 mr-1 text-lg text-white shadow-md font-medium" onClick={() => actualizarDato(e)}><i className="fa-solid fa-pen-to-square"></i></button>
                                                <button className="max-w-max my-auto h-min rounded-md bg-red-600 px-3 py-2 text-lg text-white shadow-md font-medium" onClick={() => eliminarDato(e.id, e.rol)}>
                                                    <i className="fa-solid fa-trash"></i>
                                                </button></td>
                                        </tr>
                                    ))
                                    :
                                    <tr><td colSpan={10} className='py-3 font-bold text-gray-600 text-2xl'>No se encontraron colaboradores</td></tr>
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
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
        </div>


    );
};

export default VerCuentas;