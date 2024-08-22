import React, { useRef, useState } from 'react';
import { useProductContext } from '../../contexts/ProductContext';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import PdfPrintableContent from './PdfPrintableContent';
import axios from 'axios';

// Tabs definition
const tabs = [
  { name: 'Confirm', href: '#', current: true },
  { name: 'Download PDF', href: '#', current: false },
  { name: 'Send PDF via Email', href: '#', current: false },
  { name: 'Billing', href: '#', current: false },
];

function classNames(...classes: (string | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

const OrderControl: React.FC<{ setIsLoading: React.Dispatch<React.SetStateAction<boolean>> }> = ({ setIsLoading }) => {
  const printRef = useRef<HTMLDivElement | null>(null);
  const [showContent, setShowContent] = useState(false);
  const [currentTab, setCurrentTab] = useState(tabs[0].name); // Track the current tab

  // Get the updateCommandStatus function from context
  const { updateCommandStatus } = useProductContext();

  const handleTabClick = async (tabName: string) => {
    setShowContent(true); // Show content for capturing

    if (tabName === 'Confirm') {
      // Handle command confirmation
      updateCommandStatus(true); // Confirm the command
      alert('Command has been confirmed!'); // Notify user
      setShowContent(false); // Hide content after confirming
    } else if (tabName === 'Download PDF') {
      setTimeout(async () => {
        const pdfBase64 = await generatePDF(); // Generate PDF and get base64 string
        // Automatically download the PDF
        const link = document.createElement('a');
        link.href = `data:application/pdf;base64,${pdfBase64}`;
        link.download = 'document.pdf'; // Specify the download file name
        link.click();
        setShowContent(false); // Hide content after downloading
      }, 1000);
    } else if (tabName === 'Send PDF via Email') {
      setTimeout(async () => {
        const pdfBase64 = await generatePDF(); // Generate PDF and get base64 string
        await uploadPDF(pdfBase64); // Send the PDF via email
        setShowContent(false); // Hide content after sending
      }, 1000);
    } else {
      setShowContent(false); // Hide content if it's another tab
    }

    // Update the current tab state
    setCurrentTab(tabName);
    tabs.forEach(t => t.current = false);
    tabs.find(t => t.name === tabName)!.current = true; // Set the clicked tab as current
  };

  const generatePDF = async (): Promise<string> => {
    if (printRef.current) {
      const canvas = await html2canvas(printRef.current, { scale: 1.75 });
      const imgData = canvas.toDataURL('image/jpeg', 0.85);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const imgWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;
      const pageHeight = pdf.internal.pageSize.getHeight();

      while (heightLeft > 0) {
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        position -= pageHeight;

        if (heightLeft > 0) {
          pdf.addPage();
        }
      }

      const pdfData = pdf.output('datauristring');
      const base64String = pdfData.split(',')[1];
      return base64String;
    }
    throw new Error('Reference to printRef is not available');
  };

  const uploadPDF = async (pdfBase64: string) => {
    const token = localStorage.getItem('token');

    try {
      await axios.post('http://localhost:7070/api/consultant/sendInvoiceToClient',
        { pdf: pdfBase64, email: "ech.chaaraouiamine@gmail.com", userName: "echcho" },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      alert('PDF sent successfully!');
    } catch (error) {
      console.error('Error uploading PDF:', error);
      alert('Failed to send PDF.');
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white shadow-lg">
      {/* Tab Navigation */}
      <div className="hidden sm:block">
        <nav className="isolate flex divide-x divide-gray-200 rounded-lg shadow" aria-label="Tabs">
          {tabs.map((tab, tabIdx) => (
            <button
              key={tab.name}
              className={classNames(
                tab.current ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700',
                tabIdx === 0 ? 'rounded-l-lg' : '',
                tabIdx === tabs.length - 1 ? 'rounded-r-lg' : '',
                'group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10'
              )}
              aria-current={tab.current ? 'page' : undefined}
              onClick={() => handleTabClick(tab.name)} // Handle tab click
            >
              <span>{tab.name}</span>
              <span
                aria-hidden="true"
                className={classNames(
                  tab.current ? 'bg-indigo-500' : 'bg-transparent',
                  'absolute inset-x-0 bottom-0 h-0.5'
                )}
              />
            </button>
          ))}
        </nav>
      </div>

      {/* PdfPrintableContent for PDF Generation */}
      {showContent && (
        <div ref={printRef} style={{ display: 'block', zIndex: -1, position: 'absolute' }}>
          <PdfPrintableContent />
        </div>
      )}
    </div>
  );
};

export default OrderControl;
