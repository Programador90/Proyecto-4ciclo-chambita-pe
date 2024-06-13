import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import RolesList from './components/RolesList';
import UsuariosList from './components/UsuariosList';
import DatosPostulantesList from './components/DatosPostulantesList';
import SectoresList from './components/SectoresList';
import EmpresasList from './components/EmpresasList';
import OfertasList from './components/OfertasList';
import PostulacionesList from './components/PostulacionesList';
import ContratacionesList from './components/ContratacionesList';

const App = () => (
  <Router>
    <Switch>
      <Route path="/login" component={Login} />
      <PrivateRoute path="/admin" component={Dashboard} />
      <PrivateRoute path="/roles" component={RolesList} />
      <PrivateRoute path="/usuarios" component={UsuariosList} />
      <PrivateRoute path="/datos-postulantes" component={DatosPostulantesList} />
      <PrivateRoute path="/sectores" component={SectoresList} />
      <PrivateRoute path="/empresas" component={EmpresasList} />
      <PrivateRoute path="/ofertas" component={OfertasList} />
      <PrivateRoute path="/postulaciones" component={PostulacionesList} />
      <PrivateRoute path="/contrataciones" component={ContratacionesList} />
      {/* Otras rutas */}
    </Switch>
  </Router>
);

export default App;
