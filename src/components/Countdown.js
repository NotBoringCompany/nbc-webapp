import { Text } from '@mantine/core';
import { useEffect, useState } from 'react';

const CountdownTimer = ({ targetTime }) => {
    const calculateRemainingTime = () => {
        const now = new Date().getTime();
        const distance = targetTime - now;

        const total = distance <= 0 ? 0 : distance;
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        return { total, days, hours, minutes, seconds };
    }

    const [remainingTime, setRemainingTime] = useState(0);
    const [timerEnded, setTimerEnded] = useState(false);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setRemainingTime(calculateRemainingTime());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        if (remainingTime.total <= 0) {
            setTimerEnded(true);
        }

    }, [remainingTime])

    if (timerEnded) {
        return <Text sx={(theme) => ({ fontSize: 48, fontWeight: 400, color: '#42ca9f' })}>00:00:00:00</Text>
    }

    return (
        <>
            <Text
                sx={(theme) => ({
                    fontSize: 48,
                    fontWeight: 400,
                    color: '#42ca9f',
                })}
            >
                {String(remainingTime.days).padStart(2, '0')}:{String(remainingTime.hours).padStart(2, '0')}:{String(remainingTime.minutes).padStart(2, '0')}:{String(remainingTime.seconds).padStart(2, '0')}
            </Text>
        </>
    )
}

export default CountdownTimer