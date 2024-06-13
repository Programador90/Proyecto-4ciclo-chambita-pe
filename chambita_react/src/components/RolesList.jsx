import React, { useState, useEffect } from 'react';
import axios from '../axiosConfig';

const RolesList = () => {
  const [roles, setRoles] = useState([]);
  const [newRol, setNewRol] = useState({ id: '', tipo: '' });
  const [editRol, setEditRol] = useState({ id: '', tipo: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = () => {
    axios.get('/roles/')
      .then(response => {
        setRoles(response.data);
      })
      .catch(error => {
        console.error("Hubo un error al obtener los roles:", error);
      });
  };

  const addRol = () => {
    axios.post('/roles/', { tipo: newRol.tipo })
      .then(response => {
        fetchRoles();
        setNewRol({ id: '', tipo: '' });
      })
      .catch(error => {
        console.error("Hubo un error al añadir el rol:", error);
      });
  };

  const updateRol = (id) => {
    axios.put(`/roles/${id}/`, { tipo: editRol.tipo })
      .then(response => {
        fetchRoles();
        setEditId(null);
        setEditRol({ id: '', tipo: '' });
      })
      .catch(error => {
        console.error("Hubo un error al actualizar el rol:", error);
      });
  };

  const deleteRol = (id) => {
    axios.delete(`/roles/${id}/`)
      .then(response => {
        fetchRoles();
      })
      .catch(error => {
        console.error("Hubo un error al eliminar el rol:", error);
      });
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center my-4">
        <h2>Lista de Roles</h2>
      </div>
      <ul className="list-group mb-4">
        {roles.map(rol => (
          <li key={rol.id} className="list-group-item d-flex justify-content-between align-items-center">
            {editId === rol.id ? (
              <div className="flex-grow-1">
                <input
                  type="text"
                  value={editRol.tipo}
                  onChange={(e) => setEditRol({ ...editRol, tipo: e.target.value })}
                  className="form-control my-1"
                />
                <button className="btn btn-success mt-2" onClick={() => updateRol(rol.id)}>Actualizar</button>
              </div>
            ) : (
              <div className="flex-grow-1">
                <p>ID: {rol.id}</p>
                <p>Tipo: {rol.tipo}</p>
              </div>
            )}
            {editId === rol.id ? (
              <button className="btn btn-danger ml-2" onClick={() => setEditId(null)}>Cancelar</button>
            ) : (
              <div>
                <button className="btn btn-warning mr-2" onClick={() => { setEditId(rol.id); setEditRol(rol); }}>Editar</button>
                <button className="btn btn-danger" onClick={() => deleteRol(rol.id)}>Eliminar</button>
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
                  value={newRol.id}
                  onChange={(e) => setNewRol({ ...newRol, id: e.target.value })}
                  placeholder="ID"
                  className="form-control"
                  disabled
                />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="text"
                  value={newRol.tipo}
                  onChange={(e) => setNewRol({ ...newRol, tipo: e.target.value })}
                  placeholder="Tipo"
                  className="form-control"
                />
              </td>
            </tr>
            <tr>
              <td className="text-right">
                <button className="btn btn-primary" onClick={addRol}>Añadir rol</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RolesList;
