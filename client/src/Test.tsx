import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import axios from 'axios';

const generatePDF = (): Promise<string> => {
  return new Promise((resolve) => {
    console.log("hhhh")
    const doc = new jsPDF();

    doc.text('salam mohcine ', 10, 10);
    

    const pdfData = doc.output('datauristring'); // Base64-encoded PDF
    const base64String = pdfData.split(',')[1]; // Extract base64 part
    resolve(base64String);
  });
};

const uploadPDF = async (pdfBase64: string) => {
  const token = localStorage.getItem('token');

  try {
    await axios.post('http://localhost:7070/api/consultant/sendInvoiceToClient', 
      { pdf: pdfBase64 , email :"mohcintahimi@gmail.com",userName : "echcho"}, 
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
        },
      }
    );
    alert('PDF sent successfully!');
  } catch (error) {
    console.error('Error uploading PDF:', error);
    alert('Failed to send PDF.');
  }
};

const Test: React.FC = () => {
  console.log("hello")
  const handleGenerateAndUpload = async () => {
    const pdfBase64 = await generatePDF();
    await uploadPDF(pdfBase64);
  };

  return (
    <button onClick={handleGenerateAndUpload}>Generate and Upload PDF</button>
  );
};

export default Test;
