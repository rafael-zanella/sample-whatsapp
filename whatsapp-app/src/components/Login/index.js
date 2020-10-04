import React, { useState } from 'react'
import './styles.css'
import { firebaseAuth, firebaseProvider } from '../../firebase';


const Login = ({ onSend }) => {

  const signIn = () => {
    firebaseAuth.signInWithPopup(firebaseProvider)
      .then((data) => {
        onSend({
          name: data.additionalUserInfo.profile.name,
          email: data.additionalUserInfo.profile.email
        })
      })
      .catch(error => alert(error.message))
  }

  return (
    <div className="login">
      <button onClick={signIn} type="submit">Google Auth</button>
    </div>
  )
}

export default Login
