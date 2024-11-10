import { useState } from "react"
import blogServices from "../services/blogs"

const Blog = ({ blog }) =>{
  const [ isFullView, setIsFullView ] = useState(false)
  const [ likes, setLikes ] = useState(blog.likes)
  
  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 5,
    paddingLeft: 2,
    
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
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

        {blog.author}
      </p>
    </>
  }

  return<>
    <div style={blogStyle}>
      {detailedView()}
    </div>
  </>
}
export default Blog