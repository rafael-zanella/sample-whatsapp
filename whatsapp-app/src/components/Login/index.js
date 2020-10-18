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
      <section className="login__form">
        <h3 className="title"> Welcome to Fake Whatsapp </h3>
        <button
          className="google__button" 
          onClick={signIn} 
          type="submit">
          Sign In With Google
        </button>
      </section>
    </div>
  )
}

export default Login
