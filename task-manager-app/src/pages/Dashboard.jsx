import { useEffect, useState, useContext } from "react";
import { fetchTasks, createTask, deleteTask, updateTask } from "../services/taskService";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { currentUser } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [darkMode, setDarkMode] = useState(JSON.parse(localStorage.getItem("darkMode")) || false);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const loadTasks = async () => {
    if (currentUser) {
      const activeTasks = await fetchTasks(currentUser.uid, "active");
      const completed = await fetchTasks(currentUser.uid, "completed");

      // Convert Firestore timestamps properly without overriding values
      const formattedTasks = activeTasks.map(task => ({
        ...task,
        dueDate: task.dueDate?.seconds ? new Date(task.dueDate.seconds * 1000) : task.dueDate
      }));

      // Sort by due date (earliest first)
      formattedTasks.sort((a, b) => a.dueDate - b.dueDate);

      // Apply status filtering
      const filtered = formattedTasks.filter(task => filterStatus === "all" || task.status === filterStatus);

      setTasks(filtered);
      setCompletedTasks(completed.slice(0, 3)); // Limit to 3 completed tasks
    }
  };

  useEffect(() => {
    loadTasks();
  }, [currentUser, filterStatus]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createTask({
      title,
      description,
      priority,
      dueDate,
      dueTime,
      status: "Pending",
      createdBy: currentUser.uid
    });
    setTitle("");
    setDescription("");
    setPriority("Medium");
    setDueDate("");
    setDueTime("");
    loadTasks();
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    loadTasks();
  };

  const handleStatusChange = async (id, status) => {
    await updateTask(id, { status });
    loadTasks();
  };

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      localStorage.setItem("darkMode", JSON.stringify(!prevMode));
      return !prevMode;
    });
  };

  return (
    <div className="dashboard">
      <h2>Task Dashboard</h2>
      <button className="dark-mode-toggle" onClick={toggleDarkMode}>
        {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
      </button>
      {currentUser && <p>Welcome, {currentUser.email}</p>}

      <form onSubmit={handleSubmit}>
        <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
        <input type="time" value={dueTime} onChange={(e) => setDueTime(e.target.value)} required />
        <button type="submit">Add Task</button>
      </form>

      <div className="task-filter">
        <label>Filter by Status:</label>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="all">All Tasks</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <h3>Active Tasks:</h3>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="task-item">
            <strong>{task.title}</strong> - {task.priority} - {task.status}
            <br />
            Due: {task.dueDate.toLocaleDateString()} at {task.dueDate.toLocaleTimeString()}
            <div className="task-buttons">
              <button onClick={() => handleStatusChange(task.id, "In Progress")}>In Progress</button>
              <button onClick={() => handleStatusChange(task.id, "Completed")}>Complete</button>
              <button onClick={() => handleDelete(task.id)}>Delete</button>
              <Link to={`/task/${task.id}`}>View Details</Link>
            </div>
          </li>
        ))}
      </ul>

      <h3>Completed Tasks:</h3>
      <ul>
        {completedTasks.map((task) => (
          <li key={task.id} className="task-item completed">
            <strong>{task.title}</strong> - {task.priority} - ✅ Completed
            <br />
            Completed on: {new Date(task.dueDate.seconds * 1000).toLocaleDateString()} at{" "}
            {new Date(task.dueDate.seconds * 1000).toLocaleTimeString()}
          </li>
        ))}
      </ul>

      <Link to="/">Back Home</Link>
    </div>
  );
};

export default Dashboard;