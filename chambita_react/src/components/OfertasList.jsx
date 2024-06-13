import React, { useState, useEffect } from 'react';
import axios from '../axiosConfig';
import moment from 'moment';

const OfertasList = () => {
  const [ofertas, setOfertas] = useState([]);
  const [newOferta, setNewOferta] = useState({ titulo: '', descripcion: '', salario: '', requerimientos: '', fecha_publicacion: '', estado: 'activa', empresa: 1 });
  const [editOferta, setEditOferta] = useState({ titulo: '', descripcion: '', salario: '', requerimientos: '', fecha_publicacion: '', estado: 'activa', empresa: 1 });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchOfertas();
  }, []);

  const fetchOfertas = () => {
    axios.get('/ofertas_trabajo/')
      .then(response => {
        setOfertas(response.data);
      })
      .catch(error => {
        console.error("Hubo un error al obtener las ofertas de trabajo:", error);
      });
  };

  const addOferta = () => {
    axios.post('/ofertas_trabajo/', newOferta)
      .then(response => {
        fetchOfertas();
        setNewOferta({ titulo: '', descripcion: '', salario: '', requerimientos: '', fecha_publicacion: '', estado: 'activa', empresa: 1 });
      })
      .catch(error => {
        console.error("Hubo un error al añadir la oferta de trabajo:", error);
      });
  };

  const updateOferta = (id) => {
    axios.put(`/ofertas_trabajo/${id}/`, editOferta)
      .then(response => {
        fetchOfertas();
        setEditId(null);
        setEditOferta({ titulo: '', descripcion: '', salario: '', requerimientos: '', fecha_publicacion: '', estado: 'activa', empresa: 1 });
      })
      .catch(error => {
        console.error("Hubo un error al actualizar la oferta de trabajo:", error);
      });
  };

  const deleteOferta = (id) => {
    axios.delete(`/ofertas_trabajo/${id}/`)
      .then(response => {
        fetchOfertas();
      })
      .catch(error => {
        console.error("Hubo un error al eliminar la oferta de trabajo:", error);
      });
  };

  const calculateTimeLeft = (fechaPublicacion) => {
    const now = moment();
    const end = moment(fechaPublicacion).add(7, 'days');
    const diff = end.diff(now);

    if (diff <= 0) {
      return 'Expirado';
    }

    const duration = moment.duration(diff);
    const days = duration.days();
    const hours = duration.hours();
    const minutes = duration.minutes();
    const seconds = duration.seconds();

    return `${days} días, ${hours} horas, ${minutes} minutos`;
  };

  return (
    <div>
      <div className="my-4">
        <h2>Ofertas de Trabajo</h2>
      </div>
      <ul className="list-group mb-4">
        {ofertas.map(oferta => (
          <li key={oferta.id} className="list-group-item d-flex justify-content-between align-items-center">
            {editId === oferta.id ? (
              <div className="flex-grow-1">
                <input
                  type="text"
                  value={editOferta.titulo}
                  onChange={(e) => setEditOferta({ ...editOferta, titulo: e.target.value })}
                  className="form-control my-1"
                />
                <input
                  type="text"
                  value={editOferta.descripcion}
                  onChange={(e) => setEditOferta({ ...editOferta, descripcion: e.target.value })}
                  className="form-control my-1"
                />
                <input
                  type="text"
                  value={editOferta.salario}
                  onChange={(e) => setEditOferta({ ...editOferta, salario: e.target.value })}
                  className="form-control my-1"
                />
                <input
                  type="text"
                  value={editOferta.requerimientos}
                  onChange={(e) => setEditOferta({ ...editOferta, requerimientos: e.target.value })}
                  className="form-control my-1"
                />
                <input
                  type="text"
                  value={editOferta.fecha_publicacion}
                  onChange={(e) => setEditOferta({ ...editOferta, fecha_publicacion: e.target.value })}
                  className="form-control my-1"
                />
                <input
                  type="text"
                  value={editOferta.estado}
                  onChange={(e) => setEditOferta({ ...editOferta, estado: e.target.value })}
                  className="form-control my-1"
                />
                <input
                  type="number"
                  value={editOferta.empresa}
                  onChange={(e) => setEditOferta({ ...editOferta, empresa: e.target.value })}
                  className="form-control my-1"
                />
                <button className="btn btn-success mt-2" onClick={() => updateOferta(oferta.id)}>Actualizar</button>
              </div>
            ) : (
              <div className="flex-grow-1">
                <p>Título: {oferta.titulo}</p>
                <p>Descripción: {oferta.descripcion}</p>
                <p>Salario: {oferta.salario}</p>
                <p>Requerimientos: {oferta.requerimientos}</p>
                <p>Fecha de Publicación: {moment(oferta.fecha_publicacion).format('YYYY-MM-DD')} ({calculateTimeLeft(oferta.fecha_publicacion)})</p>
                <p>Estado: {oferta.estado}</p>
                <p>Empresa: {oferta.empresa.nombre}</p>
              </div>
            )}
            {editId === oferta.id ? (
              <button className="btn btn-danger ml-2" onClick={() => setEditId(null)}>Cancelar</button>
            ) : (
              <div>
                <button className="btn btn-warning mr-2" onClick={() => { setEditId(oferta.id); setEditOferta(oferta); }}>Editar</button>
                <button className="btn btn-danger" onClick={() => deleteOferta(oferta.id)}>Eliminar</button>
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
                  value={newOferta.titulo}
                  onChange={(e) => setNewOferta({ ...newOferta, titulo: e.target.value })}
                  placeholder="Título"
                  className="form-control"
                />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="text"
                  value={newOferta.descripcion}
                  onChange={(e) => setNewOferta({ ...newOferta, descripcion: e.target.value })}
                  placeholder="Descripción"
                  className="form-control"
                />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="text"
                  value={newOferta.salario}
                  onChange={(e) => setNewOferta({ ...newOferta, salario: e.target.value })}
                  placeholder="Salario"
                  className="form-control"
                />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="text"
                  value={newOferta.requerimientos}
                  onChange={(e) => setNewOferta({ ...newOferta, requerimientos: e.target.value })}
                  placeholder="Requerimientos"
                  className="form-control"
                />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="date"
                  value={newOferta.fecha_publicacion}
                  onChange={(e) => setNewOferta({ ...newOferta, fecha_publicacion: e.target.value })}
                  placeholder="Fecha de Publicación"
                  className="form-control"
                />
              </td>
            </tr>
            <tr>
              <td>
                <select
                  value={newOferta.estado}
                  onChange={(e) => setNewOferta({ ...newOferta, estado: e.target.value })}
                  className="form-control"
                >
                  <option value="activa">Activa</option>
                  <option value="inactiva">Inactiva</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>
                <select
                  value={newOferta.empresa}
                  onChange={(e) => setNewOferta({ ...newOferta, empresa: e.target.value })}
                  className="form-control"
                >
                  {ofertas.map(oferta => (
                    <option key={oferta.empresa.id} value={oferta.empresa.id}>{oferta.empresa.nombre}</option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <td className="text-right">
                <button className="btn btn-primary" onClick={addOferta}>Añadir oferta</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OfertasList;
