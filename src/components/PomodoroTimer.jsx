import React, { useState, useEffect, useContext, useRef } from 'react';
import { TaskContext } from '../context/TaskContext';
import styles from './PomodoroTimer.module.css';

const PomodoroTimer = ({ theme }) => {
    const { activeTask } = useContext(TaskContext);

    const [musicOn, setMusicOn] = useState(false);
    const workAudio = useRef(new Audio('/workMusic.mp3'));
    const breakAudio = useRef(new Audio('/breakMusic.mp3'));
    const alarmAudio = useRef(new Audio('/alarm.mp3')); // 🔔 Звук будильника

    const [secondsLeft, setSecondsLeft] = useState(25 * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [mode, setMode] = useState('work');

    // ❗ Исправлено: теперь используем `useRef` вместо `useState`, чтобы не было зависимостей
    useEffect(() => {
        workAudio.current.pause();
        workAudio.current.currentTime = 0;
        breakAudio.current.pause();
        breakAudio.current.currentTime = 0;
        alarmAudio.current.pause();
        alarmAudio.current.currentTime = 0;
    }, [musicOn]);

    useEffect(() => {
        let timerId;
        if (isRunning) {
            timerId = setInterval(() => {
                setSecondsLeft((prev) => {
                    if (prev <= 1) {
                        clearInterval(timerId);
                        alert('Время вышло!');
                        setIsRunning(false);
                        workAudio.current.pause();
                        breakAudio.current.pause();
                        alarmAudio.current.play(); // 🎵 Воспроизводим звук тревоги
                        return mode === 'work' ? 5 * 60 : mode === 'short' ? 25 * 60 : 15 * 60;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timerId);
    }, [isRunning, mode]);

    useEffect(() => {
        if (musicOn && isRunning) {
            if (mode === 'work') {
                breakAudio.current.pause();
                breakAudio.current.currentTime = 0;
                workAudio.current.play().catch(err => console.error('workAudio error:', err));
            } else {
                workAudio.current.pause();
                workAudio.current.currentTime = 0;
                breakAudio.current.play().catch(err => console.error('breakAudio error:', err));
            }
        } else {
            workAudio.current.pause();
            breakAudio.current.pause();
        }
    }, [musicOn, isRunning, mode]);

    const formatTime = (secs) => {
        const m = Math.floor(secs / 60);
        const s = secs % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    const startPauseHandler = () => {
        setIsRunning(!isRunning);
    };

    const resetHandler = () => {
        setIsRunning(false);
        if (mode === 'work') setSecondsLeft(25 * 60);
        if (mode === 'short') setSecondsLeft(5 * 60);
        if (mode === 'long') setSecondsLeft(15 * 60);
        workAudio.current.pause();
        breakAudio.current.pause();
        alarmAudio.current.pause();
        alarmAudio.current.currentTime = 0;
    };

    const switchMode = (newMode) => {
        setMode(newMode);
        setIsRunning(false);
        if (newMode === 'work') setSecondsLeft(25 * 60);
        if (newMode === 'short') setSecondsLeft(5 * 60);
        if (newMode === 'long') setSecondsLeft(15 * 60);
        workAudio.current.pause();
        breakAudio.current.pause();
    };

    const toggleMusic = () => {
        setMusicOn(!musicOn);
    };

    const increaseTime = () => {
        setSecondsLeft(prev => prev + 60);
    };

    const decreaseTime = () => {
        setSecondsLeft(prev => (prev > 10 ? prev - 60 : prev)); // ⏳ Минимум 10 секунд!
    };

    return (
        <div className={theme === 'dark' ? styles.timerContainerDark : styles.timerContainerLight}>
            <div className={styles.modeTabs}>
                <button className={`${styles.tabButton} ${mode === 'work' ? styles.activeTab : ''}`} onClick={() => switchMode('work')}>
                    Pomodoro
                </button>
                <button className={`${styles.tabButton} ${mode === 'short' ? styles.activeTab : ''}`} onClick={() => switchMode('short')}>
                    Short Break
                </button>
                <button className={`${styles.tabButton} ${mode === 'long' ? styles.activeTab : ''}`} onClick={() => switchMode('long')}>
                    Long Break
                </button>
            </div>

            <div className={styles.gifContainer}>
                {mode === 'work' ? (
                    isRunning ? (
                        <img src="/7Ltd.gif" alt="Running GIF" className={styles.timerGif} />
                    ) : (
                        <img src="/GIGf.gif" alt="Stopped GIF" className={styles.timerGif} />
                    )
                ) : (
                    isRunning ? (
                        <img src="/Gena.gif" alt="Break Running GIF" className={styles.timerGif} />
                    ) : (
                        <img src="/GIGf.gif" alt="Break Stopped GIF" className={styles.timerGif} />
                    )
                )}
            </div>

            <div className={styles.timeControl}>
                <button className={styles.arrowButton} onClick={decreaseTime} disabled={secondsLeft <= 10}>-</button>
                <div className={styles.timeDisplay}>{formatTime(secondsLeft)}</div>
                <button className={styles.arrowButton} onClick={increaseTime}>+</button>
            </div>

            <div className={styles.buttons}>
                <button onClick={startPauseHandler}>{isRunning ? 'Пауза' : 'Старт'}</button>
                <button onClick={resetHandler}>Сброс</button>
                <button onClick={toggleMusic}>{musicOn ? 'Музыка: Вкл' : 'Музыка: Выкл'}</button>
            </div>

            {activeTask && (
                <div className={styles.activeTask}>
                    <p># {activeTask.title}</p>
                </div>
            )}
        </div>
    );
};

export default PomodoroTimer;
