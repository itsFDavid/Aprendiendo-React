import '../App.css';
import PropTypes from 'prop-types';
import { useState } from 'react';

export function WriteMessage({ socket, onNameChange }) {
    const [name, setName] = useState(localStorage.getItem('name') || '');
    const [message, setMessage] = useState('');

    WriteMessage.propTypes = {
        socket: PropTypes.object.isRequired,
        onNameChange: PropTypes.func.isRequired,
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (message.trim() !== '') {
            localStorage.setItem('name', name);
            onNameChange(name);
            socket.emit('chat message', message, name, socket.auth.serverOffset);
            setMessage(''); // Clear the message input after sending
        } else {
            alert('Please write a message');
        }
    };

    return (
        <div className='write-message'>
            <form className='send-message' onSubmit={handleSendMessage}>
                <input
                    type='text'
                    id='name'
                    value={name}
                    placeholder='Name'
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type='text'
                    id='message'
                    value={message}
                    placeholder='Message'
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button className='button-send' type='submit'>Send Message</button>
            </form>
        </div>
    );
}
