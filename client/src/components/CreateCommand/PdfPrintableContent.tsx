// PdfPrintableContent.tsx
import React from 'react';
import InformationClientpdf from './InformationClientpdf';
import MenuBase from './MenuBase';
import PaymentComponentpdf from './PaymentComponentpdf';
import FormResilation from './FormResilation';
import PdfHead from './PdfHead'
import SummaryTable from './SummaryTable';
import { useProductContext } from '../../contexts/ProductContext';
const PdfPrintableContent: React.FC = () => {

  const {client} = useProductContext();
  return (
    <div>
      <PdfHead />
      <InformationClientpdf />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <ul>
        <li className={`overflow-hidden rounded-md bg-white shadow`}>
          {/* Passing the category to SummaryTable as selectedCategory */}
          <SummaryTable selectedCategory={'BOEUF'} />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </li>
        <li className={`overflow-hidden rounded-md bg-white shadow`}>
          {/* Passing the category to SummaryTable as selectedCategory */}
          <SummaryTable selectedCategory={'POULET'} />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />

        </li>
        <li className={`overflow-hidden rounded-md bg-white shadow`}>
          {/* Passing the category to SummaryTable as selectedCategory */}
          <SummaryTable selectedCategory={'PORC'} />
        </li>
        <li className={`overflow-hidden rounded-md bg-white shadow`}>
          {/* Passing the category to SummaryTable as selectedCategory */}
          <SummaryTable selectedCategory={'POISSON'} />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </li>
        <li className={`overflow-hidden rounded-md bg-white shadow`}>
          {/* Passing the category to SummaryTable as selectedCategory */}
          <SummaryTable selectedCategory={'CONGÉLATEURS'} />
        </li>

      </ul>

      <PaymentComponentpdf />
      <div className='m-40'>
        s
      </div>
      <div className='m-40'>
        s
      </div>

      <FormResilation />


      <img src={client.signature} alt="Client Signature" className="border border-gray-300" />
    </div>

  );
};

export default PdfPrintableContent;
