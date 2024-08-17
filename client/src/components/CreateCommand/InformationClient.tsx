import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const InformationClient: React.FC = () => {
  const { clientId } = useParams<{ clientId: string }>(); // Get the id from the URL params
  const [clientData, setClientData] = useState<any>(null);

  useEffect(() => {
    // Fetch client data from the backend
    const fetchClientData = async () => {
      try {
        // Retrieve the token from localStorage (or wherever it's stored)
        const token = localStorage.getItem('token'); // Replace 'token' with your actual token key

        if (!token) {
          throw new Error('No token available');
        }

        const response = await axios.get(`http://localhost:7070/api/consultant/getClientById/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
            'Content-Type': 'application/json', // Ensure the request is in JSON format
          },
        });

        const data = response.data; // Extract the data from the response
        console.log(data); // Log the fetched data
        setClientData(data); // Store the data in state
      } catch (error) {
        console.error('Error fetching client data:', error);
      }
    };

    fetchClientData();
  }, [clientId]);

  if (!clientData) {
    return <div>Loading...</div>; // Show loading state if data is not yet fetched
  }

  const { appointment, address, phoneNumbers, freezer, weeklyBudget, fullName, note, language, clients } = clientData;

  return (
    <div className="px-6 sm:px-8 lg:px-12 mx-auto max-w-4xl bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900">Information du Client</h3>
        <p className="mt-1 text-sm text-gray-600">Détails personnels et informations du représentant.</p>
      </div>
      <div className="px-6 py-4">
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8">
          <div className="border-t border-gray-100 pt-6">
            <dt className="text-sm font-medium text-gray-800">Nom complet</dt>
            <dd className="mt-1 text-sm text-gray-700">{fullName}</dd>
          </div>
          <div className="border-t border-gray-100 pt-6">
            <dt className="text-sm font-medium text-gray-800">Langue</dt>
            <dd className="mt-1 text-sm text-gray-700">{language}</dd>
          </div>
          <div className="border-t border-gray-100 pt-6">
            <dt className="text-sm font-medium text-gray-800">Note</dt>
            <dd className="mt-1 text-sm text-gray-700">{note}</dd>
          </div>
          <div className="border-t border-gray-100 pt-6">
            <dt className="text-sm font-medium text-gray-800">Date de rendez-vous</dt>
            <dd className="mt-1 text-sm text-gray-700">{new Date(appointment.date).toLocaleDateString()}</dd>
          </div>
          <div className="border-t border-gray-100 pt-6">
            <dt className="text-sm font-medium text-gray-800">Heure de rendez-vous</dt>
            <dd className="mt-1 text-sm text-gray-700">{appointment.time}</dd>
          </div>
          <div className="border-t border-gray-100 pt-6">
            <dt className="text-sm font-medium text-gray-800">Adresse</dt>
            <dd className="mt-1 text-sm text-gray-700">{address.street}, {address.city}, {address.postalCode}</dd>
          </div>
          <div className="border-t border-gray-100 pt-6">
            <dt className="text-sm font-medium text-gray-800">Téléphone 1</dt>
            <dd className="mt-1 text-sm text-gray-700">{phoneNumbers.phone1}</dd>
          </div>
          <div className="border-t border-gray-100 pt-6">
            <dt className="text-sm font-medium text-gray-800">Téléphone 2</dt>
            <dd className="mt-1 text-sm text-gray-700">{phoneNumbers.phone2}</dd>
          </div>
          <div className="border-t border-gray-100 pt-6">
            <dt className="text-sm font-medium text-gray-800">Congélateur actuel</dt>
            <dd className="mt-1 text-sm text-gray-700">{freezer.currentState}</dd>
          </div>
          <div className="border-t border-gray-100 pt-6">
            <dt className="text-sm font-medium text-gray-800">Congélateur supplémentaire</dt>
            <dd className="mt-1 text-sm text-gray-700">{freezer.hasExtraFreezer ? "Oui" : "Non"}</dd>
          </div>
          <div className="border-t border-gray-100 pt-6">
            <dt className="text-sm font-medium text-gray-800">Budget hebdomadaire pour la viande</dt>
            <dd className="mt-1 text-sm text-gray-700">{weeklyBudget.meat}</dd>
          </div>
          <div className="border-t border-gray-100 pt-6">
            <dt className="text-sm font-medium text-gray-800">Clients associés</dt>
            <dd className="mt-1 text-sm text-gray-700">
              {clients.map((client: any, index: number) => (
                <div key={index}>
                  {client.fullName}
                </div>
              ))}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default InformationClient;
