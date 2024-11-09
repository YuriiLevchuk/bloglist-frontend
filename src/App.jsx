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

  useEffect(()=>{
    const loggedInUser = window.localStorage.getItem('loggedInBlogUser')
    if(loggedInUser !== null){
      setUser(JSON.parse(loggedInUser))
    }
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

      <button
        onClick={()=>{
          window.localStorage.setItem('loggedInBlogUser', null)
          setUser(null)
        }}>
        log out
      </button><br />

      {blogs.map(
        blog => <Blog key={blog.id} blog={blog} />
      )}
    </>
  }

  // button handlers //
  const handleLogin = async(event) => {
    event.preventDefault()
    try{
      const loginInfo = {username, password};
      const userInput = await loginService.login(loginInfo);

      window.localStorage.setItem(
        'loggedInBlogUser', JSON.stringify(userInput)
      ) 
      setUser(userInput);

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