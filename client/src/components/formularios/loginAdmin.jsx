import { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

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
    return (
        <>
        
            <div className="min-h-full flex flex-1 flex-col justify-center px-5 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-36 w-auto"
                        src='/src/assets/logoDiccChoco.jpeg'
                        alt="Your Company"
                    />
                    <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-800">
                        Las Palabras del Choco<br />(Admnistrador)
                    </h2>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm px-0 lg:px-2">
                    <Formik
                        //almacena los valores de cada campo
                        initialValues={{
                            usuario: '',
                            password: ''

                        }}
                        //validar que los valores escritos dentro del campo, correspondan a lo solicitado en cada tabla
                        validate={(valores) => {
                            let errores = {};

                            //valores de palabra
                            if (!valores.usuario) {
                                errores.usuario = 'Usuario requerido*'
                            }

                            //valores de significado
                            if (!valores.password) {
                                errores.password = 'Contraseña requerida*'
                            }



                            return errores;
                        }}
                    //para enviar formulario
                    // onSubmit={handleSubmit}
                    >
                        {({ values, errors }) => (
                            <Form >

                                <FormField
                                    label="Usuario:"
                                    name="usuario"
                                    placeholder="Ingrese su nombre de usuario"
                                    errors={errors}
                                />

                                <FormField
                                    type='password'
                                    label="Contraseña:"
                                    name="password"
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
        </>
    )
}
