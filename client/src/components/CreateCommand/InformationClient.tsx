import React from 'react';
import { PaperClipIcon } from '@heroicons/react/20/solid';

const InformationClient: React.FC = () => {
  return (
    <div className="px-6 sm:px-8 lg:px-12 mx-auto max-w-4xl bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900">Information du Client</h3>
        <p className="mt-1 text-sm text-gray-600">Détails personnels et informations du représentant.</p>
      </div>
      <div className="px-6 py-4">
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8">
          <div className="border-t border-gray-100 pt-6">
            <dt className="text-sm font-medium text-gray-800">Représentant</dt>
            <dd className="mt-1 text-sm text-gray-700">Ayoub Lahna</dd>
          </div>
          <div className="border-t border-gray-100 pt-6">
            <dt className="text-sm font-medium text-gray-800">Date</dt>
            <dd className="mt-1 text-sm text-gray-700">2024-08-11</dd>
          </div>
          <div className="border-t border-gray-100 pt-6">
            <dt className="text-sm font-medium text-gray-800">Nom complet Client 1</dt>
            <dd className="mt-1 text-sm text-gray-700">Nathalie Lacelle</dd>
          </div>
          <div className="border-t border-gray-100 pt-6">
            <dt className="text-sm font-medium text-gray-800">Courriel 1</dt>
            <dd className="mt-1 text-sm text-gray-700">nat.lacelle@hotmail.com</dd>
          </div>
          <div className="border-t border-gray-100 pt-6">
            <dt className="text-sm font-medium text-gray-800">Cell 1</dt>
            <dd className="mt-1 text-sm text-gray-700">(613) 293-6356</dd>
          </div>
          <div className="border-t border-gray-100 pt-6">
            <dt className="text-sm font-medium text-gray-800">Client 2</dt>
            <dd className="mt-1 text-sm text-gray-700">Patrick Derouin</dd>
          </div>
          <div className="border-t border-gray-100 pt-6">
            <dt className="text-sm font-medium text-gray-800">Courriel 2</dt>
            <dd className="mt-1 text-sm text-gray-700"></dd>
          </div>
          <div className="border-t border-gray-100 pt-6">
            <dt className="text-sm font-medium text-gray-800">Cell 2</dt>
            <dd className="mt-1 text-sm text-gray-700"></dd>
          </div>
          <div className="border-t border-gray-100 pt-6">
            <dt className="text-sm font-medium text-gray-800">Adresse</dt>
            <dd className="mt-1 text-sm text-gray-700">
              23 Chemin des Quatre-L, L'Ange-Gardien, QC, Canada
            </dd>
          </div>
          <div className="border-t border-gray-100 pt-6">
            <dt className="text-sm font-medium text-gray-800">Ville</dt>
            <dd className="mt-1 text-sm text-gray-700">L'Ange-Gardien</dd>
          </div>
          <div className="border-t border-gray-100 pt-6">
            <dt className="text-sm font-medium text-gray-800">Code postal</dt>
            <dd className="mt-1 text-sm text-gray-700">J8L 0E9</dd>
          </div>
          <div className="border-t border-gray-100 pt-6">
            <dt className="text-sm font-medium text-gray-800">Province</dt>
            <dd className="mt-1 text-sm text-gray-700">Québec</dd>
          </div>
          <div className="border-t border-gray-100 pt-6">
            <dt className="text-sm font-medium text-gray-800">Contacter à ce numéro</dt>
            <dd className="mt-1 text-sm text-gray-700">(819) 271-8854</dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default InformationClient;
