import React, {useState} from "react";
import JSZip from "jszip";
import {DOMParser, XMLSerializer} from "xmldom";

const OdtTable = () => {
    const [file, setFile] = useState(null);
    const [tableData, setTableData] = useState([
        ["Header 1", "Header 2", "Header 3"],
        ["Row 1 Col 1", "Row 1 Col 2", "Row 1 Col 3"],
        ["Row 2 Col 1", "Row 2 Col 2", "Row 2 Col 3"]
    ]);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
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

            // Создание таблицы
            const table = xmlDoc.createElement("table:table");
            table.setAttribute("table:name", "NewTable");

            tableData.forEach((rowData) => {
                const row = xmlDoc.createElement("table:table-row");
                rowData.forEach((cellData) => {
                    const cell = xmlDoc.createElement("table:table-cell");
                    const cellText = xmlDoc.createElement("text:p");
                    cellText.textContent = cellData;
                    cell.appendChild(cellText);
                    row.appendChild(cell);
                });
                table.appendChild(row);
            });

            // Добавление таблицы в XML
            const body = xmlDoc.getElementsByTagName("office:text")[0];
            body.appendChild(table);

            const serializer = new XMLSerializer();
            const newContentXml = serializer.serializeToString(xmlDoc);

            loadedZip.file("content.xml", newContentXml);
            const newZipContent = await loadedZip.generateAsync({
                type: "blob",
                mimeType: "application/vnd.oasis.opendocument.text"
            });

            const url = window.URL.createObjectURL(newZipContent);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "edited_template.odt");
            document.body.appendChild(link);
            link.click();
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange}/>
                <button type="submit">Upload and Process</button>
            </form>
        </div>
    );
};

export default OdtTable;
