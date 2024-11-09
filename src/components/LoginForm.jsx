import { useState } from 'react'
import blogService from '../services/blogs'
import loginService from '../services/login'

const LoginForm = ({ user, setUser}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async(event) => {
    event.preventDefault()
    try{
      const loginInfo = {username, password};
      const userInput = await loginService.login(loginInfo);

      window.localStorage.setItem(
        'loggedInBlogUser', JSON.stringify(userInput)
      ) 
      setUser(userInput);
      blogService.setToken(userInput.token)

      setUsername('');
      setPassword('');
    }catch{
      console.log('wrong credentials')
    }
  }

  return<>
    <h2>Login to Application</h2>

    <form onSubmit={handleLogin}>
        <div>
          username
          <input 
            type="text"
            value={username}
            name="Username"
            onChange={ ({target})=>setUsername(target.value) }
          />
        </div>
        <div>
          password
          <input 
            type="password"
            value={password}
            name="Password"
            onChange={ ({target})=>setPassword(target.value) }
          />
        </div>
        <button type="submit">login</button>
    </form>
  </>
}

export default LoginForm