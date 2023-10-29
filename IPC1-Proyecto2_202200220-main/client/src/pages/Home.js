import React from 'react';
import logo from '../images/hospital.png' 



class HomePage extends React.Component {

  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <img alt='logo' src={logo} style={{ display: 'block', margin: '0 auto' }} />
        <h2 style={{ marginTop: '20px' }}>Tu mejor opción en salud familiar</h2>
      </div>
    );
  }
}



export default HomePage;
