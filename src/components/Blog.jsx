import { useState } from "react"
import blogServices from "../services/blogs"

const Blog = ({ blog, setBlogs, user }) =>{
  const [ isFullView, setIsFullView ] = useState(false)
  const [ likes, setLikes ] = useState(blog.likes)
  const [ deletionStyle, setDeletionStyle] = useState({display: ''})
  
  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 5,
    paddingLeft: 2,
    
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  //button handlers//
  const toggleFullView = () => setIsFullView(x=>!x)

  const likeBlog = async() => {
    try{
      const likedBlog = {
        ...blog,
        likes: likes+1,
        user: blog.user.id
      }
      await blogServices.update(likedBlog)
      setLikes( x=>x+1 )
    } catch(err){
      console.log('faied to like blog')
    }
  }

  const removeBlog = async() => {
    if(!window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) return 0
    try{
      await blogServices.remove(blog)
      setDeletionStyle({display: 'none'})
    } catch(err){
      console.log("failed to remove blog")
    }
  }

  //page element//
  const detailedView = () => {
    if(!isFullView) return<>
      "{blog.title}" by {blog.author} &ensp;
      <button onClick={toggleFullView}>View</button>
    </>
    else return<>
      <h3>
        "{blog.title}" by {blog.author} &ensp;
        <button onClick={toggleFullView}>Hide</button>
      </h3>
      
      <p>
        <a href={blog.url}>{blog.url}</a> <br />

        likes {likes} &ensp;
        <button onClick={likeBlog}>like</button> <br />
        {blog.author} <br />   
      </p>
      <p>
        {user.username === blog.user.username
          ?<> 
            <i>this post was added by You</i> <br />
            <br/> <button onClick={removeBlog}>remove</button>
          </>
          : <i>this post was added by @{blog.user.username}</i>
        }
        
      </p>
    </>
  }

  return<>
    <div style={{...blogStyle, ...deletionStyle}}>
      {detailedView()}
    </div>
  </>
}
export default Blog