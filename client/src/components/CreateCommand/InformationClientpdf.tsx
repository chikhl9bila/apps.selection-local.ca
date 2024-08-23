import React from 'react';
import { useProductContext } from '../../contexts/ProductContext';
import '../CreateCommand/tailwind.output.css';

const InformationClient: React.FC = () => {
  const { client } = useProductContext(); // Access client data from the context

  const { appointment, address, phoneNumbers, freezer, weeklyBudget, fullName, note, language, clients } = client;

  return (
    <div className="px-6 sm:px-8 lg:px-12 mx-auto max-w-4xl bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-2xl font-semibold text-gray-900">Information du Client</h3> {/* Increased font size */}
        <p className="mt-1 text-lg text-gray-600">Détails personnels et informations du représentant.</p> {/* Increased font size */}
      </div>
      <div className="px-6 py-4">
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8">
          <div className="border-t border-gray-100 pt-6">
            <dt className="text-lg font-medium text-gray-800">Nom complet</dt> {/* Increased font size */}
            <dd className="mt-1 text-lg text-gray-700">{fullName}</dd> {/* Increased font size */}
          </div>
          <div className="border-t border-gray-100 pt-6">
            <dt className="text-lg font-medium text-gray-800">Langue</dt>
            <dd className="mt-1 text-lg text-gray-700">{language}</dd>
          </div>
          <div className="border-t border-gray-100 pt-6">
            <dt className="text-lg font-medium text-gray-800">Note</dt>
            <dd className="mt-1 text-lg text-gray-700">{note}</dd>
          </div>
          <div className="border-t border-gray-100 pt-6">
            <dt className="text-lg font-medium text-gray-800">Date de rendez-vous</dt>
            <dd className="mt-1 text-lg text-gray-700">{new Date(appointment.date).toLocaleDateString()}</dd>
          </div>
          <div className="border-t border-gray-100 pt-6">
            <dt className="text-lg font-medium text-gray-800">Heure de rendez-vous</dt>
            <dd className="mt-1 text-lg text-gray-700">{appointment.time}</dd>
          </div>
          <div className="border-t border-gray-100 pt-6">
            <dt className="text-lg font-medium text-gray-800">Adresse</dt>
            <dd className="mt-1 text-lg text-gray-700">{address.street}, {address.city}, {address.postalCode}</dd>
          </div>
          <div className="border-t border-gray-100 pt-6">
            <dt className="text-lg font-medium text-gray-800">Téléphone 1</dt>
            <dd className="mt-1 text-lg text-gray-700">{phoneNumbers.phone1}</dd>
          </div>
          <div className="border-t border-gray-100 pt-6">
            <dt className="text-lg font-medium text-gray-800">Téléphone 2</dt>
            <dd className="mt-1 text-lg text-gray-700">{phoneNumbers.phone2}</dd>
          </div>
          <div className="border-t border-gray-100 pt-6">
            <dt className="text-lg font-medium text-gray-800">Congélateur actuel</dt>
            <dd className="mt-1 text-lg text-gray-700">{freezer.currentState}</dd>
          </div>
          <div className="border-t border-gray-100 pt-6">
            <dt className="text-lg font-medium text-gray-800">Congélateur supplémentaire</dt>
            <dd className="mt-1 text-lg text-gray-700">{freezer.hasExtraFreezer ? "Oui" : "Non"}</dd>
          </div>
          <div className="border-t border-gray-100 pt-6">
            <dt className="text-lg font-medium text-gray-800">Budget hebdomadaire pour la viande</dt>
            <dd className="mt-1 text-lg text-gray-700">{weeklyBudget.meat}</dd>
          </div>
          <div className="border-t border-gray-100 pt-6">
            <dt className="text-lg font-medium text-gray-800">Clients associés</dt>
            <dd className="mt-1 text-lg text-gray-700">
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
