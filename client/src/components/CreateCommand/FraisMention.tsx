import React from 'react';
import fraisMentionImage from '../../images/FraisMention.webp';

interface Stat {
  label: string;
  value: string;
}

const stats: Stat[] = [
  { label: 'Founded', value: '2021' },
  { label: 'Employees', value: '37' },
  { label: 'Countries', value: '12' },
  { label: 'Raised', value: '$25M' },
];

const FraisMention: React.FC = () => {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-16 sm:gap-y-24 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-4">
            <div className="relative overflow-hidden rounded-3xl bg-gray-900 shadow-2xl h-full flex justify-center items-center">
              <img
                className="h-full w-full object-cover"
                src={fraisMentionImage}
                alt="Frais Mention"
              />
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <div className="text-base leading-7 text-gray-700 lg:max-w-lg">
              <p className="text-base font-semibold leading-7 text-indigo-600">
                Frais de Manutention
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Détails des services
              </h1>
              <div className="max-w-xl">
                <p className="mt-6">
                  Les frais de manutention comprennent: Coupe, dégraissage, préparation, emballage sous vide,
                  surgélation, gel de prix pour (12 mois), garantie sur l'emballage et le produit (18 mois),
                  livraisons associées au contrat, service à la clientèle, publicité, administration et profit. Le
                  tout est pour 12 mois de service.
                </p>
                <p className="mt-8">
                  *Le poids total des boîtes est toujours le même. Cependant, le nombre de pièces peut varier selon
                  leur poids.
                </p>
                <p className="mt-8">
                  Les produits de qualité supérieurs que vous avez sélectionnés ont été préparés, mis sous vide et
                  surgelés avec une grande précaution, tel que discuté lors de votre rencontre avec notre
                  représentant. Le poids des différents produits peut varier. Chaque plan alimentaire est construit
                  selon les habitudes de consommation et le budget des différentes familles.
                </p>
                <p className="mt-8">
                  Le consommateur devient responsable à partir du moment où il reçoit la commande. Toutes les pièces
                  sont garanties à 100%. Il est entendu que les parties acceptent le fait que l’achat d’une épicerie
                  comprend tous les avantages et services mentionnés dans les conditions. Seules les déclarations
                  écrites du programme consommateur (clair et sans risque).
                </p>
                <p className="mt-8">
                  Avec ce concept, vous trouverez les 5 groupes de protéine suivante: viande rouge (bœuf et gibier),
                  porc, poulet et volaille, poisson et fruits de mers. Vous aurez la chance de modifier le concept
                  selon vos habitudes alimentaires. Vous pourrez donc enlever ou ajouter des produits à chaque
                  livraison à l'exception du gel de prix qui n'est ni monnayable ni échangeable. Toute partie non
                  livrée à la demande du client ne peut être annulée ni remboursée, sous aucune considération. De plus
                  le montant des paiements ne pourra être modifié au cours de l'année. Vous acceptez de recevoir des
                  SMS et/ou courriels pendant la durée de votre contrat.
                </p>
                <p className="mt-8">
                  Si des produits ne sont pas disponibles lors de votre première livraison, ils seront automatiquement
                  remis sur votre deuxième livraison, vous pourrez communiquer avec notre service à la clientèle si
                  besoin. Il est possible d'annuler ce contrat jusqu'à 10 jours après la réception de votre première
                  livraison.
                </p>
                <p className="mt-8 font-bold">
                  Garantie:
                </p>
                <p className="mt-4">
                  Lors de votre livraison, si vous trouvez un ou des morceaux descellés ou encore des viandes dont
                  vous n'aimez pas les goûts, ces produits seront remplacés sous forme d'un crédit que vous pourrez appliquer sur les produits de votre choix lors de votre prochaine livraison. Si par erreur vous avez commandé trop d'un produit ex: 5 boites de bœuf haché par livraison et vous en avez seulement consommé 3 boites, lors de la livraison suivante, nous échangerons les boites à venir par un autre produit de valeur équivalente.
                </p>
              </div>
            </div>
            <dl className="mt-10 grid grid-cols-2 gap-8 border-t border-gray-900/10 pt-10 sm:grid-cols-4">
              {stats.map((stat, statIdx) => (
                <div key={statIdx}>
                  <dt className="text-sm font-semibold leading-6 text-gray-600">
                    {stat.label}
                  </dt>
                  <dd className="mt-2 text-3xl font-bold leading-10 tracking-tight text-gray-900">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-10 flex">
              <a href="#" className="text-base font-semibold leading-7 text-indigo-600">
                Learn more about our company <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FraisMention;
