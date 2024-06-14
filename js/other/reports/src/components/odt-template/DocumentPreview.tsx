// src/components/DocumentPreview.js
import React from 'react';

const DocumentPreview = ({ htmlContent, onMarkPosition }) => {
    const handleClick = (e) => {
        const position = { x: e.clientX, y: e.clientY };
        onMarkPosition(position);
    };

    return (
        <div
            onClick={handleClick}
            dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
    );
};

export default DocumentPreview;
