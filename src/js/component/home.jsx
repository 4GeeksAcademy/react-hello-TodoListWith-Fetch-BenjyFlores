import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import rigoImage from "../../img/rigo-baby.jpg";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);

  const handleAddTodo = () => {
    if (inputValue.trim() !== "") {
      setTodos([...todos, inputValue]);
      setInputValue("");
    }
  };

  const handleRemoveTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
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
              {todo}
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
