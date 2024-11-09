import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  //page elements//
  const showLoginForm = ()=>{
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

  const showBlogList = () =>{
    return <>
      <h2>Blogs</h2>
      <p>Logged in as {user.name}</p>
      {blogs.map(
        blog => <Blog key={blog.id} blog={blog} />
      )}
    </>
  }

  // handlers //
  const handleLogin = async(event) => {
    event.preventDefault()
    try{
      const loginInfo = {username, password};
      const loggedInUser = await loginService.login(loginInfo);

      console.log(`logged in as ${loggedInUser.username}`)
      console.log(loggedInUser.token)
      setUser(loggedInUser);
      setUsername('');
      setPassword('');
    }catch{
      console.log('wrong credentials')
    }
  }

  return (
    <div>
      {user === null
        ? showLoginForm()
        : showBlogList()
      }
    </div>
  )
}

export default App