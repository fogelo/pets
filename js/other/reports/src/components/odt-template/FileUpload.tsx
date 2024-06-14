// src/components/FileUpload.js
import React, { useState } from 'react';

const FileUpload = ({ onFileUpload }) => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleFileUpload = () => {
        if (file) {
            onFileUpload(file);
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} accept=".odt" />
            <button onClick={handleFileUpload}>Загрузить</button>
        </div>
    );
};

export default FileUpload;
