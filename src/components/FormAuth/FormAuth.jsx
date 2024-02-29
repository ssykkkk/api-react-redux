import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchAuth } from '../../share/api/auth.api';
import styles from './FormAuth.module.css';
import { useEffect } from 'react';
import { clearErrors } from '../../share/reducers/errors.reducer';

export default function FormAuth({ title, link, titleLink, isSignUp }) {
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const initalState = isSignUp
    ? { email: '', password: '', username: '' }
    : { email: '', password: '' };
  const [formData, setFormData] = useState(initalState);
  const error = useSelector((state) => state.error.error);
  const dispatch = useDispatch();
  const handlerSubmit = async (e) => {
    e.preventDefault();
    const path = isSignUp ? '/users' : '/users/login';
    await dispatch(fetchAuth({ body: formData, path }));
  };
  const handlerChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    if (error && error.payload !== null) {
      setTimeout(() => {
        dispatch(clearErrors());
      }, 5000);
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (token && token !== '') {
      navigate('/');
    }
  }, [token]);

  return (
    <div className={styles.wrap}>
      <Form
        className={styles.form}
        method='POST'
        onSubmit={(e) => handlerSubmit(e)}
      >
        <div className={styles.head}>
        <h2 className={styles.h2}>{title}</h2>
        {error && (
          <div className='alert alert-danger' role='alert'>
            {error}
          </div>
        )}
        <Link to={link}>{titleLink}</Link>
        </div>
        {isSignUp && (
          <Form.Group className='mb-3' controlId='username'>
            <Form.Label>User Name</Form.Label>
            <Form.Control
              name='username'
              placeholder='User Name'
              onChange={(e) => handlerChange(e)}
            />
          </Form.Group>
        )}
        <Form.Group className='mb-3' controlId='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            name='email'
            placeholder='name@example.com'
            onChange={(e) => handlerChange(e)}
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='password'>
          <Form.Label>password</Form.Label>
          <Form.Control
            type='password'
            name='password'
            placeholder='password'
            onChange={(e) => handlerChange(e)}
          />
        </Form.Group>
        <Button type='submit'>{title}</Button>
      </Form>
    </div>
  );
}
