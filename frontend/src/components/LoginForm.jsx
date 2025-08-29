import { useState } from 'react';
import blogService from '../services/blogs';
import loginService from '../services/login';
import PropTypes from 'prop-types';

import Notification from './Notification';
import Togglable from './Togglable';

const LoginForm = ({ user, setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState(null);
  const [isError, setIsError] = useState(false);

  const handleLogin = async(event) => {
    event.preventDefault();
    try{
      const loginInfo = { username, password };
      const userInput = await loginService.login(loginInfo);

      window.localStorage.setItem(
        'loggedInBlogUser', JSON.stringify(userInput)
      );
      setUser(userInput);
      blogService.setToken(userInput.token);

      setUsername('');
      setPassword('');
    }catch(err){
      setNotification('Wrong Credentials');
      setIsError(true);
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  return<>
    <h2>Login to Application</h2>

    <Notification notification={notification} error={isError}/>

    <Togglable label="Login Form">
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">username
            <input
              type="text"
              value={username}
              id="username"
              name="username"
              onChange={ ({ target }) => setUsername(target.value) }
            />
          </label>
          
        </div>
        <div>
          <label htmlFor="password">password
            <input
              type="password"
              value={password}
              id="password"
              name="password"
              onChange={ ({ target }) => setPassword(target.value) }
            />
          </label>
        </div>
        <button name="login" type="submit">Login</button>
      </form>
    </Togglable>
  </>;
};

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired
};

export default LoginForm;