import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from '@material-ui/core'

const Login = ({ onSend }) => {

  const [ input, setInput ] = useState('');

  const sendUser = (e) => {
    e.preventDefault();
    onSend(input);
  }

  return (
    <div>
      <form>
        <h1>Digite seu nome</h1>
        <input onChange={(e) => setInput(e.target.value)} type="text" />
        <button onClick={sendUser} type="submit">Go</button>
        <p>{input}</p>
      </form>
    </div>
  )
}

Login.propTypes = {

}

export default Login
