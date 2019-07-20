import React from 'react';
import homeBackground from './assets/images/home-background.jpg';
import './scss/shooting-stars.scss';
import BackgroundPaper from '../../../../../components/paper/background/BackgroundPaper';

const HomeBackgroundPaper = () => {
  return (
    <BackgroundPaper image={homeBackground}>
      <div className="p p-0" />
      <div className="p p-1" />
      <div className="p p-2" />
      <div className="p p-3" />
      <div className="p p-4" />
      <div className="p p-5" />
    </BackgroundPaper>
  );
};

export default HomeBackgroundPaper;
