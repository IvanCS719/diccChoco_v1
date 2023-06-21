import {DataTypes} from 'sequelize';
import {sequelize} from '../../database/database.js';
import { CategoriaIng } from '../../models/diccChoco/CategoriaIngle.js';
//import { Palabras } from './Palabras.js';

export const Categoria = sequelize.define('Categoria', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    categoria:{
        type: DataTypes.STRING
    }
}, { timestamps: false });

Categoria.hasOne(CategoriaIng, {
  foreignKey: 'id_categoria',
  sourceKey: 'id'
});
CategoriaIng.belongsTo(Categoria, {
  foreignKey: 'id_categoria',
  targetId: 'id'
});

// Array con los datos a insertar

  const categoriaData = [
    
      { categoria: 'Sustantivo', categoriaIng: 'Noun' },
      { categoria: 'Sustantivo común', categoriaIng: 'Common noun' },
      { categoria: 'Sustantivo propio', categoriaIng: 'Proper noun' },
      { categoria: 'Sustantivo concreto', categoriaIng: 'Concrete noun' },
      { categoria: 'Sustantivo abstracto', categoriaIng: 'Abstract noun' },
  
      { categoria: 'Adjetivo', categoriaIng: 'Adjective' },
      { categoria: 'Adjetivo calificativo', categoriaIng: 'Descriptive adjective' },
      { categoria: 'Adjetivo posesivo', categoriaIng: 'Possessive adjective' },
      { categoria: 'Adjetivo demostrativo', categoriaIng: 'Demostrative adjective' },
      { categoria: 'Adjetivo numérico', categoriaIng: 'Numeral adjective' },
      { categoria: 'Adjetivo indefinido', categoriaIng: 'Indefinitive adjective' },
      { categoria: 'Adjetivo interrogativo', categoriaIng: 'Interrogative adjective' },
  
      { categoria: 'Verbo', categoriaIng: 'Verb' },
      { categoria: 'Verbo transitivo', categoriaIng: 'Transitive verb' },
      { categoria: 'Verbo intransitivo', categoriaIng: 'Intransitive verb' },
      { categoria: 'Verbo reflexivo', categoriaIng: 'Reflexive verb' },
      { categoria: 'Verbo regular', categoriaIng: 'Regular verb' },
      { categoria: 'Verbo irregular', categoriaIng: 'Irregular verb' },
      { categoria: 'Verbo auxiliar', categoriaIng: 'Auxiliary verb' },
  
      { categoria: 'Adverbio', categoriaIng: 'Adverb' },
      { categoria: 'Adverbio de tiempo', categoriaIng: 'Adverb of time' },
      { categoria: 'Adverbio de lugar', categoriaIng: 'Adverb of place' },
      { categoria: 'Adverbio de modo', categoriaIng: 'Adverb of manner' },
      { categoria: 'Adverbio de cantidad', categoriaIng: 'Adverb of quantity' },
      { categoria: 'Adverbio de afirmación', categoriaIng: 'Adverb of affirmation' },
      { categoria: 'Adverbio de negación', categoriaIng: 'Adverb of negation' },
  
      { categoria: 'Pronombre', categoriaIng: 'Pronoun' },
      { categoria: 'Pronombre personal', categoriaIng: 'Personal pronoun' },
      { categoria: 'Pronombre posesivo', categoriaIng: 'Possessive pronoun' },
      { categoria: 'Pronombre demostrativo', categoriaIng: 'Demonstrative pronoun' },
      { categoria: 'Pronombre indefinido', categoriaIng: 'Indefinite pronoun' },
      { categoria: 'Pronombre interrogativo', categoriaIng: 'Interrogative pronoun' },
      { categoria: 'Pronombre reflexivo', categoriaIng: 'Reflexive pronoun' },
  
      { categoria: 'Artículo', categoriaIng: 'Article' },
      { categoria: 'Artículo definido', categoriaIng: 'Definite article' },
      { categoria: 'Artículo indefinido', categoriaIng: 'Indefinite article' },
  
      { categoria: 'Preposición', categoriaIng: 'Preposition' },
  
      { categoria: 'Conjunción', categoriaIng: 'Conjuntion' },
      { categoria: 'Conjunción copulativa', categoriaIng: 'Copulative conjuntion' },
      { categoria: 'Conjunción disyuntiva', categoriaIng: 'Disjuntive conjuntion' },
      { categoria: 'Conjunción adversativa', categoriaIng: 'Adversative conjuntion' },
      { categoria: 'Conjunción causal', categoriaIng: 'Causal conjuntion' },
      { categoria: 'Conjunción condicional', categoriaIng: 'Conditional conjuntion' },
      { categoria: 'Conjunción consecutiva', categoriaIng: 'Consecutive conjuntion' },
  
      { categoria: 'Interjección', categoriaIng: 'Interjection' },
      
      { categoria: 'Determinante', categoriaIng: 'Determiner' },
      { categoria: 'Determinante posesivo', categoriaIng: 'Possessive determiner' },
      { categoria: 'Determinante demostrativo', categoriaIng: 'Demonstrative determiner' },
      { categoria: 'Determinante numérico', categoriaIng: 'Numeral determiner' },
      { categoria: 'Determinante indefinido', categoriaIng: 'Indefinite determiner' },
  
      { categoria: 'Numeral', categoriaIng: 'Numeral' },
      { categoria: 'Numeral cardinal', categoriaIng: 'Cardinal numeral' },
      { categoria: 'Numeral ordinal', categoriaIng: 'ordinal numeral' },
      { categoria: 'Numeral multiplicativo', categoriaIng: 'Multiplicative numeral' },
      { categoria: 'Numeral fraccionario', categoriaIng: 'Fractional numeral' },
  
      { categoria: 'Infinitivo', categoriaIng: 'Infinitive' },
      { categoria: 'Sin categoría', categoriaIng: 'no category' },
      { categoria: 'verbo pronominal', categoriaIng: 'pronominal verb'}
    ];
  
  // Sincroniza los modelos con la base de datos y crea las tablas
  try {
    sequelize.sync()
  .then(() => {
    const promises = categoriaData.map((categoriaData) => {
      return Categoria.findOrCreate({
        where: { categoria: categoriaData.categoria },
        defaults: categoriaData
      }).then(([categoria, created]) => {
        return CategoriaIng.findOrCreate({
          where: { id_categoria: categoria.id },
          defaults: { categoriaIng: categoriaData.categoriaIng }
        });
      });/*.then(([categoria, created]) => {
        return CategoriaFra.findOrCreate({
          where: { id_categoria: categoria.id },
          defaults: { categoriaFra: categoriaData.categoriaFra }
        });
      });*/
    });

    return Promise.all(promises);
  })
  .then(() => {
    console.log('Datos insertados exitosamente!');
    // Aquí puedes realizar otras operaciones con las tablas
  })
  .catch(err => {
    console.error('Error al crear las tablas y insertar los datos:', err);
  });
  } catch (error) {
    
  }

