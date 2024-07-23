
import './App.css'
import { Messages } from './components/Messages'
//import { Panel } from './components/Panel'

function App() {


  return (
    <>
     <header className="header">
        <h1 className='rainbow-text'>Chat Io</h1>
        <img src='../public/ios/72.png' alt="Logo" />
      </header>
     <Messages/>
    </>
  )
}

export default App
