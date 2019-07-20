import PropTypes from 'prop-types';
import React from 'react';
import './scss/background-paper.scss';
import { grey } from '../../../services/color/muiColors';

const BackgroundPaper = ({ children, backgroundColor, image }) => {
  return (
    <div
      className="background-paper--div"
      style={{
        backgroundColor,
        backgroundImage: `url(${image})`
      }}
    >
      {children}
    </div>
  );
};

BackgroundPaper.propTypes = {
  backgroundColor: PropTypes.string,
  children: PropTypes.array,
  image: PropTypes.string
};

BackgroundPaper.defaultProps = {
  backgroundColor: grey[900].main,
  children: [],
  image: ''
};

export default BackgroundPaper;
