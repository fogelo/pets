import React, {useState} from "react";
import * as XLSX from "xlsx";

const OdsUploader = () => {
    const [data, setData] = useState([]);
    const [editCell, setEditCell] = useState({row: null, col: null});
    const [newValue, setNewValue] = useState("");

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (event) => {

            const arrayBuffer = event.target.result;
            const workbook = XLSX.read(arrayBuffer, {type: "array"});
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, {header: 1});
            setData(jsonData);
        };

        reader.readAsArrayBuffer(file);
    };

    const handleCellClick = (rowIndex, colIndex) => {
        setEditCell({row: rowIndex, col: colIndex});
        setNewValue(data[rowIndex][colIndex] || "");
    };

    const handleInputChange = (e) => {
        setNewValue(e.target.value);
    };

    const handleSave = () => {
        const updatedData = [...data];
        updatedData[editCell.row][editCell.col] = newValue;
        setData(updatedData);
        setEditCell({row: null, col: null});
    };

    const handleFileDownload = () => {
        const ws = XLSX.utils.aoa_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        XLSX.writeFile(wb, "updated_file.ods");
    };

    return (
        <div>
            <input type="file" accept=".ods" onChange={handleFileUpload}/>
            {data.length > 0 && (
                <div>
                    <table>
                        <thead>
                        <tr>
                            {data[0].map((cell, index) => (
                                <th key={index}>{cell}</th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {data.slice(1).map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {row.map((cell, cellIndex) => (
                                    <td
                                        key={cellIndex}
                                        onClick={() => handleCellClick(rowIndex + 1, cellIndex)}
                                        style={{cursor: "pointer"}}
                                    >
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    {editCell.row !== null && (
                        <div>
                            <input
                                type="text"
                                value={newValue}
                                onChange={handleInputChange}
                            />
                            <button onClick={handleSave}>Save</button>
                        </div>
                    )}
                    <button onClick={handleFileDownload}>Download Updated File</button>
                </div>
            )}
        </div>
    );
};

export default OdsUploader;
