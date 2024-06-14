import React, {useState} from "react";
import JSZip from "jszip";
import {DOMParser, XMLSerializer} from "xmldom";

function Ods() {
    const [file, setFile] = useState(null);
    const [values, setValues] = useState({});

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleInputChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (file) {
            const zip = new JSZip();
            const content = await file.arrayBuffer();
            const loadedZip = await zip.loadAsync(content);
            const contentXml = await loadedZip.file("content.xml").async("text");

            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(contentXml, "application/xml");

            // Поиск и замена значений в XML
            const cells = xmlDoc.getElementsByTagName("table:table-cell");
            console.log(xmlDoc, cells)

            for (let i = 0; i < cells.length; i++) {
                const cell = cells[i];
                const textNode = cell.getElementsByTagName("text:p")[0];
                if (textNode && textNode.textContent.includes("{{placeholder}}")) {
                    textNode.textContent = textNode.textContent.replace("{{placeholder}}", values.placeholder);
                }
            }

            const serializer = new XMLSerializer();
            const newContentXml = serializer.serializeToString(xmlDoc);

            loadedZip.file("content.xml", newContentXml);
            const newZipContent = await loadedZip.generateAsync({type: "blob"});

            const url = window.URL.createObjectURL(newZipContent);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "edited_template.ods");
            document.body.appendChild(link);
            link.click();
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange}/>
                <input type="text" name="placeholder" onChange={handleInputChange}/>
                <button type="submit">Upload and Process</button>
            </form>
        </div>
    );
}

export default Ods;
