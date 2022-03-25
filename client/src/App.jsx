import React, { useEffect, useState } from 'react'
import MessageList from './components/MessageList'
import NewMessage from './components/NewMessage'
import io from 'socket.io-client'

function App() {
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    const newSocket = io(`http://${window.location.hostname}:3001`)
    setSocket(newSocket)
    return () => newSocket.close()
  }, [setSocket])

  return (
    <div className="mx-5 ">
      <h1 className='text-center text-3xl w-full'>WebChat</h1>
      {socket ? (
        <div className="flex flex-col justify-center">
          <MessageList socket={socket} />
          <NewMessage socket={socket} />
        </div>
      ) : (
        <div className='text-center'>Loading...</div>
      )}
    </div>
  )
}

export default App
