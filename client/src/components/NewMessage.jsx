import React, { useState } from 'react'

const NewMessage = ({ socket }) => {
  const [value, setValue] = useState('')
  const submitForm = (e) => {
    e.preventDefault()
    socket.emit('message', value)
    setValue('')
  }
  return (
    <form className='block mx-auto w-full' onSubmit={submitForm}>
      <input
        className='ring-white bg-white w-full p-2 rounded-xl'
        autoFocus
        value={value}
        onChange={(e) => {
          setValue(e.currentTarget.value)
        }}
      />
    </form>
  )
}

export default NewMessage
