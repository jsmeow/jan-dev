import React from 'react';
import tetrisCardMedia from './assets/images/tetris-card-media.png';
import ProjectCard from '../../../../../components/card/project/ProjectCard';
import { green } from '../../../../../services/color/muiColors';

const HomeTetrisCard = () => {
  return (
    <ProjectCard
      background={green[900].dark}
      content={
        <span>
          An arcade classic. A study on the HTML5 canvas, key events, and
          collision detection.
        </span>
      }
      date="March 15, 2019"
      linkToRoute="/tetris"
      media={tetrisCardMedia}
      title="Tetris"
    />
  );
};

export default HomeTetrisCard;
