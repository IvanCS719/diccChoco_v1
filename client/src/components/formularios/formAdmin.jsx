import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';

 const Formulario = () => {
    const [formularioenviado, cambiarformularioenviado] = useState(false);
    return (
        <>
            <Formik
            //almacena los valores de cada campo
                initialValues={{
                    palabra: '',
                    significado: '',
                    acepsion: '',
                    sinonimo: '',
                    comousar: '',
                    ejemploneutro: '',
                    ejemplochoco: ''
                }}
           //validar que los valores escritos dentro del campo, correspondan a lo solicitado en cada tabla
                validate={ (valores)=> {
                    let errores = {};

                    //valores de palabra
                    if(!valores.palabra){
                        errores.palabra = 'ingrese una palabra'
                    } else if(!/^[a-zA-Z\s.,;:?!¡¿()"'-]+$/.test(valores.palabra)){
                        errores.palabra = 'solo puedes escribir palabra y signos de puntuación'
                    }

                    //valores de significado
                    if(!valores.significado){
                        errores.significado = 'ingrese una significado'
                    } else if(!/^[a-zA-Z\s.,;:?!¡¿()"'-]+$/.test(valores.significado)){
                        errores.significado = 'solo puedes escribir palabras'
                    }

                    //valores de acepsiones
                    if(!valores.acepsion){
                        errores.acepsion = 'ingrese una palabra'
                    } else if(!/^[a-zA-Z\s.,;:?!¡¿()"'-]+$/.test(valores.acepsion)){
                        errores.acepsion = 'solo puedes escribir palabras'
                    }

                    //valores de sinónimos
                    if(!valores.sinonimo){
                        errores.sinonimo = 'ingrese una palabra'
                    } else if(!/^[a-zA-Z\s.,;:?!¡¿()"'-]+$/.test(valores.sinonimo)){
                        errores.sinonimo = 'solo puedes escribir palabras'
                    }

                    //valores de como se usa
                    if(!valores.comousar){
                        errores.comousar = 'ingrese una palabra'
                    } else if(!/^[a-zA-Z\s.,;:?!¡¿()"'-]+$/.test(valores.comousar)){
                        errores.comousar = 'solo puedes escribir palabras'
                    }

                    //valores de ejemplo neutro
                    if(!valores.ejemploneutro){
                        errores.ejemploneutro = 'ingrese una palabra'
                    } else if(!/^[a-zA-Z\s.,;:?!¡¿()"'-]+$/.test(valores.ejemploneutro)){
                        errores.ejemploneutro = 'solo puedes escribir palabras'
                    }

                    //valores de ejemplo choco
                    if(!valores.ejemplochoco){
                        errores.ejemplochoco = 'ingrese una palabra'
                    } else if(!/^[a-zA-Z\s.,;:?!¡¿()"'-]+$/.test(valores.ejemplochoco)){
                        errores.ejemplochoco = 'solo puedes escribir palabras'
                    }

                    return errores; 
                }} 
                //para enviar formulario
                onSubmit={(valores, {resetForm})=>{
                    resetForm();
                    cambiarformularioenviado(true);
                    setTimeout(() => cambiarformularioenviado(false), 3000);
                    console.log('formulario enviado');
                }}
            >  
                {( {errors} ) => ( 
                    <Form className='formulario'>
                        <div>
                            <label htmlFor='palabra'>Palabra</label>
                            <Field 
                                type='text' 
                                id='palabra' 
                                name='palabra' 
                                placeholder='palabras' 
                            />
                            <ErrorMessage name='palabra' component={() => (
                                <div className='error'>{errors.palabra}</div>
                            )} />
                        </div>

                        <div>
                            <label htmlFor='significado'>Significado</label>
                            <Field 
                                type='text' 
                                id='significado' 
                                name='significado' 
                                placeholder='significado' 
                            />
                            <ErrorMessage name='significado' component={() => (
                                <div className='error'>{errors.significado}</div>
                            )} />
                        </div>

                        <div>
                            <label htmlFor='acepsion'>Acepciones</label>
                            <Field 
                                type='text' 
                                id='acepsion' 
                                name='acepsion' 
                                placeholder='acepsion' 
                            />
                            <ErrorMessage name='acepsion' component={() => (
                                <div className='error'>{errors.acepsion}</div>
                            )} />
                        </div>

                        <div>
                            <label htmlFor='sinonimo'>Sinónimos</label>
                            <Field 
                                type='text' 
                                id='sinonimo' 
                                name='sinonimo' 
                                placeholder='sinonimo' 
                            />
                            <ErrorMessage name='sinonimo' component={() => (
                                <div className='error'>{errors.sinonimo}</div>
                            )} />
                        </div>

                        <div>
                            <label htmlFor='comousar'>Como se usa</label>
                            <Field 
                                type='text' 
                                id='comousar' 
                                name='comousar' 
                                placeholder='como usar' 
                            />
                            <ErrorMessage name='comousar' component={() => (
                                <div className='error'>{errors.comousar}</div>
                            )} />
                        </div>

                        <div>
                            <label htmlFor="ejemploneutro">Ejemplo neutro</label>
                           <Field
                                as="textarea"
                                cols="10" rows="3"
                                id="ejemploneutro"
                                name="ejemploneutro"
                                placeholder="Escribe ejemplos separados por una coma"
                            />
                            <ErrorMessage name='ejemploneutro' component={() => (
                                <div className='error'>{errors.ejemploneutro}</div>
                            )} />
                        </div>

                        <div>
                            <label htmlFor="ejemplochoco">Ejemplo choco</label>
                           <Field
                                as="textarea"
                                cols="10" rows="3"
                                id="ejemplochoco"
                                name="ejemplochoco"
                                placeholder="Escribe ejemplos separados por una coma"
                            />
                            <ErrorMessage name='ejemplochoco' component={() => (
                                <div className='error'>{errors.ejemplochoco}</div>
                            )} />
                        </div>
                 
                        <button type='submit'>Enviar formulario</button>
                        {formularioenviado && <p className='enviado'>Formulario enviado</p>}
                    </Form>
                )}
            </Formik>
        </>
    );
}
 
export default Formulario;