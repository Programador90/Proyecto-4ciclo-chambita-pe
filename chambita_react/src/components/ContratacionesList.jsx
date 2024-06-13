import React, { useState, useEffect } from 'react';
import axios from '../axiosConfig';

const ContratacionesList = () => {
  const [contrataciones, setContrataciones] = useState([]);
  const [newContratacion, setNewContratacion] = useState({ oferta_trabajo: 1 });
  const [editContratacion, setEditContratacion] = useState({ oferta_trabajo: 1 });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchContrataciones();
  }, []);

  const fetchContrataciones = () => {
    axios.get('/contrataciones/')
      .then(response => {
        setContrataciones(response.data);
      })
      .catch(error => {
        console.error("Hubo un error al obtener las contrataciones:", error);
      });
  };

  const addContratacion = () => {
    axios.post('/contrataciones/', newContratacion)
      .then(response => {
        fetchContrataciones();
        setNewContratacion({ oferta_trabajo: 1 });
      })
      .catch(error => {
        console.error("Hubo un error al añadir la contratación:", error);
      });
  };

  const updateContratacion = (id) => {
    axios.put(`/contrataciones/${id}/`, editContratacion)
      .then(response => {
        fetchContrataciones();
        setEditId(null);
        setEditContratacion({ oferta_trabajo: 1 });
      })
      .catch(error => {
        console.error("Hubo un error al actualizar la contratación:", error);
      });
  };

  const deleteContratacion = (id) => {
    axios.delete(`/contrataciones/${id}/`)
      .then(response => {
        fetchContrataciones();
      })
      .catch(error => {
        console.error("Hubo un error al eliminar la contratación:", error);
      });
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center my-4">
        <h2>Contrataciones</h2>
        <button className="btn btn-primary" onClick={addContratacion}>Añadir contratación</button>
      </div>
      <ul className="list-group mb-4">
        {contrataciones.map(contratacion => (
          <li key={contratacion.id} className="list-group-item d-flex justify-content-between align-items-center">
            {editId === contratacion.id ? (
              <div className="flex-grow-1">
                <input
                  type="number"
                  value={editContratacion.oferta_trabajo}
                  onChange={(e) => setEditContratacion({ ...editContratacion, oferta_trabajo: e.target.value })}
                  className="form-control my-1"
                />
                <button className="btn btn-success mt-2" onClick={() => updateContratacion(contratacion.id)}>Actualizar</button>
              </div>
            ) : (
              <div className="flex-grow-1">
                <p>Oferta de Trabajo: {contratacion.oferta_trabajo}</p>
              </div>
            )}
            {editId === contratacion.id ? (
              <button className="btn btn-danger ml-2" onClick={() => setEditId(null)}>Cancelar</button>
            ) : (
              <div>
                <button className="btn btn-warning mr-2" onClick={() => { setEditId(contratacion.id); setEditContratacion(contratacion); }}>Editar</button>
                <button className="btn btn-danger" onClick={() => deleteContratacion(contratacion.id)}>Eliminar</button>
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
                  type="number"
                  value={newContratacion.oferta_trabajo}
                  onChange={(e) => setNewContratacion({ ...newContratacion, oferta_trabajo: e.target.value })}
                  placeholder="Oferta de Trabajo"
                  className="form-control"
                />
              </td>
            </tr>
            <tr>
              <td className="text-right">
                <button className="btn btn-primary" onClick={addContratacion}>Añadir contratación</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContratacionesList;
