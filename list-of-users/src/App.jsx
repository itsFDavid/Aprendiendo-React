import { useEffect, useState } from "react";
import "./App.css";
import PropTypes from "prop-types";

const API_URL = "https://api-topicos-77j7.onrender.com/";

function Button({ text, onClick }) {
  const typeClass = text === "Eliminar" ? "btn-delete" : "btn-edit";
  return (
    <input type="button" value={text} onClick={onClick} className={typeClass} />
  );
}
const fetchData = () => {
  return fetch(API_URL)
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error fetching:", error);
      return []; // Retorna un array vacío en caso de error
    });
};
Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

function App() {
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");

  useEffect(() => {
   fetchData().then((data)=>setData(data));
  }, []);

  const handleDelete = (id) => {
    fetch(`${API_URL}`, { 
      method: 'DELETE', 
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify({ id: id }) 
    })
      .then(() => setData(data.filter((person) => person.id !== id)))
      .catch((error) => console.error("Error deleting:", error));
  };

  const handleEdit = (id) => {
    if (editId === id) {
      fetch(`${API_URL}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: id, nombre: editName })
      })
        .then(() => {
          setData(data.map((person) =>
            person.id === id ? { ...person, nombre: editName } : person
          ));
          setEditId(null);
          setEditName("");
        })
        .catch((error) => console.error("Error updating:", error));
      } else {
        setEditId(id);
        
        setEditName(data.find((person) => person.id === id).nombre);
    }
  };

  const handleNameChange = (event) => {
    setEditName(event.target.value);
  };
  const handleAddUser = () => {
    const name = document.querySelector(".input-name").value;
    fetch(`${API_URL}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre: name })
    })
      .then((response) => response.json())
      .then(() => {fetchData().then((data)=>setData(data))
        document.querySelector(".input-name").value = "";
      })
      .catch((error) => console.error("Error adding:", error));
  }

  return (
    <>
      <main>
        <h1>Lista de nombres</h1>
      </main>
      <form className="form-add">
        <input type="text" placeholder="Nombre" className="input-name" />
        <Button text="Agregar" onClick={handleAddUser}/>
      </form>
      <section className="body-content">
        <table className="table-users">
          <thead>
            <tr>
              <th className="thead-id">ID</th>
              <th className="thead-name">Nombre</th>
              <th className="thead-actions">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map((person) => {
              const { id, nombre } = person;
              return (
                <tr key={id}>
                  <td className="td-id">{id}</td>
                  <td className="td-name">
                    {editId === id ? (
                      <input
                        type="text"
                        value={editName}
                        onChange={handleNameChange}
                        className="name-person"
                      />
                    ) : (
                      nombre
                    )}
                  </td>
                  <td className="actions">
                    <Button
                      text={editId === id ? "Guardar" : "Editar"}
                      onClick={() => handleEdit(id)}
                    />
                    <Button
                      text="Eliminar"
                      onClick={() => handleDelete(id)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </>
  );
}

export default App;
