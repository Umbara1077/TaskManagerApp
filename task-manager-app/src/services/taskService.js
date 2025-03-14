// services/taskService.js
import { db } from './firebase';
import { collection, query, where, getDocs, addDoc, doc, updateDoc, deleteDoc, Timestamp } from 'firebase/firestore';

// Create Task
export const createTask = async (task) => {
    try {
      await addDoc(collection(db, 'tasks'), {
        ...task,
        dueDate: new Date(`${task.dueDate}T${task.dueTime}`),
        status: 'Pending',
        createdAt: new Date(),
      });
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };
  
// Fetch Tasks
export const fetchTasks = async (userId, statusFilter = 'active') => {
    try {
      const q = query(
        collection(db, 'tasks'),
        where('createdBy', '==', userId),
        where('status', 'in', statusFilter === 'active' ? ['Pending', 'In Progress'] : ['Completed'])
      );
  
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error fetching tasks:', error);
      return [];
    }
  };

export const fetchTaskById = async (id) => {
  const taskSnap = await getDocs(doc(db, 'tasks', id));
  return taskSnap.exists() ? { id: taskSnap.id, ...taskSnap.data() } : null;
};

// Update Task
export const updateTask = (taskId, updatedTask) => {
  const taskRef = doc(db, 'tasks', taskId);
  return updateDoc(taskRef, updatedTask);
};

// Delete Task
export const deleteTask = (taskId) => {
  const taskRef = doc(db, 'tasks', taskId);
  return deleteDoc(taskRef);
};