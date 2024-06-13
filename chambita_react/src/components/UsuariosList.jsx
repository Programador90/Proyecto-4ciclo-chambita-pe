import React, { useState, useEffect } from 'react';
import axios from '../axiosConfig';

const UsuariosList = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [roles, setRoles] = useState([]);
  const [newUsuario, setNewUsuario] = useState({ nombre: '', apellidos: '', email: '', contrasena: '', rol: '' });
  const [editUsuario, setEditUsuario] = useState({ nombre: '', apellidos: '', email: '', contrasena: '', rol: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchUsuarios();
    fetchRoles();
  }, []);

  const fetchUsuarios = () => {
    axios.get('/usuarios/')
      .then(response => {
        setUsuarios(response.data);
      })
      .catch(error => {
        console.error("Hubo un error al obtener los usuarios:", error);
      });
  };

  const fetchRoles = () => {
    axios.get('/roles/')
      .then(response => {
        setRoles(response.data);
      })
      .catch(error => {
        console.error("Hubo un error al obtener los roles:", error);
      });
  };

  const getRoleName = (roleId) => {
    const role = roles.find(r => r.id === roleId);
    return role ? role.tipo : 'Desconocido';
  };

  const addUsuario = () => {
    axios.post('/usuarios/', newUsuario)
      .then(response => {
        fetchUsuarios();
        setNewUsuario({ nombre: '', apellidos: '', email: '', contrasena: '', rol: '' });
      })
      .catch(error => {
        console.error("Hubo un error al añadir el usuario:", error);
      });
  };

  const updateUsuario = (id) => {
    axios.put(`/usuarios/${id}/`, editUsuario)
      .then(response => {
        fetchUsuarios();
        setEditId(null);
        setEditUsuario({ nombre: '', apellidos: '', email: '', contrasena: '', rol: '' });
      })
      .catch(error => {
        console.error("Hubo un error al actualizar el usuario:", error);
      });
  };

  const deleteUsuario = (id) => {
    axios.delete(`/usuarios/${id}/`)
      .then(response => {
        fetchUsuarios();
      })
      .catch(error => {
        console.error("Hubo un error al eliminar el usuario:", error);
      });
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center my-4">
        <h2>Lista de Usuarios</h2>
      </div>
      <ul className="list-group mb-4">
        {usuarios.map(usuario => (
          <li key={usuario.id} className="list-group-item d-flex justify-content-between align-items-center">
            {editId === usuario.id ? (
              <div className="flex-grow-1">
                <input
                  type="text"
                  value={editUsuario.nombre}
                  onChange={(e) => setEditUsuario({ ...editUsuario, nombre: e.target.value })}
                  className="form-control my-1"
                />
                <input
                  type="text"
                  value={editUsuario.apellidos}
                  onChange={(e) => setEditUsuario({ ...editUsuario, apellidos: e.target.value })}
                  className="form-control my-1"
                />
                <input
                  type="email"
                  value={editUsuario.email}
                  onChange={(e) => setEditUsuario({ ...editUsuario, email: e.target.value })}
                  className="form-control my-1"
                />
                <input
                  type="password"
                  value={editUsuario.contrasena}
                  onChange={(e) => setEditUsuario({ ...editUsuario, contrasena: e.target.value })}
                  className="form-control my-1"
                />
                <select
                  value={editUsuario.rol}
                  onChange={(e) => setEditUsuario({ ...editUsuario, rol: e.target.value })}
                  className="form-control my-1"
                >
                  <option value="">Selecciona un rol</option>
                  {roles.map(rol => (
                    <option key={rol.id} value={rol.id}>{rol.tipo}</option>
                  ))}
                </select>
                <button className="btn btn-success mt-2" onClick={() => updateUsuario(usuario.id)}>Actualizar</button>
              </div>
            ) : (
              <div className="flex-grow-1">
                <p>Nombre: {usuario.nombre}</p>
                <p>Apellidos: {usuario.apellidos}</p>
                <p>Email: {usuario.email}</p>
                <p>Contraseña: {usuario.contrasena}</p>
                <p>Rol: {getRoleName(usuario.rol)}</p>
              </div>
            )}
            {editId === usuario.id ? (
              <button className="btn btn-danger ml-2" onClick={() => setEditId(null)}>Cancelar</button>
            ) : (
              <div>
                <button className="btn btn-warning mr-2" onClick={() => { setEditId(usuario.id); setEditUsuario(usuario); }}>Editar</button>
                <button className="btn btn-danger" onClick={() => deleteUsuario(usuario.id)}>Eliminar</button>
              </div>
            )}
          </li>
        ))}
      </ul>
      <div className="table-responsive">
        <table className="table table-bordered">
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  value={newUsuario.nombre}
                  onChange={(e) => setNewUsuario({ ...newUsuario, nombre: e.target.value })}
                  placeholder="Nombre"
                  className="form-control"
                />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="text"
                  value={newUsuario.apellidos}
                  onChange={(e) => setNewUsuario({ ...newUsuario, apellidos: e.target.value })}
                  placeholder="Apellidos"
                  className="form-control"
                />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="email"
                  value={newUsuario.email}
                  onChange={(e) => setNewUsuario({ ...newUsuario, email: e.target.value })}
                  placeholder="Email"
                  className="form-control"
                />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="password"
                  value={newUsuario.contrasena}
                  onChange={(e) => setNewUsuario({ ...newUsuario, contrasena: e.target.value })}
                  placeholder="Contraseña"
                  className="form-control"
                />
              </td>
            </tr>
            <tr>
              <td>
                <select
                  value={newUsuario.rol}
                  onChange={(e) => setNewUsuario({ ...newUsuario, rol: e.target.value })}
                  className="form-control"
                >
                  <option value="">Selecciona un rol</option>
                  {roles.map(rol => (
                    <option key={rol.id} value={rol.id}>{rol.tipo}</option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <td className="text-right">
                <button className="btn btn-primary" onClick={addUsuario}>Añadir usuario</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsuariosList;
