import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [registrationMessage, setRegistrationMessage] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !username || !dateOfBirth || !gender || password.length < 8) {
      setRegistrationMessage('Por favor, completa todos los campos obligatorios. La contraseña debe tener al menos 8 caracteres.');
      setTimeout(() => {
        setRegistrationMessage('');
      }, 3000);
      return;
    }

    const newUser = {
      firstName,
      lastName,
      username,
      dateOfBirth,
      gender,
      password,
      phone
    };

    axios.post('http://localhost:5000/api/users/register', newUser)
      .then(response => {
        console.log("hola")
        setRegistrationMessage('Usuario registrado con éxito');
        setTimeout(() => {
          setRegistrationMessage('');
        }, 3000);
        console.log('Usuario registrado con éxito:', response.data);
        // Aquí puedes manejar el resultado, como redirigir al usuario a una página de éxito de registro.
      })
      .catch(error => {
        setRegistrationMessage('Error al registrar el usuario');
        setTimeout(() => {
          setRegistrationMessage('');
        }, 3000);
        console.error('Error al registrar el usuario:', error);
        // Aquí puedes manejar errores, como mostrar un mensaje al usuario.
      });
  };

  return (
    <div className="container">
      <h2>UHospital - Registro de pacientes</h2>
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label htmlFor="firstName">Nombre</label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Apellido</label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="username">Nombre de usuario</label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="dateOfBirth">Fecha de nacimiento</label>
          <input
            type="date"
            className="form-control"
            id="dateOfBirth"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="gender">Sexo</label>
          <select
            className="form-control"
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Selecciona...</option>
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="password">Contraseña (mínimo 8 caracteres)</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Teléfono (opcional)</label>
          <input
            type="text"
            className="form-control"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        {registrationMessage && (
          <div className={`alert ${registrationMessage.includes('éxito') ? 'alert-success' : 'alert-danger'}`} role="alert">
            {registrationMessage}
          </div>
        )}

        <div className="text-center mt-3">
          <button type="submit" className="btn btn-primary">
            Registro
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
