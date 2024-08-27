import React, { useState, useRef, useEffect } from 'react';
import { useProductContext } from '../contexts/ProductContext';
import LivraisonButtons from '../components/CreateCommand/LivraisonButtons';
import ListofProducts from '../components/CreateCommand/ListofProducts';
import NavbarCommande from '../components/CreateCommand/NavbarCommande';
import ResumeBon from '../components/CreateCommand/ResumeBon';
import InformationClient from '../components/CreateCommand/InformationClient';
import ButtonDivider from '../components/CreateCommand/ButtonDivider';
import FraisMention from '../components/CreateCommand/FraisMention';
import PaymentComponent from '../components/CreateCommand/PaymentComponent';
import MenuBase from '../components/CreateCommand/MenuBase';
import ModalResume from '../components/CreateCommand/ModalResume';
import FoodCategory from '../components/CreateCommand/FoodCategory';
import ResetButton from '../components/CreateCommand/ResetButton';
import ResetToBasicButton from '../components/CreateCommand/ResetToBasicButtonProps';
import FormResilation from '../components/CreateCommand/FormResilation';
import OrderControl from '../components/CreateCommand/OrderControl';
import FoodServiceSummary from '../components/CreateCommand/FoodServiceSummary';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PdfPrintableContent from '../components/CreateCommand/PdfPrintableContent';
import { useNavigate } from 'react-router-dom';

import '../components/CreateCommand/tailwind.output.css';
import GlobalLoader from '../common/Loader/GlobalLoader';


interface Title {
  step: number;
  category: string;
  icon: string;
  title: string;
  description: string;
}

