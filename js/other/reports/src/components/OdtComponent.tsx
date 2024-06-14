import React, { useState, useRef } from 'react';
import JSZip from 'jszip';
import { DOMParser, XMLSerializer } from 'xmldom';
import html2canvas from 'html2canvas';
function OdtComponent(props) {
    const [file, setFile] = useState(null);
    const [imageSize, setImageSize] = useState({ width: 4, height: 3 }); // cm
    const imageRef = useRef(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleGenerateImage = async () => {
        const canvas = await html2canvas(imageRef.current);
        const dataUrl = canvas.toDataURL('image/png');
        const base64Image = dataUrl.split(',')[1];
        return base64Image;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (file && imageRef.current) {
            const base64Image = await handleGenerateImage();

            const zip = new JSZip();
            const content = await file.arrayBuffer();
            const loadedZip = await zip.loadAsync(content);
            const contentXml = await loadedZip.file('content.xml').async('text');

            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(contentXml, 'application/xml');

            // Поиск и вставка изображения в XML
            const paragraphs = xmlDoc.getElementsByTagName('text:p');
            for (let i = 0; i < paragraphs.length; i++) {
                const paragraph = paragraphs[i];
                if (paragraph.textContent.includes('{{image_placeholder}}')) {
                    paragraph.textContent = ''; // Очищаем текстовое содержимое

                    // Создаем элемент для изображения
                    const drawFrame = xmlDoc.createElement('draw:frame');
                    drawFrame.setAttribute('draw:name', 'Image1');
                    drawFrame.setAttribute('text:anchor-type', 'as-char');
                    drawFrame.setAttribute('svg:width', `${imageSize.width}cm`);
                    drawFrame.setAttribute('svg:height', `${imageSize.height}cm`);

                    const drawImage = xmlDoc.createElement('draw:image');
                    drawImage.setAttribute('xlink:href', 'Pictures/react_image.png');
                    drawImage.setAttribute('xlink:type', 'simple');
                    drawImage.setAttribute('xlink:show', 'embed');
                    drawImage.setAttribute('xlink:actuate', 'onLoad');

                    drawFrame.appendChild(drawImage);
                    paragraph.appendChild(drawFrame);
                }
            }

            const serializer = new XMLSerializer();
            const newContentXml = serializer.serializeToString(xmlDoc);

            // Обновление файла манифеста
            const manifestXml = await loadedZip.file('META-INF/manifest.xml').async('text');
            const manifestDoc = parser.parseFromString(manifestXml, 'application/xml');
            const manifestRoot = manifestDoc.documentElement;

            const newFileEntry = manifestDoc.createElement('manifest:file-entry');
            newFileEntry.setAttribute('manifest:media-type', 'image/png');
            newFileEntry.setAttribute('manifest:full-path', 'Pictures/react_image.png');
            manifestRoot.appendChild(newFileEntry);

            const newManifestXml = serializer.serializeToString(manifestDoc);
            loadedZip.file('META-INF/manifest.xml', newManifestXml);

            // Обновление архива с новым контентом
            loadedZip.file('content.xml', newContentXml);
            loadedZip.file('Pictures/react_image.png', base64Image, { base64: true });
            const newZipContent = await loadedZip.generateAsync({ type: 'blob', mimeType: 'application/vnd.oasis.opendocument.text' });

            const url = window.URL.createObjectURL(newZipContent);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'edited_template.odt');
            document.body.appendChild(link);
            link.click();
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} />
                <button type="submit">Upload and Process</button>
            </form>
            <div ref={imageRef} style={{ display: 'block', width: '200px', height: '150px', backgroundColor: 'lightblue', textAlign: 'center', lineHeight: '150px', position: "absolute", left: 1000 }}>
                React Image
            </div>
        </div>
    );
}

export default OdtComponent;
