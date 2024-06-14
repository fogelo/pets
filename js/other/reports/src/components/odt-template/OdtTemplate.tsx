// src/App.js
import React, { useState } from 'react';
import FileUpload from './FileUpload';
import DocumentPreview from './DocumentPreview';

function App() {
    const [htmlContent, setHtmlContent] = useState('');
    const [dynamicDataPositions, setDynamicDataPositions] = useState([]);

    const handleFileUpload = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target.result;
            // Обычно здесь отправляется контент на бекенд для конвертации из ODT в HTML и получения HTML контента
            // Пока что установим placeholder
            setHtmlContent('<p>Здесь будет конвертированный HTML контент</p>');
        };
        reader.readAsText(file);
    };

    const handleMarkPosition = (position) => {
        setDynamicDataPositions([...dynamicDataPositions, position]);
    };

    return (
        <div>
            <FileUpload onFileUpload={handleFileUpload} />
            <DocumentPreview htmlContent={htmlContent} onMarkPosition={handleMarkPosition} />
            <div>
                <h3>Отмеченные позиции:</h3>
                <pre>{JSON.stringify(dynamicDataPositions, null, 2)}</pre>
            </div>
        </div>
    );
}

export default App;
