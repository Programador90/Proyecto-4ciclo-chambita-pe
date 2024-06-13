import React, { useState, useEffect } from 'react';
import axios from '../axiosConfig';

const DatosPostulantesList = () => {
  const [datosPostulantes, setDatosPostulantes] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [newDatos, setNewDatos] = useState({ foto_perfil: null, cv: null, descripcion_profesional: '', usuario: '' });
  const [editDatos, setEditDatos] = useState({ foto_perfil: null, cv: null, descripcion_profesional: '', usuario: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchDatosPostulantes();
    fetchUsuarios();
  }, []);

  const fetchDatosPostulantes = () => {
    axios.get('/datos_postulantes/')
      .then(response => {
        setDatosPostulantes(response.data);
      })
      .catch(error => {
        console.error("Hubo un error al obtener los datos de postulantes:", error);
      });
  };

  const fetchUsuarios = () => {
    axios.get('/usuarios/')
      .then(response => {
        setUsuarios(response.data);
      })
      .catch(error => {
        console.error("Hubo un error al obtener los usuarios:", error);
      });
  };

  const getUserName = (userId) => {
    const user = usuarios.find(u => u.id === userId);
    return user ? `${user.nombre} ${user.apellidos}` : 'Desconocido';
  };

  const addDatosPostulante = () => {
    const formData = new FormData();
    formData.append('foto_perfil', newDatos.foto_perfil);
    formData.append('cv', newDatos.cv);
    formData.append('descripcion_profesional', newDatos.descripcion_profesional);
    formData.append('usuario', newDatos.usuario);

    axios.post('/datos_postulantes/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => {
        fetchDatosPostulantes();
        setNewDatos({ foto_perfil: null, cv: null, descripcion_profesional: '', usuario: '' });
      })
      .catch(error => {
        console.error("Hubo un error al añadir los datos de postulante:", error);
      });
  };

  const updateDatosPostulante = (id) => {
    const formData = new FormData();
    formData.append('foto_perfil', editDatos.foto_perfil);
    formData.append('cv', editDatos.cv);
    formData.append('descripcion_profesional', editDatos.descripcion_profesional);
    formData.append('usuario', editDatos.usuario);

    axios.put(`/datos_postulantes/${id}/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => {
        fetchDatosPostulantes();
        setEditId(null);
        setEditDatos({ foto_perfil: null, cv: null, descripcion_profesional: '', usuario: '' });
      })
      .catch(error => {
        console.error("Hubo un error al actualizar los datos de postulante:", error);
      });
  };

  const deleteDatosPostulante = (id) => {
    axios.delete(`/datos_postulantes/${id}/`)
      .then(response => {
        fetchDatosPostulantes();
      })
      .catch(error => {
        console.error("Hubo un error al eliminar los datos de postulante:", error);
      });
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center my-4">
        <h2>Datos de Postulantes</h2>
      </div>
      <ul className="list-group mb-4">
        {datosPostulantes.map(datos => (
          <li key={datos.id} className="list-group-item d-flex justify-content-between align-items-center">
            {editId === datos.id ? (
              <div className="flex-grow-1">
                <input
                  type="file"
                  onChange={(e) => setEditDatos({ ...editDatos, foto_perfil: e.target.files[0] })}
                  className="form-control my-1"
                />
                <input
                  type="file"
                  onChange={(e) => setEditDatos({ ...editDatos, cv: e.target.files[0] })}
                  className="form-control my-1"
                />
                <input
                  type="text"
                  value={editDatos.descripcion_profesional}
                  onChange={(e) => setEditDatos({ ...editDatos, descripcion_profesional: e.target.value })}
                  className="form-control my-1"
                  placeholder="Descripción Profesional"
                />
                <select
                  value={editDatos.usuario}
                  onChange={(e) => setEditDatos({ ...editDatos, usuario: e.target.value })}
                  className="form-control my-1"
                >
                  <option value="">Selecciona un usuario</option>
                  {usuarios.map(usuario => (
                    <option key={usuario.id} value={usuario.id}>{usuario.nombre} {usuario.apellidos}</option>
                  ))}
                </select>
                <button className="btn btn-success mt-2" onClick={() => updateDatosPostulante(datos.id)}>Actualizar</button>
              </div>
            ) : (
              <div className="flex-grow-1">
                <p>
                  Foto de Perfil: <a href={datos.foto_perfil} download>Descargar</a>
                </p>
                <p>
                  CV: <a href={datos.cv} download>Descargar</a>
                </p>
                <p>Descripción Profesional: {datos.descripcion_profesional}</p>
                <p>Usuario: {getUserName(datos.usuario)}</p>
              </div>
            )}
            {editId === datos.id ? (
              <button className="btn btn-danger ml-2" onClick={() => setEditId(null)}>Cancelar</button>
            ) : (
              <div>
                <button className="btn btn-warning mr-2" onClick={() => { setEditId(datos.id); setEditDatos(datos); }}>Editar</button>
                <button className="btn btn-danger" onClick={() => deleteDatosPostulante(datos.id)}>Eliminar</button>
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
                  type="file"
                  onChange={(e) => setNewDatos({ ...newDatos, foto_perfil: e.target.files[0] })}
                  className="form-control"
                />
                <label>Seleccionar foto de perfil</label>
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="file"
                  onChange={(e) => setNewDatos({ ...newDatos, cv: e.target.files[0] })}
                  className="form-control"
                />
                <label>Seleccionar CV</label>
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="text"
                  value={newDatos.descripcion_profesional}
                  onChange={(e) => setNewDatos({ ...newDatos, descripcion_profesional: e.target.value })}
                  placeholder="Descripción Profesional"
                  className="form-control"
                />
              </td>
            </tr>
            <tr>
              <td>
                <select
                  value={newDatos.usuario}
                  onChange={(e) => setNewDatos({ ...newDatos, usuario: e.target.value })}
                  className="form-control"
                >
                  <option value="">Selecciona un usuario</option>
                  {usuarios.map(usuario => (
                    <option key={usuario.id} value={usuario.id}>{usuario.nombre} {usuario.apellidos}</option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <td className="text-right">
                <button className="btn btn-primary" onClick={addDatosPostulante}>Añadir datos</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DatosPostulantesList;
