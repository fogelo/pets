// CanvasEditor.js
import React, { useRef, useEffect, useState } from 'react';

function CanvasEditor() {
    const canvasRef = useRef(null);
    const [text, setText] = useState('');
    const [caretPos, setCaretPos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.font = '16px Arial';
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillText(text, 10, 50);
    }, [text]);

    const handleKeyDown = (e) => {
        if (e.key.length === 1) {
            setText((prev) => prev + e.key);
        } else if (e.key === 'Backspace') {
            setText((prev) => prev.slice(0, -1));
        }
        // Обновление позиции каретки
        // Примерный расчет, зависит от шрифта и размера текста
        setCaretPos({ x: text.length * 8 + 10, y: 50 });
    };

    return (
        <canvas
            ref={canvasRef}
            width={800}
            height={600}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            style={{ border: '1px solid black' }}
        />
    );
}

export default CanvasEditor;
