import React, { useState, useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import styles from './TodoItem.module.css';

const TodoItem = ({ task }) => {
    const { editTask, deleteTask, toggleTaskStatus, pinTask } = useContext(TaskContext);
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(task.title);
    const [editedDescription, setEditedDescription] = useState(task.description);

    const handleSave = () => {
        editTask(task.id, { title: editedTitle, description: editedDescription });
        setIsEditing(false);
    };

    const isCompleted = (task.status === 'completed');

    return (
        <li className={`${styles.todoItem} ${isCompleted ? styles.completedTask : ''}`}>
            {isEditing ? (
                <div className={styles.editForm}>
                    <input
                        type="text"
                        value={editedTitle}
                        onChange={e => setEditedTitle(e.target.value)}
                        className={styles.editInput}
                    />
                    <textarea
                        value={editedDescription}
                        onChange={e => setEditedDescription(e.target.value)}
                        className={styles.editTextarea}
                    />
                    <button onClick={handleSave} className={styles.saveButton}>Сохранить</button>
                </div>
            ) : (
                <div className={styles.taskContent}>
                    <h3>{task.title}</h3>
                    {task.description && <p>{task.description}</p>}
                </div>
            )}

            <div className={styles.buttons}>
                {/* Галочка: зелёная, если выполнено */}
                <button
                    onClick={() => toggleTaskStatus(task.id)}
                    className={isCompleted ? styles.checkButtonDone : styles.checkButton}
                >
                    {isCompleted ? '☑' : '☐'}
                </button>

                {/* Закрепить */}
                <button
                    onClick={() => pinTask(task.id)}
                    className={task.pinned ? styles.pinButtonActive : styles.pinButton}
                >
                    📌
                </button>

                {/* Удалить */}
                <button onClick={() => deleteTask(task.id)} className={styles.deleteButton}>
                    X
                </button>

                {/* Редактировать */}
                {!isEditing && (
                    <button onClick={() => setIsEditing(true)} className={styles.editButton}>
                        Редактировать
                    </button>
                )}
            </div>
        </li>
    );
};

export default TodoItem;
