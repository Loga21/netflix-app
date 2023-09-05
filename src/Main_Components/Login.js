import React, { useState } from 'react';
import '../Styles/Login.css';
import SignUpScreen from '../Components/SignUpScreen.js';
// import { Link } from 'react-router-dom';

export default function Home() {
  const [signUp, setSignUp] = useState(false);

  return (
    <div className='loginscreen'>
      <div className='loginscreen-background'>
        <img
          className='loginscreen-logo'
          src='https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png'
          alt='....'
        />
        <button onClick={() => setSignUp(true)} className='loginscreen-button'>
          Sign In
        </button>

        <div className='loginscreen-gradient'></div>

        <div className='loginscreen-body'>
          {signUp ? (
            <SignUpScreen />
          ) : (
            <>
              <h1>Ultimate films, TV programmes and more.</h1>
              <h2>Watch anywhere. Cancel at anytime.</h2>
              <h3>
                Ready to watch? Enter your email to create or restart your
                membership.
              </h3>
              <div className='loginscreen-input'>
                <form>
                  <input type='email' placeholder='Email Address' />

                  <button
                    onClick={() => setSignUp(true)}
                    className='loginscreen-getStarted'
                  >
                    GET STARTED
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
