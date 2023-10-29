import React from 'react';
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

const PokedexPage = () => {
  return (
    <div className="container text-center mt-4">
      <h2>Bienvenido. Somos tu mejor opción en salud</h2>
      <div className="d-flex flex-column align-items-center mt-4">
        <Link to="/modificar-perfil" className="btn btn-primary mb-2">
          Modificar Perfil
        </Link>
        <Link to="/solicitar-cita" className="btn btn-primary mb-2">
          Solicitar Cita
        </Link>
        <Link to="/ver-recetas-factura" className="btn btn-primary mb-2">
          Ver Recetas y Factura
        </Link>
        <Link to="/comprar-medicina" className="btn btn-primary mb-2">
          Comprar Medicina
        </Link>
      </div>
    </div>
  );
};

export default PokedexPage;
