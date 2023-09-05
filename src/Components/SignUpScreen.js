import React, { useState } from 'react';
import '../Styles/SignUpScreen.css';
import { Link } from 'react-router-dom';

export default function SignUpScreen() {
  const [EmailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  // const signIn=(e)=>{
  //   e.preventDefault();
  // }
  const register = (e) => {
    e.preventDefault();
  };
  var signInDisabledEmail = function (e) {
    setEmailValue(e.target.value);
    console.log(EmailValue);
  };
  var signInDisabledPassword = function (e) {
    setPasswordValue(e.target.value);
    console.log(passwordValue);
  };
  return (
    <div>
      <div className='signUp-screen'>
        <form>
          <h1>Sign In</h1>
          <input
            placeholder='Email'
            type='email'
            onChange={(e) => signInDisabledEmail(e)}
            required
          />
          <input
            id='Password'
            placeholder='Password'
            type='password'
            onChange={(e) => signInDisabledPassword(e)}
            required
          />
          {EmailValue && passwordValue && (
            <Link
              disabled={EmailValue && passwordValue ? false : true}
              to='/home'
            >
              <button
                className='signUp-screen-signIn btn btn-light'
                // onClick={signIn}
                disabled={EmailValue && passwordValue ? false : true}
                type='submit'
              >
                Sign In
              </button>
            </Link>
          )}

          <h4>
            <span className='signUpScreen-grey'>New to Netflix? </span>
            <span onClick={register} className='signUpScreen-link'>
              Sign Up now.
            </span>
          </h4>
        </form>
      </div>
    </div>
  );
}
