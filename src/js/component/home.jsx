import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import rigoImage from "../../img/rigo-baby.jpg";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []); 

  const fetchTodos = async () => {
    try {
      const response = await fetch("https://my-json-server.typicode.com/benjyflores/react-hello-TodoListWith-Fetch-BenjyFlores");
      if (!response.ok) {
        throw new Error("Failed to fetch todos");
      }
      const data = await response.json();
      setTodos(data.todos);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const handleAddTodo = async () => {
    if (inputValue.trim() !== "") {
      try {
        const response = await fetch("https://my-json-server.typicode.com/benjyflores/react-hello-TodoListWith-Fetch-BenjyFlores", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ todo: inputValue }),
        });
        if (!response.ok) {
          throw new Error("Failed to add todo");
        }
        fetchTodos(); 
        setInputValue("");
      } catch (error) {
        console.error("Error adding todo:", error);
      }
    }
  };

  const handleRemoveTodo = async (index) => {
    try {
      const response = await fetch(`https://my-json-server.typicode.com/benjyflores/react-hello-TodoListWith-Fetch-BenjyFlores${todos[index]._id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete todo");
      }
      fetchTodos(); 
    } catch (error) {
      console.error("Error removing todo:", error);
    }
  };

  return (
    <div
      className="text-center"
      style={{
        backgroundImage: `url(${rigoImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div style={{ backgroundColor: "rgba(255, 255, 255, 0.8)", padding: "20px", borderRadius: "10px" }}>
        <h1 className="text-center">ToDo</h1>
        <p>{`Number of Items: ${todos.length}`}</p>
        <ul>
          <li>
            <input
              className="custom-input"
              type="text"
              onChange={(e) => setInputValue(e.target.value)}
              value={inputValue}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleAddTodo();
                }
              }}
              placeholder="What's for today?"
            />
            <button className="trash-button" onClick={handleAddTodo}>
              Add
            </button>
          </li>
          {todos.map((todo, index) => (
            <li key={index}>
              {todo.title}
              <button className="trash-button" onClick={() => handleRemoveTodo(index)}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
