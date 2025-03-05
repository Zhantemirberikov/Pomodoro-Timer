import React, { createContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [activeTask, setActiveTask] = useState(null);

    const addTask = (task) => {
        const newTask = {
            ...task,
            id: uuidv4(),
            status: 'inProgress',
            pinned: false
        };
        setTasks(prev => [...prev, newTask]);
    };

    const pinTask = (id) => {
        setTasks(prev =>
            prev.map(task => {
                if (task.id === id) {
                    return { ...task, pinned: !task.pinned };
                }
                return task;
            })
        );
    };

    const editTask = (id, updatedTask) => {
        setTasks(prev =>
            prev.map(task => (task.id === id ? { ...task, ...updatedTask } : task))
        );
    };

    const deleteTask = (id) => {
        setTasks(prev => prev.filter(task => task.id !== id));
        if (activeTask && activeTask.id === id) {
            setActiveTask(null);
        }
    };

    const toggleTaskStatus = (id) => {
        setTasks(prev =>
            prev.map(task => {
                if (task.id === id) {
                    const newStatus = task.status === 'inProgress' ? 'completed' : 'inProgress';
                    return { ...task, status: newStatus };
                }
                return task;
            })
        );
    };

    return (
        <TaskContext.Provider value={{
            tasks,
            addTask,
            editTask,
            deleteTask,
            toggleTaskStatus,
            pinTask,
            activeTask,
            setActiveTask,
        }}>
            {children}
        </TaskContext.Provider>
    );
};
