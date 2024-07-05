import '../App.css';

export function WriteMessage() {

    return (
        <div className='write-message'>
            <form className='send-message'>
                <input type='text' placeholder='Name' />
                <input type='text' placeholder='Message' />
                <button className='button-send'>Send Message</button>
            </form>
        </div>
    )
}