import React from 'react';
import { useProductContext } from '../../contexts/ProductContext';
import '../CreateCommand/tailwind.output.css';

const InformationClient: React.FC = () => {
  const { client } = useProductContext(); // Access client data and language from the context

  const {
    appointment,
    address,
    phoneNumbers,
    freezer,
    weeklyBudget,
    fullName,
    note,
    language,
    clients
  } = client;

  const t = translations[language] || translations.en; // Fallback to English if the language is not found

  return (
    <div className="px-6 sm:px-8 lg:px-12 mx-auto max-w-4xl bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-2xl font-semibold text-gray-900">{t.clientInfoTitle}</h3>
        <p className="mt-1 text-lg text-gray-600">{t.clientInfoSubtitle}</p>
      </div>
      <div className="px-6 py-4">
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8">
          <div className="border-t border-gray-100 pt-6">
            <dt className="text-lg font-medium text-gray-800">{t.fullName}</dt>
            <dd className="mt-1 text-lg text-gray-700">{fullName}</dd>
          </div>
          <div className="border-t border-gray-100 pt-6">
            <dt className="text-lg font-medium text-gray-800">{t.language}</dt>
            <dd className="mt-1 text-lg text-gray-700">{language}</dd>
          </div>
          <div className="border-t border-gray-100 pt-6">
            <dt className="text-lg font-medium text-gray-800">{t.note}</dt>
            <dd className="mt-1 text-lg text-gray-700">{note}</dd>
          </div>
          <div className="border-t border-gray-100 pt-6">
            <dt className="text-lg font-medium text-gray-800">{t.appointmentDate}</dt>
            <dd className="mt-1 text-lg text-gray-700">{new Date(appointment.date).toLocaleDateString()}</dd>
          </div>
          <div className="border-t border-gray-100 pt-6">
            <dt className="text-lg font-medium text-gray-800">{t.appointmentTime}</dt>
            <dd className="mt-1 text-lg text-gray-700">{appointment.time}</dd>
          </div>
          <div className="border-t border-gray-100 pt-6">
            <dt className="text-lg font-medium text-gray-800">{t.address}</dt>
            <dd className="mt-1 text-lg text-gray-700">
              {address.street}, {address.city}, {address.postalCode}
            </dd>
          </div>
          <div className="border-t border-gray-100 pt-6">
            <dt className="text-lg font-medium text-gray-800">{t.phone1}</dt>
            <dd className="mt-1 text-lg text-gray-700">{phoneNumbers.phone1}</dd>
          </div>
          <div className="border-t border-gray-100 pt-6">
            <dt className="text-lg font-medium text-gray-800">{t.phone2}</dt>
            <dd className="mt-1 text-lg text-gray-700">{phoneNumbers.phone2}</dd>
          </div>
          <div className="border-t border-gray-100 pt-6">
            <dt className="text-lg font-medium text-gray-800">{t.currentFreezer}</dt>
            <dd className="mt-1 text-lg text-gray-700">{freezer.currentState}</dd>
          </div>
          <div className="border-t border-gray-100 pt-6">
            <dt className="text-lg font-medium text-gray-800">{t.extraFreezer}</dt>
            <dd className="mt-1 text-lg text-gray-700">{freezer.hasExtraFreezer ? t.yes : t.no}</dd>
          </div>
          <div className="border-t border-gray-100 pt-6">
            <dt className="text-lg font-medium text-gray-800">{t.weeklyMeatBudget}</dt>
            <dd className="mt-1 text-lg text-gray-700">{weeklyBudget.meat}</dd>
          </div>
          <div className="border-t border-gray-100 pt-6">
            <dt className="text-lg font-medium text-gray-800">{t.associatedClients}</dt>
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
