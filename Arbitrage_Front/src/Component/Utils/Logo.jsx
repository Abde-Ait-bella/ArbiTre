import React from 'react';
import PropTypes from 'prop-types';

/**
 * Reusable Logo component with support for different variants and sizes
 * @param {string} variant - The logo variant ('white', 'red', 'dark', 'all_red', 'all_yellow', or 'yellow')
 * @param {string} size - The size of the logo ('small', 'medium', 'large', or custom CSS size like '50px')
 * @param {string} className - Additional CSS classes to apply
 * @param {object} style - Additional inline styles
 */
const Logo = ({ variant = 'white', size = 'medium', className = '', style = {} }) => {
  // Map of logo variants to their file paths
  const logoVariants = {
    white: '/img/svg/logo_white.svg',
    red: '/img/svg/logo_red.svg',
    dark: '/img/svg/logo_dark.svg',
    all_red: '/img/svg/logo_all_red.svg',
    all_yellow: '/img/svg/logo_yellow.svg',
    yellow: '/img/svg/logo_yellow.svg' // Fallback to logo_yellow.svg if it exists
  };

  // Get the logo path based on variant, default to white if variant doesn't exist
  const logoPath = logoVariants[variant] || logoVariants.white;

  // Convert size to actual CSS values
  const sizeMap = {
    small: '4rem',
    medium: '7rem',
    large: '9rem'
  };

  // Determine the final size (either from predefined sizes or custom value)
  const finalSize = sizeMap[size] || size;

  // Construct style object with width
  const logoStyle = {
    width: finalSize,
    height: 'auto',
    ...style
  };

  return (
    <img 
      src={logoPath} 
      alt="ArbiTre Logo" 
      className={`logo ${className}`} 
      style={logoStyle} 
    />
  );
};

Logo.propTypes = {
  variant: PropTypes.oneOf(['white', 'red', 'dark', 'all_red', 'all_yellow', 'yellow']),
  size: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object
};

export default Logo;
