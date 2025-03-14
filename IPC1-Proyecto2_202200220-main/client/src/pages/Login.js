import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import AuthService from '../services/auth.service';
import UserService from '../services/user.service';


const required = (value) => {
  if (!value) {
    return (
      <div className='alert alert-danger' role='alert'>
        Este campo es requerido
      </div>
    );
  }
}


// ...código existente

function Login() {
  let navigate = useNavigate();
  const form = useRef();
  const checkBtn = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeUsername = (event) => {
    const username = event.target.value;
    setUsername(username);
  };

  const onChangePassword = (event) => {
    const password = event.target.value;
    setPassword(password);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    setMessage("");
    setLoading(true);
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(username, password)
        .then(
          () => {
            navigate('/pokedex');
            window.location.reload();
          },
          (error) => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();

            setLoading(false);
            setMessage(resMessage);
          });
    } else {
      setLoading(false);
      window.location.reload();
    }

  };

  const handleRegister = () => {
    navigate('/register'); // Ajusta esta ruta con la ruta de tu página de registro
    
  };



  useEffect(() => {
    UserService.getPage()
      .then(
        (res) => {
          navigate('/pokedex');
        }
      );
    // eslint-disable-next-line
  }, []);

  return (
    <div className='col-md-12'>
      <div className='card card-container'>
        <Form onSubmit={handleLogin} ref={form}>
          <div className='form-group'>
            <label htmlFor='username'>Usuario</label>
            <Input
              type='text'
              className='form-control'
              name='username'
              value={username}
              onChange={onChangeUsername}
              validations={[required]}
            />
          </div>
          <div className='form-group' style={{ marginBottom: '20px' }}>
            <label htmlFor='password'>Contraseña</label>
            <Input
              type='password'
              className='form-control'
              name='password'
              value={password}
              onChange={onChangePassword}
              validations={[required]}
              style={{ marginBottom: '10px' }}
            />
          </div>
          <div className='form-group'>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className='btn btn-primary'>
                {loading && (
                  <span className='spinner-border spinner-border-sm'></span>
                )}
                <span>Login</span>
              </button>
              <button
                
                className='btn btn-primary'
                onClick={handleRegister}
                
              >
                Register
              </button>
            </div>
          </div>
          {message && (
            <div className='form-group'>
              <div className='alert alert-danger' role='alert'>
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
}

export default Login;