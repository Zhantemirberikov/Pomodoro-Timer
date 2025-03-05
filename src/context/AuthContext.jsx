import React, { createContext, useState } from 'react';

// Создаём контекст для авторизации
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Простая проверка (demo).
    // В реальном проекте — отправляйте запрос на сервер.
    const login = (username, password) => {
        // Допустим, логин: "test", пароль: "123"
        if (username === 'test' && password === '123') {
            setUser({ username });
            return true;
        }
        return false;
    };

    // Регистрация (demo) — просто «залогиним» пользователя
    const register = (username, password) => {
        // В реальном приложении — запрос к серверу, хэш пароля и т.д.
        setUser({ username });
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
