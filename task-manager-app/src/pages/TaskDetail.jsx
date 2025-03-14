import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../services/firebase';

const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchTask = async () => {
      const taskSnap = await getDoc(doc(db, 'tasks', id));
      if (taskSnap.exists()) {
        const data = taskSnap.data();
        setTask(data);
        setTitle(data.title);
        setDescription(data.description);
      }
      setLoading(false);
    };
    fetchTask();
  }, [id]);

  const handleUpdate = async () => {
    await updateDoc(doc(db, 'tasks', id), { title, description });
    alert('Task updated!');
    navigate('/dashboard');
  };

  if (loading) return <div>Loading...</div>;
  if (!task) return <div>No Task found.</div>;

  return (
    <div className="task-detail">
      <h2>Edit Task</h2>
      <input value={title} onChange={(e)=>setTitle(e.target.value)} />
      <textarea value={description} onChange={(e)=>setDescription(e.target.value)} style={{ height: '150px' }} />
      <div className="button-group" style={{ marginTop: '12px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <button onClick={handleUpdate}>Update Task</button>
        <Link to="/dashboard" className="back-link" style={{ alignSelf: 'center' }}>Back to Dashboard</Link>
      </div>
    </div>
  );
};

export default TaskDetail;