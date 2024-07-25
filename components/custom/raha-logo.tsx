import React from 'react';
import { FaLeaf } from 'react-icons/fa';
import { playfair } from '@/app/fonts';

interface RahaLogoProps {
  colorScheme?:
    | 'default'
    | 'serene'
    | 'soothing'
    | 'tranquil'
    | 'balanced'
    | 'comforting';
  showIcon?: boolean;
}

const RahaLogo: React.FC<RahaLogoProps> = ({
  colorScheme = 'default',
  showIcon = true,
}) => {
  const colorSchemes: { [key: string]: string } = {
    default: 'linear-gradient(45deg, #8E9B90, #D1E2C7)',
    serene: 'linear-gradient(45deg, #8E9B90, #D1E2C7)',
    soothing: 'linear-gradient(45deg, #C7BCA1, #F1E3D3)',
    tranquil: 'linear-gradient(45deg, #A1B5D8, #E2EAF3)',
    balanced: 'linear-gradient(45deg, #D7C0A1, #F3E8D3)',
    comforting: 'linear-gradient(45deg, #B5A288, #D9C7B8)',
  };

  const logoStyle: React.CSSProperties = {
    fontFamily: playfair.className,
    fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
    fontWeight: 'bold',
    letterSpacing: '0.03em',
    background: colorSchemes[colorScheme],
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease',
    animation: 'fadeIn 1.5s ease-in-out',
  };

  return (
    <div className="flex items-center h-full p-2">
      <h1
        className="flex items-center"
        style={logoStyle}
        aria-label="Raha logo"
      >
        {showIcon && (
          <span
            className="mr-3"
            style={{ fontSize: '0.7em', display: 'flex', alignItems: 'center' }}
          >
            <FaLeaf />
          </span>
        )}
        <span>Raha</span>
      </h1>
    </div>
  );
};

export default RahaLogo;
