import React, { useRef, useState } from 'react';
import Modal from 'react-modal';
import SignatureCanvas from 'react-signature-canvas';
import { useProductContext } from '../../contexts/ProductContext';
import axios from 'axios'
import useLocalStorage from '../../hooks/useLocalStorage';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';









interface Product {
  id: number;
  name: string;
  description: string;
  format: string;
  price: number;
  imageSrc: string;
  imageAlt: string;
  category: string;
  quantities: number[];
  basicQuantities: number[];
}

interface TransformedProduct {
  name: string;
  quantity: number[];
  price: number;
}

interface ProductsByCategory {
  [category: string]: TransformedProduct[];
}




interface EmailSignatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (email: string, signatureData: string | null) => void;
  initialEmail: string;
}
const EmailSignatureModal: React.FC<EmailSignatureModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  initialEmail,
}) => {
  const [email, setEmail] = useState(initialEmail);
  const [signatureData, setSignatureData] = useState<string | null>(null);
  const signatureRef = useRef<SignatureCanvas>(null);
  const { clientId } = useParams<{ clientId: string }>();
  const { updateClient, products , nombreOfLivraison} = useProductContext(); // Use context to update client

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSaveSignature = () => {
    if (signatureRef.current) {
      const dataUrl = signatureRef.current.toDataURL();
      setSignatureData(dataUrl);
    }
  };



  const productsByCategory = (): ProductsByCategory => {
    const newproducts: ProductsByCategory = {}; 
    try {
      console.log(products)
      products.forEach((product) => {

        let sommeofcommands = 0;
        for (let i = 0; i < nombreOfLivraison; i++) {
          sommeofcommands += product.quantities[i];
        }

        if (sommeofcommands === 0) {
          return;
        }

        if (!newproducts[product.category]) {
          newproducts[product.category] = [
            { name: product.name, quantity: product.quantities, price: product.price },
          ];
        } else {
          newproducts[product.category].push({
            name: product.name,
            quantity: product.quantities,
            price: product.price,
          }); // Corrected syntax error
        }
      });

      return newproducts;
    } catch (err) {
      console.error(err)
    }
    return newproducts;
  };



  const handleConfirm = async () => {
    handleSaveSignature()
    updateClient({ email, signature: signatureData });

    try {
      const token = localStorage.getItem('token');
      const productsByCategoris = productsByCategory();
      console.log(productsByCategoris)
      const dataToSend = { clientId: clientId, object: {"NL" : nombreOfLivraison , products : productsByCategoris} }

      await axios.post("http://localhost:7070/api/consultant/createCommand", dataToSend, {
        headers: {
          Authorization: `Bearer ${token}`
        }

      })
      toast.success("Command created successfully!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
      onConfirm(email, signatureData);
      onClose();
    } catch {

      toast.error("Error creating Command!!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Email and Signature Modal"
      className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75"
      overlayClassName="fixed inset-0"
      ariaHideApp={false}
    >
      <div className="bg-white p-6 rounded shadow-md max-w-lg mx-4">
        <h2 className="text-lg font-semibold mb-4">Confirm Email and Sign</h2>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <SignatureCanvas
          ref={signatureRef}
          penColor="black"
          canvasProps={{
            className: 'border border-gray-300',
            width: 600,
            height: 300,
          }}
          backgroundColor="white"
        />

        <div className="mt-4 flex justify-end space-x-2">

          <button
            onClick={handleConfirm}
            className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
          >
            Confirm
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EmailSignatureModal;
