import React, { useState } from "react";

const FormResilation = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [contractNumber, setContractNumber] = useState("");
  const [paymentOption, setPaymentOption] = useState("");
  const [concludedDate, setConcludedDate] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [signature, setSignature] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted!");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl mx-auto border border-gray-300">
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
          FORMULAIRE DE RÉSILIATION
        </h1>

        <div className="text-center mb-6">
          <p className="text-lg font-medium text-red-700">
            À remplir par le commerçant
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-800 font-semibold mb-1">
              NOM DU COMMERÇANT
            </label>
            <input
              type="text"
              id="name"
              className="border rounded w-full px-3 py-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block text-gray-800 font-semibold mb-1">
              ADRESSE
            </label>
            <input
              type="text"
              id="address"
              className="border rounded w-full px-3 py-2"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="contact" className="block text-gray-800 font-semibold mb-1">
              CONTACTER À CE NUMÉRO:
            </label>
            <input
              type="text"
              id="contact"
              className="border rounded w-full px-3 py-2"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-800 font-semibold mb-1">
              COURRIEL
            </label>
            <input
              type="email"
              id="email"
              className="border rounded w-full px-3 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="text-center mb-6">
            <p className="text-lg font-medium text-red-700">
              À remplir par le consommateur
            </p>
          </div>

          <div className="mb-4">
            <label htmlFor="date" className="block text-gray-800 font-semibold mb-1">
              DATE D'ENVOI DU FORMULAIRE
            </label>
            <input
              type="date"
              id="date"
              className="border rounded w-full px-3 py-2"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <p className="text-gray-800 font-semibold mb-2">
              En vertu de l’article 59 de la loi sur la protection du consommateur, j’annule le contrat suivant :
            </p>
          </div>

          <div className="mb-4">
            <label htmlFor="contractNumber" className="block text-gray-800 font-semibold mb-1">
              NUMÉRO DE CONTRAT
            </label>
            <input
              type="text"
              id="contractNumber"
              className="border rounded w-full px-3 py-2"
              value={contractNumber}
              onChange={(e) => setContractNumber(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-800 font-semibold mb-1">
              OPTION DE PAIEMENT
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="carteDeCredit"
                  name="paymentOption"
                  value="carteDeCredit"
                  checked={paymentOption === "carteDeCredit"}
                  onChange={(e) => setPaymentOption(e.target.value)}
                  className="form-radio"
                />
                <span>CARTE DE CRÉDIT</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="interac"
                  name="paymentOption"
                  value="interac"
                  checked={paymentOption === "interac"}
                  onChange={(e) => setPaymentOption(e.target.value)}
                  className="form-radio"
                />
                <span>INTERAC</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="financement"
                  name="paymentOption"
                  value="financement"
                  checked={paymentOption === "financement"}
                  onChange={(e) => setPaymentOption(e.target.value)}
                  className="form-radio"
                />
                <span>FINANCEMENT</span>
              </label>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="concludedDate" className="block text-gray-800 font-semibold mb-1">
              CONCLU LE
            </label>
            <input
              type="date"
              id="concludedDate"
              className="border rounded w-full px-3 py-2"
              value={concludedDate}
              onChange={(e) => setConcludedDate(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="customerName" className="block text-gray-800 font-semibold mb-1">
              NOM
            </label>
            <input
              type="text"
              id="customerName"
              className="border rounded w-full px-3 py-2"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="customerAddress" className="block text-gray-800 font-semibold mb-1">
              ADRESSE
            </label>
            <input
              type="text"
              id="customerAddress"
              className="border rounded w-full px-3 py-2"
              value={customerAddress}
              onChange={(e) => setCustomerAddress(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="deliveryDate" className="block text-gray-800 font-semibold mb-1">
              DATE DE LIVRAISON
            </label>
            <input
              type="date"
              id="deliveryDate"
              className="border rounded w-full px-3 py-2"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="signature" className="block text-gray-800 font-semibold mb-1">
              SIGNATURE
            </label>
            <input
              type="text"
              id="signature"
              className="border rounded w-full px-3 py-2"
              value={signature}
              onChange={(e) => setSignature(e.target.value)}
            />
          </div>

          <div className="text-center mt-8">
            <button
              type="submit"
              className="bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700"
            >
              Soumettre
            </button>
          </div>
        </form>
      </div>
      <style jsx>{`
        @media print {
          body, html {
            width: 210mm;
            height: 297mm;
          }
          .container {
            width: 100%;
            max-width: 190mm;
            margin: 0 auto;
            padding: 0;
          }
          .bg-gray-100 {
            background: white;
          }
          .shadow-lg {
            box-shadow: none;
          }
          .border {
            border: none;
          }
          .max-w-4xl {
            max-width: 100%;
          }
          button {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default FormResilation;
