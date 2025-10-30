// src/pages/PdfToDoc.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FeatureHeader from "../components/FeatureHeader";
import Footer from "../components/Footer";
import "./PdfToDoc.css";
const downloadBase64File = (base64, fileName) => {
    const link = document.createElement("a");
    link.href = `data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,${base64}`;
    link.download = fileName || "converted.docx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

export default function PdfToDoc() {
    const [file, setFile] = useState(null);
    const [convertedFile, setConvertedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setConvertedFile(null);
    };

    const handleConvert = async () => {
        if (!file) return alert("Please upload a PDF file first!");
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("File", file);

            const response = await fetch(
                `https://v2.convertapi.com/convert/pdf/to/docx?Secret=${import.meta.env.VITE_CONVERTAPI_KEY}`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            const data = await response.json();

            if (data.Files && data.Files.length > 0) {
                const fileData = data.Files[0];
                setConvertedFile({
                    url: fileData.Url || null,
                    FileData: fileData.FileData || null,
                    name: fileData.FileName,
                });

                // Optional: store in localStorage for later access
                localStorage.setItem("lastConvertedFile", JSON.stringify(fileData));
            } else {
                alert("Conversion failed. Please try again.");
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong during conversion.");
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = () => {
        if (!convertedFile) return;

        if (convertedFile.url) {
            // Use hosted URL
            const link = document.createElement("a");
            link.href = convertedFile.url;
            link.download = convertedFile.name || "converted.docx";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else if (convertedFile.FileData) {
            // Use Base64 data
            downloadBase64File(convertedFile.FileData, convertedFile.name);
        }
    };

    return (
        <>
            <FeatureHeader />

            <main className="pdf-doc-page">
                <div className="left-section">
                    <h1>Upload a PDF & Generate a DOC</h1>
                    <p>Transform your PDF into an editable Word document in seconds.</p>

                    <div className="utility-buttons">
                        <button className="switch-btn" onClick={() => navigate("/doc-to-pdf")}>
                            Go to DOC → PDF Converter
                        </button>

                        <button className="switch-btn alt" onClick={() => navigate("/pdf-summarizer")}>
                            Go to PDF Summarizer
                        </button>
                    </div>
                </div>

                <div className="right-section">
                    <div className="upload-box">
                        <label className="file-label">
                            <input
                                type="file"
                                accept=".pdf"
                                onChange={handleFileChange}
                                className="file-input"
                            />
                            {file ? file.name : "Click to Upload PDF"}
                        </label>

                        <button
                            className="convert-btn"
                            onClick={handleConvert}
                            disabled={!file || loading}
                        >
                            {loading ? "Converting..." : "Convert to DOC"}
                        </button>

                        {convertedFile && (
                            <div className="result">
                                <p>✅ Conversion Complete! Your DOC file is ready.</p>
                                <br />
                                <button className="download-btn" onClick={handleDownload}>
                                    Download {convertedFile.name}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}
