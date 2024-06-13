import React, { useState, useEffect } from 'react';
import axios from '../axiosConfig';

const SectoresList = () => {
  const [sectores, setSectores] = useState([]);
  const [newSector, setNewSector] = useState({ id: '', nombre: '' });
  const [editSector, setEditSector] = useState({ id: '', nombre: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchSectores();
  }, []);

  const fetchSectores = () => {
    axios.get('/sectores/')
      .then(response => {
        setSectores(response.data);
      })
      .catch(error => {
        console.error("Hubo un error al obtener los sectores:", error);
      });
  };

  const addSector = () => {
    axios.post('/sectores/', newSector)
      .then(response => {
        fetchSectores();
        setNewSector({ id: '', nombre: '' });
      })
      .catch(error => {
        console.error("Hubo un error al añadir el sector:", error);
      });
  };

  const updateSector = (id) => {
    axios.put(`/sectores/${id}/`, editSector)
      .then(response => {
        fetchSectores();
        setEditId(null);
        setEditSector({ id: '', nombre: '' });
      })
      .catch(error => {
        console.error("Hubo un error al actualizar el sector:", error);
      });
  };

  const deleteSector = (id) => {
    axios.delete(`/sectores/${id}/`)
      .then(response => {
        fetchSectores();
      })
      .catch(error => {
        console.error("Hubo un error al eliminar el sector:", error);
      });
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center my-4">
        <h2>Lista de Sectores</h2>
      </div>
      <ul className="list-group mb-4">
        {sectores.map(sector => (
          <li key={sector.id} className="list-group-item d-flex justify-content-between align-items-center">
            {editId === sector.id ? (
              <div className="flex-grow-1">
                <input
                  type="text"
                  value={editSector.id}
                  onChange={(e) => setEditSector({ ...editSector, id: e.target.value })}
                  className="form-control my-1"
                />
                <input
                  type="text"
                  value={editSector.nombre}
                  onChange={(e) => setEditSector({ ...editSector, nombre: e.target.value })}
                  className="form-control my-1"
                />
                <button className="btn btn-success mt-2" onClick={() => updateSector(sector.id)}>Actualizar</button>
              </div>
            ) : (
              <div className="flex-grow-1">
                <p>ID: {sector.id}</p>
                <p>Nombre: {sector.nombre}</p>
              </div>
            )}
            {editId === sector.id ? (
              <button className="btn btn-danger ml-2" onClick={() => setEditId(null)}>Cancelar</button>
            ) : (
              <div>
                <button className="btn btn-warning mr-2" onClick={() => { setEditId(sector.id); setEditSector(sector); }}>Editar</button>
                <button className="btn btn-danger" onClick={() => deleteSector(sector.id)}>Eliminar</button>
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
                  value={newSector.id}
                  onChange={(e) => setNewSector({ ...newSector, id: e.target.value })}
                  placeholder="ID"
                  className="form-control"
                />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="text"
                  value={newSector.nombre}
                  onChange={(e) => setNewSector({ ...newSector, nombre: e.target.value })}
                  placeholder="Nombre"
                  className="form-control"
                />
              </td>
            </tr>
            <tr>
              <td className="text-right">
                <button className="btn btn-primary" onClick={addSector}>Añadir sector</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SectoresList;
