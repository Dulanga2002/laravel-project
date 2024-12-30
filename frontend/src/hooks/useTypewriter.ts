import { useState, useEffect } from 'react';

export function useTypewriter(text: string, speed: number = 50, delay: number = 0) {
    const [displayText, setDisplayText] = useState('');

    useEffect(() => {
        const timeout = setTimeout(() => {
            let currentIndex = 0;
            const interval = setInterval(() => {
                if (currentIndex <= text.length) {
                    setDisplayText(text.slice(0, currentIndex));
                    currentIndex++;
                } else {
                    clearInterval(interval);
                }
            }, speed);

            return () => clearInterval(interval);
        }, delay);

        return () => clearTimeout(timeout);
    }, [text, speed, delay]);

    return displayText;
}
