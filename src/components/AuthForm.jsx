import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import styles from './AuthForm.module.css';

const AuthForm = () => {
    const { login, register } = useContext(AuthContext);

    // Режим: 'login' или 'register'
    const [mode, setMode] = useState('login');

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (mode === 'login') {
            const success = login(username, password);
            if (!success) {
                setError('Неверный логин или пароль');
            }
        } else {
            // Регистрация
            register(username, password);
        }
    };

    return (
        <div className={styles.authContainer}>
            <h2>{mode === 'login' ? 'Вход' : 'Регистрация'}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Логин"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {error && <p className={styles.error}>{error}</p>}

                <button type="submit">
                    {mode === 'login' ? 'Войти' : 'Зарегистрироваться'}
                </button>
            </form>

            {/* Переключатель режимов */}
            {mode === 'login' ? (
                <p>
                    Нет аккаунта?{' '}
                    <span className={styles.link} onClick={() => setMode('register')}>
            Зарегистрироваться
          </span>
                </p>
            ) : (
                <p>
                    Уже есть аккаунт?{' '}
                    <span className={styles.link} onClick={() => setMode('login')}>
            Войти
          </span>
                </p>
            )}
        </div>
    );
};

export default AuthForm;
