import React, { useState } from 'react';
import { Radio, RadioGroup } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/20/solid';
import { useProductContext } from '../../contexts/ProductContext'; // Import the context

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

// Define the type for a payment plan
interface PaymentPlan {
  id: number;
  title: string;
  description: string;
  price: string;
}

export default function Select() {
  const { products, nombreOfLivraison } = useProductContext(); // Access the context
  const [selectedPaymentPlan, setSelectedPaymentPlan] = useState<PaymentPlan | null>(null);

  const calculateTotalForDelivery = (): number => {
    return products.reduce((total, product) => {
      return total + product.quantities.reduce((sum: number, qty: number, index: number) => {
        if (index < nombreOfLivraison) {
          return sum + qty * product.price;
        }
        return sum;
      }, 0);
    }, 0);
  };

  const calculateFinancingOptions = () => {
    const total = calculateTotalForDelivery();
    return {
      weeklyTotal: (total / 52).toFixed(2),
      biWeeklyTotal: (total / 26).toFixed(2),
      monthlyTotal: (total / 12).toFixed(2),
    };
  };

  const financingOptions = calculateFinancingOptions();

  const paymentPlans: PaymentPlan[] = [
    { id: 1, title: '52 paiements', description: 'Par semaine', price: `${financingOptions.weeklyTotal}$` },
    { id: 2, title: '26 paiements', description: 'Au 2 semaines', price: `${financingOptions.biWeeklyTotal}$` },
    { id: 3, title: '12 paiements', description: 'Par mois', price: `${financingOptions.monthlyTotal}$` },
  ];

  return (
    <fieldset>
      <legend className="text-sm font-semibold leading-6 text-gray-900">Choisissez un plan de paiement</legend>
      <RadioGroup
        value={selectedPaymentPlan}
        onChange={setSelectedPaymentPlan}
        className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4"
      >
        {paymentPlans.map((plan) => (
          <Radio
            key={plan.id}
            value={plan}
            className={({ checked, focus }) =>
              classNames(
                focus ? 'border-indigo-600 ring-2 ring-indigo-600' : '',
                !focus ? 'border-gray-300' : '',
                'relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none'
              )
            }
          >
            {({ checked }) => (
              <>
                <span className="flex flex-1">
                  <span className="flex flex-col">
                    <span className="block text-sm font-medium text-gray-900">{plan.title}</span>
                    <span className="mt-1 flex items-center text-sm text-gray-500">{plan.description}</span>
                    <span className="mt-6 text-sm font-medium text-gray-900">{plan.price}</span>
                  </span>
                </span>
                <CheckCircleIcon
                  className={classNames(!checked ? 'invisible' : '', 'h-5 w-5 text-indigo-600')}
                  aria-hidden="true"
                />
                <span
                  className={classNames(
                    checked ? 'border-indigo-600' : 'border-transparent',
                    focus ? 'border' : 'border-2',
                    'pointer-events-none absolute -inset-px rounded-lg'
                  )}
                  aria-hidden="true"
                />
              </>
            )}
          </Radio>
        ))}
      </RadioGroup>
    </fieldset>
  );
}
