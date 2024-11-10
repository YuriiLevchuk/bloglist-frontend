import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'

import Bloglist from './components/Bloglist'
import LoginForm from './components/LoginForm'

const App = () => {
  const [user, setUser] = useState(null)

  // check if user data is in local storage //
  useEffect(()=>{
    const loggedInUser = JSON.parse(window.localStorage.getItem('loggedInBlogUser'))
    if(loggedInUser !== null){
      setUser(loggedInUser)
      blogService.setToken(loggedInUser.token)
    }
  }, [])

  return (
    <div>
      {user === null
        ? <LoginForm user={user} setUser={setUser}/>
        : <Bloglist user={user} setUser={setUser}/>
      }
    </div>
  )
}

export default App