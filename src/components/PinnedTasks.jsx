import React, { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import TodoItem from './TodoItem';
import styles from './PinnedTasks.module.css';

const PinnedTasks = () => {
    const { tasks } = useContext(TaskContext);

    const pinnedTasks = tasks.filter(task => task.pinned);
    if (pinnedTasks.length === 0) return null; // если нет закреплённых

    return (
        <div className={styles.pinnedContainer}>
            <h2>Закреплённые задачи</h2>
            <ul className={styles.pinnedList}>
                {pinnedTasks.map(task => (
                    <TodoItem key={task.id} task={task} />
                ))}
            </ul>
        </div>
    );
};

export default PinnedTasks;
