// components/TodoList.jsx
import React, { useState, useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import TaskForm from './TaskForm';
import TodoItem from './TodoItem';
import styles from './TodoList.module.css';

const TodoList = () => {
    const { tasks } = useContext(TaskContext);
    const [filter, setFilter] = useState('all');

    // Сначала исключаем pinned
    const unpinnedTasks = tasks.filter(task => !task.pinned);

    // Потом фильтруем по статусу
    const filteredTasks = unpinnedTasks.filter(task => {
        if (filter === 'all') return true;
        if (filter === 'inProgress') return task.status === 'inProgress';
        return task.status === 'completed';
    });

    return (
        <div className={styles.todoList}>
            <h2>Список задач</h2>

            <TaskForm />

            <div className={styles.filters}>
                <button onClick={() => setFilter('all')}>Все</button>
                <button onClick={() => setFilter('inProgress')}>В процессе</button>
                <button onClick={() => setFilter('completed')}>Выполнено</button>
            </div>

            <ul className={styles.taskUl}>
                {filteredTasks.map(task => (
                    <TodoItem key={task.id} task={task} />
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
