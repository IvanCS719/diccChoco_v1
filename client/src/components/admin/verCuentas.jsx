import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { useEffect, useState } from 'react';
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

const VerCuentas = () => {



    return (
        <div className='w-full min-h-screen'>
            <NavBar rol={'Cuentas'} verDicc={"Ver Diccionario"} verDiccLink={'/'} tar={'_blank'} mfLogoAd={"MercadoFácil.mx"} mfLinkAd={"https://mercadofacil.mx/"}
                CS={"Cerrar Sesión"} />
            <div className='w-full px-4 md:px-6 py-6'>
                <div className='w-full flex gap-3 flex-col md:flex-row'>
                    <div>
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
                        //onSubmit={handleLogin}
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
                                        label="Contraseña:"
                                        name="contrasena"
                                        placeholder="Ingrese su contraseña"
                                        errors={errors}
                                    />

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
                                   
                                    <label className="flex items-center">
                                        <Field
                                            type="checkbox"
                                            name="aprobar_pu"
                                            className="form-checkbox mr-2"
                                        />
                                        Aprobar
                                    </label>
                                    
                                    <label className="flex items-center">
                                        <Field
                                            type="checkbox"
                                            name="eliminar_pu"
                                            className="form-checkbox mr-2"
                                        />
                                        Eliminar
                                    </label>
                                    

                                    <div>
                                        <button
                                            type="submit"
                                            className="flex w-full justify-center rounded-md bg-mfColor mt-5 px-3 py-1.5 text-base font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            Acceder
                                        </button>
                                    </div>
                                </Form>


                            )}
                        </Formik>
                    </div>

                    <div className='w-full overflow-y-auto rounded-xl shadow-mfBoxShadow p-2 h-table max-h-table mb-6'>
                        <table className="min-w-full divide-y divide-gray-200 border border-x-2 border-gray-500">
                            <thead className='border border-x-2 border-gray-500'>
                                <tr className="font-bold text-gray-900">
                                    <th colSpan={3}></th>
                                    <th colSpan={3} className='border border-x-2 border-gray-500'>Aportaciones MercadoFácil.mx</th>
                                    <th colSpan={2} className='border border-x-2 border-gray-500'>Aportaciones Públicas</th>
                                </tr>
                                <tr className="font-bold text-gray-900">
                                    <th className="px-3 py-2 border border-x-2 border-gray-500">Id</th>
                                    <th className="px-3 py-2 border border-x-2 border-gray-500">Colaborador</th>
                                    <th className="px-3 py-2 border border-x-2 border-gray-500">Contraseña</th>
                                    <th className="px-3 py-2 border border-x-2 border-gray-500">Agregar</th>
                                    <th className="px-3 py-2 border border-x-2 border-gray-500">Editar</th>
                                    <th className="px-3 py-2 border border-x-2 border-gray-500">Eliminar</th>
                                    <th className="px-3 py-2 border border-x-2 border-gray-500">Aprobar</th>
                                    <th className="px-3 py-2 border border-x-2 border-gray-500">Eliminar</th>
                                    <th className="px-3 py-2 border border-x-2 border-gray-500">Historial</th>
                                    <th className="px-3 py-2 border border-x-2 border-gray-500">Opciones</th>
                                    {/* ...otras columnas */}
                                </tr>
                            </thead>
                            <tbody >

                                <tr><td colSpan={10} className='py-3 font-bold text-gray-600 text-2xl'>No se encontraron colaboradores</td></tr>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>


    );
};

export default VerCuentas;