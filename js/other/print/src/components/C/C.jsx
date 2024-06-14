import "./C.css";
import jsPDF from "jspdf";

const C = () => {
    const generatePDF = () => {
        const doc = new jsPDF();
        const htmlString = '<div style="color: red">hello</div>';
        const specialElementHandlers = {
            // Handler for the special elements
            '#editor': function (element, renderer) {
                return true;
            }
        };

        doc.html(htmlString, {
            callback: function (doc) {
                doc.save('document.pdf');
            },
            x: 10,
            y: 10,
            width: 180, // max width of content on PDF
            windowWidth: 650 // width of HTML window
        });
    };

    return (
        <div>
            <button onClick={generatePDF}>Generate PDF</button>
        </div>
    );
};


export default C
