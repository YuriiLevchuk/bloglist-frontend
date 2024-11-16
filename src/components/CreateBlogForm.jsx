import { useState } from 'react';
import blogServices from '../services/blogs';
import PropTypes from 'prop-types';

import Notification from './Notification';

const CreateBlogForm = ({ setBlogs, mock }) => {
  const [ title, setTitle ] = useState('');
  const [ author, setAuthor ] = useState('');
  const [ url, setUrl ] = useState('');
  const [ notification, setNotification ] = useState(null);
  const [ isError, setIsError ] = useState(false);

  const handleCreate = async(e) => {
    e.preventDefault();
    try{
      const newBlog = { title, author, url };
      if(mock) mock(newBlog);
      const res = await blogServices.create(newBlog);

      setBlogs( x => x.concat(res));

      setTitle('');
      setAuthor('');
      setUrl('');
      setNotification(`Created new blog "${newBlog.title}"`);

      setIsError(false);
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }catch(err){
      setNotification('Failed to create new blog');
      setIsError(true);
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  return<>
    <Notification notification={notification} error={isError}/>
    <h2>Create new Blog</h2>

    <form onSubmit={handleCreate}>

      <div>
        <>title: </>
        <input type="text"
          name="Title"
          value={title}
          onChange={ ({ target }) => setTitle(target.value) }
        />
      </div>

      <div>
        <>author: </>
        <input type="text"
          name="Author"
          value={author}
          onChange={ ({ target }) => setAuthor(target.value) }
        />
      </div>

      <div>
        <>url: </>
        <input type="text"
          name="Url"
          value={url}
          onChange={ ({ target }) => setUrl(target.value) }
        />
      </div>

      <button type="submit">Create</button>

    </form>
  </>;
};

CreateBlogForm.propTypes = {
  setBlogs: PropTypes.func.isRequired
};

export default CreateBlogForm;