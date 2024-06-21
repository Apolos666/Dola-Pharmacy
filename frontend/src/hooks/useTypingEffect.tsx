import { useState, useEffect } from 'react';

export function useTypingEffect(texts: string[], speed = 50, pause = 500) {
    const [displayText, setDisplayText] = useState('');
    const [index, setIndex] = useState(0);
    const [typing, setTyping] = useState(true);
    const [charIndex, setCharIndex] = useState(0);

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        if (typing) {
            if (charIndex < texts[index].length) {
                timeout = setTimeout(() => {
                    setDisplayText((prev) => prev + texts[index][charIndex]);
                    setCharIndex(charIndex + 1);
                }, speed);
            } else {
                timeout = setTimeout(() => setTyping(false), pause);
            }
        } else {
            if (charIndex > 0) {
                timeout = setTimeout(() => {
                    setDisplayText((prev) => prev.slice(0, -1));
                    setCharIndex(charIndex - 1);
                }, speed);
            } else {
                setIndex((prevIndex) => (prevIndex + 1) % texts.length);
                setTyping(true);
            }
        }
        return () => clearTimeout(timeout);
    }, [charIndex, typing, index, texts, speed, pause]);

    return displayText;
}