const CreateCommande: React.FC = () => {
  const printRef = useRef<HTMLDivElement | null>(null);
  const { updateClient } = useProductContext();
  const [selectedCategory, setSelectedCategory] = useState<string>('BOEUF');
  const [isInfoVisible, setIsInfoVisible] = useState<boolean>(true);
  const [isFraisMentionVisible, setIsFraisMentionVisible] = useState<boolean>(true);
  const [isPaymentVisible, setIsPaymentVisible] = useState<boolean>(true);
  const [isMenuBase, setIsMenuBase] = useState<boolean>(true);
  const [isFormulaire, setIsFormulaire] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isfirstLoading, setIsfirstLoading] = useState<boolean>(false);
  const { clientId } = useParams<{ clientId: string }>(); // Get the id from the URL params
  const navigate = useNavigate();


  useEffect(() => {
    const fetchClientData = async () => {
      console.log("i am fetching and reintialize state")
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          throw new Error('No token available');
        }

        const response = await axios.get(`http://localhost:7070/api/consultant/getClientById/${clientId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const data = response.data;
        updateClient(data); // Update the context with the fetched client data
        setIsLoading(false);
        setIsfirstLoading(true)
      } catch (error) {
        console.error(error);
        navigate("/")
      }
    };

    fetchClientData();
  }, []);
  const titles: Title[] = [
    {
      step: 1,
      category: 'BOEUF',
      icon: '🐄',
      title: "BOEUF CANADIEN DE L'OUEST",
      description: "Passionnés par l’alimentation, les défis et l’action, nous sommes fières de compter plus de 25 années combinées d'expertise dans le domaine alimentaire animés par le désir de répondre à vos besoins alimentaires essentiels."
    },
    {
      step: 2,
      category: 'POULET',
      icon: '🐔',
      title: "POULET DE GRAINREFROIDIT À L'AIR",
      description: "Nous sélectionnons des poulets nourris aux grains, refroidis à l'air, pour garantir une qualité supérieure et un goût authentique."
    },
    {
      step: 3,
      category: 'PORC',
      icon: '🐖',
      title: "JEUNE PORC DU QUÉBEC/CANADA",
      description: "Nos porcs sont élevés dans des conditions respectueuses pour assurer une viande tendre et savoureuse."
    },
    {
      step: 4,
      category: 'POISSON',
      icon: '🐟',
      title: "PÊCHERIE RESPONSABLE",
      description: "Nous privilégions des pêcheries responsables pour vous offrir des produits de la mer de qualité, tout en respectant l'environnement."
    },
    {
      step: 5,
      category: 'ÉPICERIE',
      icon: '🛒',
      title: "ÉPICERIE",
      description: "Découvrez notre sélection d'épicerie fine pour accompagner vos plats et régaler vos papilles."
    },
    {
      step: 6,
      category: 'CONGÉLATEURS',
      icon: '❄️',
      title: "CONGÉLATEURS",
      description: "Vous avez besoin d'un congélateur ? Voici les modèles que nous vous offrons."
    },
  ];

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const toggleFormulaire = () => {
    setIsFormulaire(prev => !prev);
  };

  const toggleMenuBase = () => {
    setIsMenuBase(prev => !prev);
  };

  const toggleInformationClient = () => {
    setIsInfoVisible(prev => !prev);
  };

  const togglePayment = () => {
    setIsPaymentVisible(prev => !prev);
  };

  const toggleFraisMention = () => {
    setIsFraisMentionVisible(prev => !prev);
  };

  // Find the title object that matches the selected category
  const selectedTitle = titles.find(title => title.category === selectedCategory);


  return (
    <div className="bg-white">



      {isLoading ? (
        <GlobalLoader /> // Show loader while fetching data
      ) : (
        <>
          <NavbarCommande onCategoryChange={handleCategoryChange} />
          {selectedCategory !== 'FIN' && selectedTitle && (
            <>
              <br />
              <br />

              <br />
              <div className="flex justify-between items-center my-4 px-6">
                <LivraisonButtons />
                <div className="flex space-x-4">
                  <ResetButton category={selectedCategory} />
                  <ResetToBasicButton category={selectedCategory} />
                </div>
              </div>
              <FoodCategory
                icon={selectedTitle.icon}
                step={selectedTitle.step.toString()}
                title={selectedTitle.title}
                description={selectedTitle.description}
                note="VEUILLEZ NOTER QUE LES IMAGES SONT À TITRES INDICATIVES SEULEMENT. MERCI"
              />
              <ListofProducts category={selectedCategory} />
              <ModalResume />
            </>
          )}

          {selectedCategory === 'FIN' && (
            <>
              <ResumeBon />

              <ButtonDivider
                onClick={toggleInformationClient}
                title="Information du Client"
                className={`my-3 hover:bg-gray-200 transition duration-300 ${isInfoVisible ? 'bg-blue-100' : ''}`}
              />
              {isInfoVisible && <InformationClient />}

              <ButtonDivider
                onClick={toggleMenuBase}
                title="Open Menu"
                className={`my-3 hover:bg-gray-200 transition duration-300 ${isMenuBase ? 'bg-blue-100' : ''}`}
              />
              {isMenuBase && <MenuBase />}

              <ButtonDivider
                onClick={toggleFraisMention}
                title="Frais de Manutention"
                className={`my-3 hover:bg-gray-200 transition duration-300 ${isFraisMentionVisible ? 'bg-blue-100' : ''}`}
              />
              {isFraisMentionVisible && <FraisMention />}

              <ButtonDivider
                onClick={togglePayment}
                title="Paiement"
                className={`my-3 hover:bg-gray-200 transition duration-300 ${isPaymentVisible ? 'bg-blue-100' : ''}`}
              />
              {isPaymentVisible && <PaymentComponent />}
              <FoodServiceSummary />


              <ButtonDivider
                onClick={toggleFormulaire}
                title="Énoncé des droits de résolution du consommateur"
                className={`my-3 hover:bg-gray-200 transition duration-300 ${isFormulaire ? 'bg-blue-100' : ''}`}
              />
              {isFormulaire && <FormResilation />}
              <OrderControl setIsLoading={setIsLoading} printRef={printRef} />
              <br />
              <br /><br /><br />
            </>

          )}
        </>
      )}


{isfirstLoading && (
  <div
    ref={printRef}
    style={{
      position: 'absolute',
      left: '-9999px',
      top: '-9999px',
      width: '1155px',
    }}
  >
    <PdfPrintableContent />
  </div>
)}



    </div>
  );
};

export default CreateCommande;
