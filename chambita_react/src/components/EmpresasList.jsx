import React, { useState, useEffect } from 'react';
import axios from '../axiosConfig';

const EmpresasList = () => {
  const [empresas, setEmpresas] = useState([]);
  const [sectores, setSectores] = useState([]);
  const [newEmpresa, setNewEmpresa] = useState({
    nombre_comercial: '',
    telefono: '',
    ruc: '',
    distrito: '',
    direccion: '',
    sector: ''
  });
  const [editEmpresa, setEditEmpresa] = useState(null);

  useEffect(() => {
    fetchEmpresas();
    fetchSectores();
  }, []);

  const fetchEmpresas = () => {
    axios.get('/empresas/')
      .then(response => {
        setEmpresas(response.data);
      })
      .catch(error => {
        console.error("Hubo un error al obtener las empresas:", error);
      });
  };

  const fetchSectores = () => {
    axios.get('/sectores/')
      .then(response => {
        setSectores(response.data);
      })
      .catch(error => {
        console.error("Hubo un error al obtener los sectores:", error);
      });
  };

  const addEmpresa = () => {
    axios.post('/empresas/', newEmpresa)
      .then(response => {
        fetchEmpresas();
        setNewEmpresa({
          nombre_comercial: '',
          telefono: '',
          ruc: '',
          distrito: '',
          direccion: '',
          sector: ''
        });
      })
      .catch(error => {
        console.error("Hubo un error al añadir la empresa:", error);
      });
  };

  const updateEmpresa = (id) => {
    axios.put(`/empresas/${id}/`, editEmpresa)
      .then(response => {
        fetchEmpresas();
        setEditEmpresa(null);
      })
      .catch(error => {
        console.error("Hubo un error al actualizar la empresa:", error);
      });
  };

  const deleteEmpresa = (id) => {
    axios.delete(`/empresas/${id}/`)
      .then(response => {
        fetchEmpresas();
      })
      .catch(error => {
        console.error("Hubo un error al eliminar la empresa:", error);
      });
  };

  return (
    <div>
      <h2 className="my-4">Lista de Empresas</h2>
      <ul className="list-group mb-4">
        {empresas.map(empresa => (
          <li key={empresa.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              {editEmpresa && editEmpresa.id === empresa.id ? (
                <div>
                  <input
                    type="text"
                    value={editEmpresa.nombre_comercial}
                    onChange={(e) => setEditEmpresa({ ...editEmpresa, nombre_comercial: e.target.value })}
                    placeholder="Nombre Comercial"
                    className="form-control"
                  />
                  <input
                    type="text"
                    value={editEmpresa.telefono}
                    onChange={(e) => setEditEmpresa({ ...editEmpresa, telefono: e.target.value })}
                    placeholder="Teléfono"
                    className="form-control"
                  />
                  <input
                    type="text"
                    value={editEmpresa.ruc}
                    onChange={(e) => setEditEmpresa({ ...editEmpresa, ruc: e.target.value })}
                    placeholder="RUC"
                    className="form-control"
                  />
                  <input
                    type="text"
                    value={editEmpresa.distrito}
                    onChange={(e) => setEditEmpresa({ ...editEmpresa, distrito: e.target.value })}
                    placeholder="Distrito"
                    className="form-control"
                  />
                  <input
                    type="text"
                    value={editEmpresa.direccion}
                    onChange={(e) => setEditEmpresa({ ...editEmpresa, direccion: e.target.value })}
                    placeholder="Dirección"
                    className="form-control"
                  />
                  <select
                    value={editEmpresa.sector}
                    onChange={(e) => setEditEmpresa({ ...editEmpresa, sector: e.target.value })}
                    className="form-control"
                  >
                    <option value="">Selecciona un sector</option>
                    {sectores.map(sector => (
                      <option key={sector.id} value={sector.id}>{sector.nombre}</option>
                    ))}
                  </select>
                  <button className="btn btn-success mt-2" onClick={() => updateEmpresa(empresa.id)}>Actualizar</button>
                </div>
              ) : (
                <div>
                  <p>Nombre Comercial: {empresa.nombre_comercial}</p>
                  <p>Teléfono: {empresa.telefono}</p>
                  <p>RUC: {empresa.ruc}</p>
                  <p>Distrito: {empresa.distrito}</p>
                  <p>Dirección: {empresa.direccion}</p>
                  <p>Sector: {sectores.find(sector => sector.id === empresa.sector)?.nombre}</p>
                </div>
              )}
            </div>
            <div>
              {editEmpresa && editEmpresa.id === empresa.id ? (
                <button className="btn btn-danger ml-2" onClick={() => setEditEmpresa(null)}>Cancelar</button>
              ) : (
                <div>
                  <button className="btn btn-warning mr-2" onClick={() => setEditEmpresa(empresa)}>Editar</button>
                  <button className="btn btn-danger" onClick={() => deleteEmpresa(empresa.id)}>Eliminar</button>
                </div>
              )}
            </div>
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
                  value={newEmpresa.nombre_comercial}
                  onChange={(e) => setNewEmpresa({ ...newEmpresa, nombre_comercial: e.target.value })}
                  placeholder="Nombre Comercial"
                  className="form-control"
                />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="text"
                  value={newEmpresa.telefono}
                  onChange={(e) => setNewEmpresa({ ...newEmpresa, telefono: e.target.value })}
                  placeholder="Teléfono"
                  className="form-control"
                />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="text"
                  value={newEmpresa.ruc}
                  onChange={(e) => setNewEmpresa({ ...newEmpresa, ruc: e.target.value })}
                  placeholder="RUC"
                  className="form-control"
                />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="text"
                  value={newEmpresa.distrito}
                  onChange={(e) => setNewEmpresa({ ...newEmpresa, distrito: e.target.value })}
                  placeholder="Distrito"
                  className="form-control"
                />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="text"
                  value={newEmpresa.direccion}
                  onChange={(e) => setNewEmpresa({ ...newEmpresa, direccion: e.target.value })}
                  placeholder="Dirección"
                  className="form-control"
                />
              </td>
            </tr>
            <tr>
              <td>
                <select
                  value={newEmpresa.sector}
                  onChange={(e) => setNewEmpresa({ ...newEmpresa, sector: e.target.value })}
                  className="form-control"
                >
                  <option value="">Selecciona un sector</option>
                  {sectores.map(sector => (
                    <option key={sector.id} value={sector.id}>{sector.nombre}</option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <td className="text-right">
                <button className="btn btn-primary" onClick={addEmpresa}>Añadir empresa</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmpresasList;
