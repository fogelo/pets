import React, { useState } from 'react';
import JSZip from 'jszip';
import { DOMParser, XMLSerializer } from 'xmldom';


type Props = {

};

export function OdtImage(props: Props) {
    const [file, setFile] = useState(null);
    const [image, setImage] = useState(null);
    const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
    const [maxWidth, setMaxWidth] = useState(4); // cm, можно изменять в зависимости от необходимости
    const [maxHeight, setMaxHeight] = useState(0); // cm, 0 значит не изменять этот параметр

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleImageChange = (e) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                let width = img.width / 37.795; // Convert pixels to cm (1 cm ≈ 37.795 pixels)
                let height = img.height / 37.795; // Convert pixels to cm

                if (maxWidth > 0 && maxHeight === 0) {
                    // Если задана только ширина
                    height = (maxWidth / width) * height;
                    width = maxWidth;
                } else if (maxHeight > 0 && maxWidth === 0) {
                    // Если задана только высота
                    width = (maxHeight / height) * width;
                    height = maxHeight;
                } else if (maxWidth > 0 && maxHeight > 0) {
                    // Если заданы оба параметра, изменяем пропорционально
                    if (width > maxWidth) {
                        height = (maxWidth / width) * height;
                        width = maxWidth;
                    }

                    if (height > maxHeight) {
                        width = (maxHeight / height) * width;
                        height = maxHeight;
                    }
                }

                setImageSize({ width, height });
                setImage(event.target.result.split(',')[1]); // Получаем Base64 код изображения
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (file && image) {
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
                    drawImage.setAttribute('xlink:href', 'Pictures/image.png');
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
            newFileEntry.setAttribute('manifest:full-path', 'Pictures/image.png');
            manifestRoot.appendChild(newFileEntry);

            const newManifestXml = serializer.serializeToString(manifestDoc);
            loadedZip.file('META-INF/manifest.xml', newManifestXml);

            // Обновление архива с новым контентом
            loadedZip.file('content.xml', newContentXml);
            loadedZip.file('Pictures/image.png', image, { base64: true });
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
                <input type="file" onChange={handleImageChange} />
                <button type="submit">Upload and Process</button>
            </form>
        </div>
    );
}
