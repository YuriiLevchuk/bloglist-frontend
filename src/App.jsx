import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'

import Blog from './components/Blog'
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

  //page elements//
  const showBlogList = () =>{
    return <>
      <h2>Blogs</h2>
      <p>Logged in as {user.name}</p>

      <button
        onClick={()=>{
          window.localStorage.setItem('loggedInBlogUser', null)
          setUser(null)
        }}>
        log out
      </button><br />

      <> 
      </>
      {blogs.map(
        blog => <Blog key={blog.id} blog={blog} />
      )}
    </>
  }

  // button handlers //

  const handleCreate = async(event) => {
    event.preventDefault();
  }

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