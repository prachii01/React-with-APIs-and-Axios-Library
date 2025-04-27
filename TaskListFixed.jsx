import React, { useState, useEffect } from "react";
import axios from "axios";

function TaskListFixed() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get("https://your-firebase-db.firebaseio.com/tasks.json");
      const data = response.data;
      const parsedTasks = data ? Object.keys(data).map(id => ({ id, ...data[id] })) : [];
      setTasks(parsedTasks);
    } catch (error) {
      setError("Error fetching tasks!");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>Task List</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default TaskListFixed;