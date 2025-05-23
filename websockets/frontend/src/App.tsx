import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [socket, setSocket] = useState<null | WebSocket>(null);
  const [latestMessage, setLatestMessage] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');
    socket.onopen = () => {
      console.log("Connected ");
      setSocket(socket) //the connection is established
    }
    socket.onmessage = (message) => {
      console.log(`Recieved ${message.data}`)
      setLatestMessage(message.data)
    }
    return () => {
      socket.close();
    }
  },[])
  //[] - runs the logic when the component mounts

  if(!socket) {
    return (
      <div>
        ...Loading
      </div>
    )
  }

  return (
    <>
    <input onChange={(e) => setMessage(e.target.value)}></input>
    <button onClick={() => {
      socket.send(message);
    }}>Send</button>
    {latestMessage}
    </>
  )
}

export default App
