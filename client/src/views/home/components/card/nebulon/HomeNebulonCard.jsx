import React from 'react';
import nebulonCardMedia from './assets/images/nebulon-card-media.png';
import ProjectCard from '../../../../../components/card/project/ProjectCard';
import { red } from '../../../../../services/color/muiColors';

const HomeNebulonCard = () => {
  return (
    <ProjectCard
      background={red[900].dark}
      content={
        <span>
          An arcade original game based off galaga and other top-down shooters.
        </span>
      }
      date="March 15, 2019"
      linkToRoute="/nebulon"
      media={nebulonCardMedia}
      title="Nebulon"
    />
  );
};

export default HomeNebulonCard;
