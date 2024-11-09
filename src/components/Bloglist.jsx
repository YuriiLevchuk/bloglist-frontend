import { useState, useEffect } from 'react'
import blogService from '../services/blogs'

import CreateBlogForm from './CreateBlogForm'
import Blog from './Blog'

const Bloglist = ({ user, setUser }) => {
  const [blogs, setBlogs] = useState([])

  // get blogs //
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogout = () => {
    window.localStorage.setItem('loggedInBlogUser', null)
    setUser(null)
  }

  return <>
      <h2>Blogs</h2>
      <div>
        Logged in as {user.name} <br />
        <button onClick={handleLogout}>
          Log Out
        </button>
      </div>

      <CreateBlogForm setBlogs={setBlogs}/><br />

      {blogs.map(
        blog => <Blog key={blog.id} blog={blog} />
      )}
  </>
}

export default Bloglist