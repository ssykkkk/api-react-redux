import { withLayout } from '../../components/Main/Main';
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
// import styles from '../../components/FormAuth/FormAuth.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCreatePost
} from '../../share/api/posts.api';
import {
  fetchChangePostData, fetchGetPostData
} from '../../share/api/post.api';
import { useParams } from 'react-router-dom';
import styles from "./CreatePost.module.css"

function getTagsArray(tagList) {
  return tagList.replaceAll(' ', '').split(',');
}

function CreatePost() {
  const [status, setStatus] = useState(null);
  const { isEdit } = useParams();
  const post = useSelector((state) => state.post);
  const { title, description, body, slug } = post;
  const tagList = post.tagList?.join(',') || '';
  const checkEdit = isEdit === 'true' ? true : false;
  const initalState = checkEdit
    ? { title, description, body, tagList }
    : { title: '', description: '', tagList: '', body: '' };

  const error = useSelector((state) => state.error.error);
  const dispatch = useDispatch();
  const post_id = useSelector((state) => state.posts.idPost);

  const [formData, setFormData] = useState(initalState);
  const handlerSubmit = async (e) => {
    e.preventDefault();
    // const path = isSignUp ? '/users' : '/users/login';
    const tags = getTagsArray(formData.tagList);
    if (checkEdit) {
      const res = await dispatch(
        fetchChangePostData({ slug, body: { ...formData, tagList: tags } })
      );
      if (res == 200) {

        setStatus(() => { return res })
        await dispatch(fetchGetPostData(slug));
      }

    
    } else {
      await dispatch(fetchCreatePost({ ...formData, tagList: tags }));
    }

    !error &&
      setFormData(() => {
        return { ...initalState };
      });
  };
  const handlerChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    setFormData(() => {
      return { ...initalState };
    });
  }, [isEdit, status]);
  return (
    <section>
      <div className='container'>
        <div className={styles.wrap}>
        <Form
          className={styles.form}
          method='POST'
          onSubmit={(e) => handlerSubmit(e)}
        >
          {post_id != 0 && (
            <p>Пост успішно {checkEdit ? 'змінено' : 'створено'}</p>
          )}
          <h2 className={styles.h2}>{checkEdit ? 'Edit Post' : 'CREATE POSTS'}</h2>
          {error && (
            <div className='alert alert-danger' role='alert'>
              {error}
            </div>
          )}

          <Form.Group className='mb-3' controlId='title'>
            <Form.Label>Title</Form.Label>
            <Form.Control
              name='title'
              placeholder='Title'
              onChange={(e) => handlerChange(e)}
              value={formData.title}
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='description'>
            <Form.Label>Description</Form.Label>
            <Form.Control
              name='description'
              placeholder='Description'
              onChange={(e) => handlerChange(e)}
              value={formData.description}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='body'>
            <Form.Label>Body</Form.Label>
            <Form.Control
              name='body'
              placeholder='Body'
              as='textarea'
              rows={3}
              onChange={(e) => handlerChange(e)}
              value={formData.body}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='tagList'>
            <Form.Label>Tag List</Form.Label>
            <Form.Control
              name='tagList'
              placeholder='Tag List'
              onChange={(e) => handlerChange(e)}
              value={formData.tagList}
            />
          </Form.Group>
          <Button type='submit'>
            {checkEdit ? 'Edit Post' : 'Create Posts'}
          </Button>
        </Form>
        </div>
      </div>
    </section>
  );
}

export default withLayout(CreatePost);
