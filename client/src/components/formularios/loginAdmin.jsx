import { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import NavBar from '../navbars/navbar';


const FormField = ({ label, name, placeholder, errors, type = 'text' }) => (
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


export default function Example() {
    const [modalConfirUpdate, setModalConfirUpdate] = useState(false);
    const closeModalUp = () => {
        setModalConfirUpdate(false);
        //onClose();
    };

    const navigate = useNavigate();

    const handleLogin = async (values) => {
        const { rol, contrasena } = values;
        try {
            const response = await fetch('http://localhost:3000/api/auth/chocologin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ rol, contrasena }),
            });

            if (response.ok) {
                const { token , user} = await response.json();
                //console.log("dentro", user)
                if(user === 'Admin' || user === 'admin'){
                    localStorage.setItem('admin', token);
                }else{
                    localStorage.setItem('colaborador', token);
                }
                
                navigate('/admin'); // Redirigir a la página protegida después de iniciar sesión
            } else {
                setModalConfirUpdate(true);
            }
        } catch (error) {
            console.error(error);
            setModalConfirUpdate(true);
        }
     
        /*const usuarioCorrecto = 'admin';
        const contrasenaCorrecta = '123';

        const usuarioCorrectoCola = 'colaborador';
        const contrasenaCorrectaCola = '123';

        if (usuario === usuarioCorrecto && password === contrasenaCorrecta) {

            // Credenciales correctas
            const token = 'admin23mf'; // Reemplaza esto con tu token real

            // Almacena el token en localStorage
            localStorage.setItem('admin', token);
            // Obtén el token después de que el usuario haya iniciado sesión
            // const token = 'token'; // Reemplaza esto con tu token real
            // Inicio de sesión exitoso, redirigir a otra página
            navigate('/admin');// URL de la página a la que deseas redirigir
            // Almacena el token en localStorage
            //  localStorage.setItem('token', token);

        } else if (usuario === usuarioCorrectoCola && password === contrasenaCorrectaCola) {

            // Credenciales correctas
            const token = 'cola23mf23'; // Reemplaza esto con tu token real

            // Almacena el token en localStorage
            localStorage.setItem('colaborador', token);
            // Obtén el token después de que el usuario haya iniciado sesión
            // const token = 'token'; // Reemplaza esto con tu token real
            // Inicio de sesión exitoso, redirigir a otra página
            navigate('/admin');// URL de la página a la que deseas redirigir
            // Almacena el token en localStorage
            //  localStorage.setItem('token', token);
        } else {
            // Credenciales incorrectas, mostrar modal de error
            setModalConfirUpdate(true);
        }*/
    };

    return (
        <>
            <div className='w-full min-h-screen'>
                <NavBar mfLogo={"MercadoFácil.mx"} mfLink={"https://mercadofacil.mx/"} cola={"Salir"} colaLink={"/"}
                />

                <div className='w-full px-2 md:px-2 flex flex-col items-center'>

                    <div className="w-full min-h-full flex flex-1 flex-col justify-center px-5 py-8 lg:px-8">

                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                            <p className='text-9xl text-mfColor'><i className="fa-solid fa-circle-user"></i></p>
                            <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-800">
                                Las Palabras del Choco<br />(Panel)
                            </h2>
                        </div>

                        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm px-0 lg:px-2">
                            <Formik
                                //almacena los valores de cada campo
                                initialValues={{
                                    rol: '',
                                    contrasena: ''

                                }}
                                //validar que los valores escritos dentro del campo, correspondan a lo solicitado en cada tabla
                                validate={(valores) => {
                                    let errores = {};

                                    //valores de palabra
                                    if (!valores.rol) {
                                        errores.rol = 'Usuario requerido*'
                                    }

                                    //valores de significado
                                    if (!valores.contrasena) {
                                        errores.contrasena = 'Contraseña requerida*'
                                    }



                                    return errores;
                                }}
                                //para enviar formulario
                                onSubmit={handleLogin}
                            >
                                {({ values, errors }) => (
                                    <Form >

                                        <FormField
                                            label="Usuario:"
                                            name="rol"
                                            placeholder="Ingrese su nombre de usuario"
                                            errors={errors}
                                        />

                                        <FormField
                                            type='password'
                                            label="Contraseña:"
                                            name="contrasena"
                                            placeholder="Ingrese su contraseña"
                                            errors={errors}
                                        />
                                        <div>
                                            <button
                                                type="submit"
                                                className="flex w-full justify-center rounded-md bg-mfColor px-3 py-1.5 text-base font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            >
                                                Acceder
                                            </button>
                                        </div>
                                    </Form>


                                )}
                            </Formik>




                        </div>
                        <div
                            className={`fixed bg-modal inset-0 flex items-center justify-center px-3 sm:px-0 transition-all duration-200 ${modalConfirUpdate ? 'opacity-100' : 'opacity-0 pointer-events-none'
                                }`}
                        >
                            <div className="bg-white sm:mx-5 sm:w-96 p-5 rounded-xl shadow-mfBoxShadow border">
                                <p className="text-2xl text-gray-800 font-bold mb-3">Usuario no encontrado</p>
                                <p className='text-8xl mb-2 text-red-600'><i className="fa-regular fa-circle-xmark"></i></p>
                                <p className="text-lg text-gray-700 font-medium mb-4">Verfique que el usuario y contraseña sean correctos.</p>
                                <button type="button" className='w-auto h-min rounded-md bg-mfColor px-3 py-1.5 text-white shadow-md font-medium' onClick={closeModalUp}>Aceptar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
