import '../App.css';
import { WriteMessage } from './WriteMessage';
import { io } from "https://cdn.socket.io/4.7.5/socket.io.esm.min.js";
import { useEffect, useState, useRef } from 'react';

const users = ["Irbin", "Genaro", "Paco", "Angel", "Emiliano", "Lalo", "Francisco", "Luis", "Jorge", "Ricardo", "Raul", "Eduardo", "Carlos", "Juan", "Pedro", "Jose", "Manuel", "Miguel", "Antonio", "Jesus", "Alejandro", "David", "Daniel", "Jose Luis", "Javier", "Fernando", "Alberto", "Ramon", "Roberto", "Arturo", "Victor", "Oscar", "Rafael", "Sergio", "Mauricio", "Hector", "Guillermo", "Adrian", "Martin", "Salvador", "Rodrigo", "Ruben", "Mario", "Francisco Javier", "Erick", "Hugo", "Enrique", "Armando", "Gustavo", "Pablo"];

const getUsername = () => {
    const name = localStorage.getItem('name');
    if (!name) {
        const randomUser = users[Math.floor(Math.random() * users.length)];
        localStorage.setItem('name', randomUser);
        return randomUser;
    }
    return name;
};

export function Messages() {
    const [data, setData] = useState([]);
    const [username, setUsername] = useState(getUsername());
    const [socket] = useState(() => io('https://topicos-avanzados.onrender.com', {
        auth: {
            username: getUsername(),
            serverOffset: 0
        }
    }));
    const messageEndRef = useRef(null);

    useEffect(() => {
        const handleMessage = (msg, sender, serverOffset) => {
            socket.auth.serverOffset = serverOffset;
            setData(data => [...data, { id: data.length + 1, nombre: sender, message: msg }]);
        };

        socket.on('chat message', handleMessage);

        return () => {
            socket.off('chat message', handleMessage);
        };
    }, [socket]);

    useEffect(() => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [data]);

    const handleNameChange = (newName) => {
        const prevName = localStorage.getItem('name');
        localStorage.setItem('name', newName);
        setUsername(newName);
        socket.auth.username = newName;

        // Update the style of previous messages
        setData(prevData =>
            prevData.map(item =>
                item.nombre === prevName ? { ...item, nombre: newName } : item
            )
        );
    };

    return (
        <>
            <section className='box'>
                {data.map((data) => (
                    <div key={data.id}
                        className={
                            username === data.nombre ? 'message-person-you' : 'message-person'
                        }>
                        {username === data.nombre ? (
                            <h2 className='message-person-name'>You</h2>
                        ) : (
                            <h2 className='message-person-name'>{data.nombre}</h2>
                        )}
                        <p className='message-person-content'>{data.message}</p>
                    </div>
                ))}
                <div ref={messageEndRef} />
            </section>
            <WriteMessage socket={socket} onNameChange={handleNameChange} />
        </>
    );
}
