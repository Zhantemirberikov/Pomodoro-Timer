// App.jsx (упрощённый пример)
import React, { useState, useContext } from 'react';
import { TaskProvider } from './context/TaskContext';
import { AuthProvider, AuthContext } from './context/AuthContext';

import PomodoroTimer from './components/PomodoroTimer';
import PinnedTasks from './components/PinnedTasks';
import TodoList from './components/TodoList';
import AuthForm from './components/AuthForm';

import styles from './App.module.css';

function App() {
    const [theme, setTheme] = useState('dark');
    const toggleTheme = () => {
        setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
    };

    return (
        <AuthProvider>
            <TaskProvider>
                <div className={theme === 'dark' ? styles.appContainerDark : styles.appContainerLight}>

                    {/* ШАПКА */}
                    <Header toggleTheme={toggleTheme} />

                    {/* ЦЕНТРАЛЬНЫЙ ЗАГОЛОВОК */}
                    <h1 className={styles.mainTitle}>ToDo List & Pomodoro</h1>

                    <div className={styles.contentWrapper}>
                        <PomodoroTimer theme={theme} />
                        <PinnedTasks />
                        <TodoList />
                    </div>
                </div>
            </TaskProvider>
        </AuthProvider>
    );
}

export default App;

// Вынесем шапку в отдельный компонент для удобства
function Header({ toggleTheme }) {
    const { user, logout } = useContext(AuthContext);
    const [showAuthModal, setShowAuthModal] = useState(false);

    const openAuthModal = () => setShowAuthModal(true);
    const closeAuthModal = () => setShowAuthModal(false);

    return (
        <div className={styles.topBar}>

            {/* Иконка помидора (слева) */}
            <img
                src="/tomato.png"
                alt="Toggle Theme"
                className={styles.tomatoIcon}
                onClick={toggleTheme}
            />

            {/* Кнопка (или иконка) входа/выхода (справа) */}
            <div className={styles.authIconContainer}>
                {user ? (
                    <>
                        <span className={styles.userName}>Привет, {user.username}!</span>
                        <button className={styles.logoutButton} onClick={logout}>
                            Выйти
                        </button>
                    </>
                ) : (
                    <button className={styles.loginButton} onClick={openAuthModal}>
                        Войти / Регистрация
                    </button>
                )}
            </div>

            {/* Модальное окно логина/регистрации */}
            {showAuthModal && (
                <div className={styles.modalOverlay} onClick={closeAuthModal}>
                    <div
                        className={styles.modalContent}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <AuthForm />
                        <button className={styles.closeModal} onClick={closeAuthModal}>
                            Закрыть
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
