import React, { useState } from 'react';
import '../styles/App.css';
import UserList from './UserList';
import TodoList from './TodoList';

const App = () => {

  const [ show, setShow ] = useState( true );

  return <>
    <UserList />

    <button onClick={ () => setShow( !show ) }>{show ? 'Desmontar' : 'Montar'} todo list</button>

    {show && <TodoList />}


  </>;
};


export default App;

