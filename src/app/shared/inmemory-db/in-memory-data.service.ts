import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const users =[
      {
        id: 1, 
        name: 'Enrique', 
        surname: 'Bruno', 
        type: 'COMPANY',
        email: 'enriquebruno@gmail.com',
        password: '12345678',
        passwordConfirm : '12345678',
        activities:[],
        birthdate:'10/10/1960',
        phone: 6866635354,
        nationality:'ES',
        nif:'31914309S',
        about:'ok',
        typeEducation:'Universidad',
        level:'Ingeniero(a)',
        nameEducation:'Informatica',
        universityEducation:'UPC',
        finishDateEducation:'02/03/2020'
      },
      {
        id: 2, 
        name: 'Betty ', 
        surname: 'Hernandez', 
        type: 'COMPANY',
        email: 'bettyhernandez@gmail.com',
        password: '12345678',
        passwordConfirm : '12345678',
        activities:[],
        birthdate:'10/10/1949',
        phone: 6866633354,
        nationality:'FR',
        nif:'31914309S',
        about:'ok',
        typeEducation:'Universidad',
        level:'Master',
        nameEducation:'Psicologia',
        universityEducation:'UOC',
        finishDateEducation:'02/03/2019'
      },
      {
        id: 3, 
        name: 'Santiago', 
        surname: 'Bruno', 
        type: 'TOURIST',
        email: 'santiagobruno@gmail.com',
        password: '12345678',
        passwordConfirm : '12345678',
        activities:[1,4],
        favorites:[2,3],
        birthdate:'10/10/1960',
        phone: 6866235354,
        nationality:'FR',
        nif:'31914309S',
        about:'ok',
        typeEducation:'C.Formativo',
        level:'Superior',
        nameEducation:'Redes',
        universityEducation:'IFP',
        finishDateEducation:'02/04/2019'
      },
      {
        id: 4, 
        name: 'Erika', 
        surname: 'Ramos', 
        type: 'TOURIST',
        email: 'erikaramos@gmail.com',
        password: '12345678',
        passwordConfirm : '12345678',
        activities:[3,4],
        favorites:[1,2,3],
        birthdate:'10/10/1980',
        phone: 6266635354,
        nationality:'ES',
        nif:'31914309S',
        about:'ok',
        typeEducation:'C.Formativo',
        level:'Medio',
        nameEducation:'Ciberseguridad',
        universityEducation:'IFP',
        finishDateEducation:'01/02/2020'
      }
      
    ];

    const activities = [
      { id: 1,
        name: 'Museu Picasso' ,
        category:'Cultura',
        subcategory:'Museo',
        price: 20,
        language: 'ES',
        date:'06/06/2020',
        description:'Es uno de los principales puntos de interés de la Ciudad Condal. Más de 4.000 obras del pintor malagueño que se encuentran en el palacio Aguilar, de estilo gótico y situado en la calle Montcada dentro del antiguo barrio de El Born',
        peopleRegistered: 11,
        userId:1 //son los dueños de las actividades.
      },
      { id: 2,
        name: 'Museo Nacional de Arte de Catalunya' ,
        category:'Arte Contemporaneo',
        subcategory:'Museo',
        price: 18,
        language: 'CAT',
        date:'05/04/2020',
        description:'también conocido por sus siglas MNAC, está situado en la ciudad de Barcelona, (España). Destaca por su colección de arte románico, considerada una de las más completas del mundo',
        peopleRegistered: 22,
        userId:1
      },
      { id: 3,
        name: 'Museo Guggenheim ' ,
        category:'Arte Contemporaneo',
        subcategory:'Museo',
        price: 11.5,
        language: 'ES',
        date:'10/04/2020',
        description:'Construido por el arquitecto canadiense Frank O. Gehry, los exteriores del Guggenheim de Bilbao ya son por si solos una obra de arte',
        peopleRegistered: 18,
        userId:2
      },
      { id: 4,
        name: 'Museo Ciencias Principe Felipe ' ,
        category:'Arte Contemporaneo',
        subcategory:'Museo',
        price: 22.5,
        language: 'VAL',
        date:'28/05/2020',
        description:'Situado dentro del complejo de la Ciudad de las Artes y las Ciencias de Valencia, este museo es uno de los más interactivos de la ciudad.',
        peopleRegistered: 2,
        userId:2
      }
    ];

    return {users,activities} ;
  }
}