import React, { useState, useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import styles from './TaskForm.module.css';

const TaskForm = () => {
    const { addTask } = useContext(TaskContext);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;
        addTask({ title, description });
        setTitle('');
        setDescription('');
    };

    return (
        <form onSubmit={handleSubmit} className={styles.taskForm}>
            <input
                type="text"
                placeholder="Название задачи"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
            />
            <textarea
                placeholder="Описание задачи"
                value={description}
                onChange={e => setDescription(e.target.value)}
            />
            <button type="submit">Добавить задачу</button>
        </form>
    );
};

export default TaskForm;
