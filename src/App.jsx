import './App.css';
import React, { useEffect, useState } from 'react';
import User from './components/User';
import AddUser from './components/AddUser';

const App = () => {
  const [users, setUsers] = useState([]);
  const jsonLink = 'https://jsonplaceholder.typicode.com/todos';
  const [upperLimit, addupperLimit] = useState(200);
  let lowerLimit = 195;

  // Fetch todos from the API
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await fetch(jsonLink)
      .then((res) => res.json())
      .then((data) => {
        // Set completed to false for all fetched tasks
        const modifiedData = data.map(item => ({
          ...item,
          completed: false // Ensure tasks are not checked on load
        }));
        setUsers(modifiedData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Add new todo
  const onAdd = async (name) => {
    await fetch(jsonLink, {
      method: 'POST',
      body: JSON.stringify({
        title: name,
        completed: false,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUsers((users) => [...users, data]);
        addupperLimit(upperLimit + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Delete a todo
  const onDelete = async (id) => {
    await fetch(`${jsonLink}/${id}`, {
      method: 'DELETE'
    }).then((response) => {
      if (response.status === 200) {
        setUsers(users.filter((user) => user.id !== id));
        addupperLimit(upperLimit - 1);
      }
    }).catch((err) => {
      console.log(err);
    });
  };

  // Edit a todo (PUT request)
  const handleEditTodos = async (editValue, id) => {
    await fetch(`${jsonLink}/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title: editValue,
        completed: false, // Or set as needed
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedUsers = users.map((user) =>
          user.id === id ? { ...user, title: editValue } : user
        );
        setUsers(updatedUsers);
        alert(`Todo updated: ${editValue}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Switch between completed and not completed
  const switchComplete = (id) => {
    const updatedUsers = users.map((user) =>
      user.id === id ? { ...user, completed: !user.completed } : user
    );
    setUsers(updatedUsers);
  };

  return (
    <div className='App'>
      <br />
      <h1>TODO LIST APP</h1>
      <AddUser onAdd={onAdd} /><br />
      <div className='allList'>
        {users.slice(lowerLimit, upperLimit).map((user) => (
          <User
            id={user.id}
            key={user.id}
            title={user.title}
            completed={user.completed}
            onDelete={onDelete}
            handleEditTodos={handleEditTodos}
            checkComplete={switchComplete}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
