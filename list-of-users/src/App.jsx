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

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

function App() {
  const [data, setData] = useState();
  
  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  const handleDelete = (id) => {
    console.log("Eliminar", id);
  };

  const handleEdit = (id) => {
    console.log("Editar", id);
  
  };

  return (
    <>
      <main>
        <h1>Lista de nombres</h1>
      </main>
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
            {data &&
              data.map((person) => {
                const { id, nombre } = person;
                return (
                  <tr key={id}>
                    <td className="td-id">{id}</td>
                    <td className="td-name">
                      <input
                        type="text"
                        value={nombre}
                        className="name-person"
                        readOnly={true}
                      />
                    </td>
                    <td className="actions">
                      <Button text="Editar" onClick={() => handleEdit(id)} />
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
