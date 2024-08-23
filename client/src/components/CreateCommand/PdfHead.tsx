import React from 'react';
import myImage from '../../images/logo/logo-dark.png'; // Replace with the correct path to your image

const Header = () => {
    return (
      <div className="w-full h-[50vh] flex flex-col justify-between">
        {/* Top Image Section */}
        <div className="bg-black flex justify-center py-8">
          <img src={myImage} alt="Company Logo" className="h-24" />
        </div>
  
        {/* Address Section */}
        <div className="text-center py-8">
          <h2 className="text-2xl font-bold">LA FAMILLE QUÉBEC ALIMENTATION</h2>
          <p className="text-lg mt-2">3035 avenue Maricourt, local 110, Quebec (Qc) G1W 0E9</p>
        </div>
  
        {/* Order Number Section */}
        <div className="text-center py-8">
          <h3 className="text-xl font-bold">BON DE COMMANDE N°</h3>
          <p className="text-lg mt-2">3811708</p>
          <hr className="mt-6" />
        </div>
      </div>
    );
  };
  
  export default Header;
