import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <div className="dashboard-links">
        <Link to="/roles" className="dashboard-link">Roles</Link>
        <Link to="/usuarios" className="dashboard-link">Usuarios</Link>
        <Link to="/datos-postulantes" className="dashboard-link">Datos Postulantes</Link>
        <Link to="/sectores" className="dashboard-link">Sectores</Link>
        <Link to="/empresas" className="dashboard-link">Empresas</Link>
        <Link to="/ofertas" className="dashboard-link">Ofertas de Trabajo</Link>
        <Link to="/postulaciones" className="dashboard-link">Postulaciones</Link>
        <Link to="/contrataciones" className="dashboard-link">Contrataciones</Link>
      </div>
    </div>
  );
};

export default Dashboard;
