import React, { useEffect, useState } from 'react'

const MessageList = ({ socket }) => {
  const [messages, setMessages] = useState({})
  useEffect(() => {
    const messageListener = (message) => {
      setMessages((prevMessages) => {
        const newMessages = { ...prevMessages }
        newMessages[message.id] = message
        return newMessages
      })
    }

    const deleteMessageListener = (messageID) => {
      setMessages((prevMessages) => {
        const newMessages = { ...prevMessages }
        delete newMessages[messageID]
        return newMessages
      })
    }

    socket.on('message', messageListener)
    socket.on('deleteMessage', deleteMessageListener)
    socket.emit('getMessages')

    return () => {
      socket.off('message', messageListener)
      socket.off('deleteMessage', deleteMessageListener)
    }
  }, [socket])
  return (
    <ul>
      {[...Object.values(messages)]
        .sort((a, b) => a.time - b.time)
        .map((message) => (
          <div key={message.id}>
            <span className="text-orange-600">{message.user.name} dice: </span>
            <span>{message.value}</span>
          </div>
        ))}
    </ul>
  )
}

export default MessageList
