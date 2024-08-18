// PdfPrintableContent.tsx
import React from 'react';
import InformationClient from './InformationClient';
import MenuBase from './MenuBase';
import PaymentComponent from './PaymentComponent';
import FormResilation from './FormResilation';

const PdfPrintableContent: React.FC = () => {
  return (
    <div>
      <InformationClient />
      <MenuBase />
      <PaymentComponent />
      <FormResilation />
    </div>
  );
};

export default PdfPrintableContent;
