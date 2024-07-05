
import '../App.css';
import { WriteMessage } from './WriteMessage';
//import { io } from "https://cdn.socket.io/4.7.5/socket.io.esm.min.js"

const DATA= [
    {
        id: 1,
        nombre: 'Juan',
        message: 'Hola, ¿cómo estás?'
    },
    {
        id: 2,
        nombre: 'Pedro',
        message: 'Bien, gracias. ¿Y tú?'
    },
    {
        id: 3,
        nombre: 'Juan',
        message: 'También bien. ¿Qué has hecho hoy?'
    },
    {
        id: 4,
        nombre: 'Pedro',
        message: 'He ido a la playa con unos amigos. ¿Y tú?'
    },
    {
        id: 5,
        nombre: 'Juan',
        message: 'He estado en casa todo el día. ¿Te apetece quedar mañana?'
    },
    {
        id: 6,
        nombre: 'Pedro',
        message: 'Sí, me encantaría. ¿Dónde y a qué hora?'
    },
    {
        id: 7,
        nombre: 'Juan',
        message: 'En el parque a las 5. ¿Te parece bien?'
    },
    {
        id: 8,
        nombre: 'Pedro',
        message: 'Perfecto. Nos vemos mañana.'
    }
]

export function Messages() {

    
        
    return (
        <>
        <section className='box'>    
        {
            DATA.map((data) => (
                <div key={data.id}
                className='box-message'>
                    <h2 className='message-person-name'>{data.nombre}</h2>
                    <p className='message-person-content'>{data.message}</p>
                </div>
            ))
        }
        
        </section>
        <WriteMessage/>
        </>
    )
}