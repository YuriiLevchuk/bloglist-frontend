import { useState } from "react"
import blogServices from '../services/blogs'

const CreateBlogForm = ({ setBlogs }) => {
  const [ title, setTitle ] = useState('')
  const [ author, setAuthor ] = useState('');
  const [ url, setUrl ] = useState('');

  const handleCreate = async(e) => {
    e.preventDefault()
    try{
      const newBlog = { title, author, url }
      const res = await blogServices.create(newBlog)
      setBlogs( x => x.concat(res))

      setTitle('')
      setAuthor('')
      setUrl('')
    }catch(err){
      console.log(err)
    }
  }

  return<>
    <h2>Create new Blog</h2>

    <form onSubmit={handleCreate}>

      <div>
        <>title: </>
        <input type="text" 
          name="Title"
          value={title}
          onChange={ ({target})=>setTitle(target.value) }
        />
      </div>

      <div>
        <>author: </>
        <input type="text" 
          name="Author"
          value={author}
          onChange={ ({target})=>setAuthor(target.value) }
        />
      </div>

      <div>
        <>url: </>
        <input type="text" 
          name="Url"
          value={url}
          onChange={ ({target})=>setUrl(target.value) }
        />
      </div>

      <button type="submit">Create</button>

    </form>
  </>
}

export default CreateBlogForm