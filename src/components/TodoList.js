/**
 * Created by chalosalvador on 8/2/20
 */
import React, { useState, useEffect } from "react";
import "../styles/todo-list.css";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [completed, setCompleted] = useState([]);

  const [darkMode, setDarkMode] = useState(false);

  const [showError, setShowError] = useState(false);

  const [user, setUser] = useState(null);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    console.log("USE EFFECT: Se renderizó el componente");
    console.log("el valor de showError es:", showError);

    if (showError) {
      document.title = `ERROR!!`;
    } else if (todos.length > 0) {
      document.title = `${todos.length} tareas pendientes`;
    } else {
      document.title = `No tienes tareas pendientes`;
    }
  }, [todos, showError]);

  useEffect(() => {
    console.log("Este efecto se ejecuta en cada renderizado del componente");
  });

  useEffect(() => {
    console.log("Este efecto solo se ejecuta cuando se monta el componente");
    // fetch('https://jsonplaceholder.typicode.com/users/1')
    //   .then((response)=>{
    //     return response.json();
    //   })
    //   .then((data)=>{
    //     console.log( 'data', data );
    //   })

    const getData = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users/1"
      );
      const data = await response.json();
      console.log("data", data);

      setUser(data);
    };

    getData();
  }, []);

  useEffect(() => {
    console.log("Ejecución del efecto");
    window.addEventListener("resize", handleResize);

    return () => {
      console.log("retorno del efecto ");
      window.removeEventListener("resize", handleResize);
    };
  });

  const handleResize = () => {
    console.log("Window width", window.innerWidth);
    setWindowWidth(window.innerWidth);
  };

  const handleAddTask = () => {
    const task = document.querySelector("#task").value;
    if (task !== "") {
      setTodos((prevState) => [...prevState, task]);
      document.querySelector("#task").value = "";
    } else {
      setShowError(true);
    }
  };

  const handleDeleteTask = (index) => {
    console.log("index", index);
    setTodos((prevState) => {
      return prevState.filter((task, i) => i !== index);
    });
  };

  const handleCompleteTask = (index) => {
    setCompleted((prevState) => [...prevState, todos[index]]);

    handleDeleteTask(index);
  };

  const handleChangeTheme = () => {
    console.log("handleChangeTheme");
    setDarkMode(!darkMode);
  };

  const handleChangeInput = (event) => {
    if (event.target.value !== "") {
      setShowError(false);
    } else {
      setShowError(true);
    }

    // No intentar utilizar el nuevo valor de la variable de estado
    // indemediatamente despues de setearlo, si se desea hacer algo con
    // el nuevo valor se lo debe hacer en el useEffect
  };

  return (
    <div className={darkMode ? "dark-mode" : ""}>
      <div>
        El ancho de la ventana es: <h1>{windowWidth}</h1>
      </div>
      <div>
        <label htmlFor="task">Tarea</label>
        <input type="text" id="task" onChange={handleChangeInput} />
        {showError && (
          <div className="error">Ingrese el nombre de la tarea</div>
        )}
      </div>
      <div>
        <button onClick={handleAddTask}>Agregar tarea</button>
        <button onClick={handleChangeTheme}>Cambiar tema</button>
      </div>
      <h1>Lista de tareas pendientes ({todos.length} en total)</h1>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Eliminar</th>
            <th>Completar</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((task, index) => (
            <tr key={index}>
              <td>{task}</td>
              <td>
                <button onClick={() => handleDeleteTask(index)}>
                  Eliminar
                </button>
              </td>
              <td>
                <button onClick={() => handleCompleteTask(index)}>
                  Completada
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h1>Lista de tareas completadas ({completed.length} en total)</h1>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
          </tr>
        </thead>
        <tbody>
          {completed.map((task, index) => (
            <tr key={index}>
              <td>{task}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h1>User info</h1>
      {user ? (
        <ul>
          <li>{user.name}</li>
        </ul>
      ) : (
        "Cargando los datos..."
      )}
    </div>
  );
};

export default TodoList;
