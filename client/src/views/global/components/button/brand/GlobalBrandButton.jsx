import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import './scss/global-brand-button.scss';

const GlobalBrandButton = ({ image, link }) => {
  return (
    <Button className="brand-button--button" href={link}>
      <img alt="" className="brand-image--img" src={image} />
    </Button>
  );
};

GlobalBrandButton.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
  link: PropTypes.string.isRequired
};

export default GlobalBrandButton;
