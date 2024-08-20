import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import PdfPrintableContent from './PdfPrintableContent';

const tabs = [
  { name: 'My Account', href: '#', current: true },
  { name: 'Company', href: '#', current: false },
  { name: 'Generate pdf', href: '#', current: false },
  { name: 'Billing', href: '#', current: false },
];

function classNames(...classes: (string | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

const OrderControl: React.FC = () => {
  const printRef = useRef<HTMLDivElement | null>(null);
  const [showContent, setShowContent] = useState(false);

  const handleDownloadPdf = async () => {
    setShowContent(true); // Show content for capturing

    // Wait for a short duration to allow components to render
    setTimeout(async () => {
      if (printRef.current) {
        const canvas = await html2canvas(printRef.current, { scale: 2 }); // Use a higher scale for better quality
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4',
        });

        const imgWidth = pdf.internal.pageSize.getWidth(); // A4 width
        const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio
        let heightLeft = imgHeight; // Remaining height to add to the PDF

        // Add the image to the PDF until it fits
        let position = 0;
        const pageHeight = pdf.internal.pageSize.getHeight(); // A4 height

        // Loop to add images to new pages
        while (heightLeft > 0) {
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight; // Reduce remaining height
          position -= pageHeight; // Move position up for next page

          // Add a new page if there's more content
          if (heightLeft > 0) {
            pdf.addPage();
          }
        }

        pdf.save('download.pdf');
      }
      setShowContent(false); // Hide content after download
    }, 500); // Adjust the delay as needed
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white shadow-lg">
      {/* Tab Navigation */}
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          defaultValue={tabs.find((tab) => tab.current)?.name}
        >
          {tabs.map((tab) => (
            <option key={tab.name} value={tab.name}>
              {tab.name}
            </option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <nav className="isolate flex divide-x divide-gray-200 rounded-lg shadow" aria-label="Tabs">
          {tabs.map((tab, tabIdx) => (
            <a
              key={tab.name}
              href={tab.href}
              className={classNames(
                tab.current ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700',
                tabIdx === 0 ? 'rounded-l-lg' : '',
                tabIdx === tabs.length - 1 ? 'rounded-r-lg' : '',
                'group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10'
              )}
              aria-current={tab.current ? 'page' : undefined}
            >
              <span>{tab.name}</span>
              <span
                aria-hidden="true"
                className={classNames(
                  tab.current ? 'bg-indigo-500' : 'bg-transparent',
                  'absolute inset-x-0 bottom-0 h-0.5'
                )}
              />
            </a>
          ))}
        </nav>
      </div>
      <div className="p-4">
        <button
          onClick={handleDownloadPdf}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600"
        >
          Download PDF
        </button>
      </div>
      {/* PdfPrintableContent for PDF Generation */}
      {showContent && (
        <div ref={printRef} >
          <PdfPrintableContent />
        </div>
      )}
    </div>
  );
};

export default OrderControl;
