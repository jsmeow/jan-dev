import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import posed, { PoseGroup } from 'react-pose';
import './scss/project-card.scss';

const CardAnimation = posed.div({
  enter: {
    y: 0,
    opacity: 1,
    delay: 600,
    transition: {
      y: { type: 'spring', stiffness: 1000, damping: 15 },
      default: { duration: 1000 }
    }
  },
  exit: {
    y: 50,
    opacity: 0,
    delay: 600,
    transition: { duration: 1000 }
  }
});

const HomeCard = ({ background, content, linkToRoute, media, title }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isVisible) setIsVisible(true);
  }, [isVisible]);

  return (
    <PoseGroup>
      {isVisible && (
        <CardAnimation key={`cardAnimation-${new Date().toString()}`}>
          <Card
            className="project-card--div hvr-wobble-vertical"
            style={{ background: `${background}8A` }}
          >
            <Link className="project-card--media--link" to={linkToRoute}>
              <CardHeader className="project-card--header" title={title} />
              <CardMedia
                className="project-card--media"
                component="div"
                image={media}
                title={title}
              />
              <CardContent className="project-card--content">
                <Typography component="span">{content}</Typography>
              </CardContent>
            </Link>
          </Card>
        </CardAnimation>
      )}
    </PoseGroup>
  );
};

HomeCard.propTypes = {
  background: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  linkToRoute: PropTypes.string.isRequired,
  media: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired
};

export default HomeCard;
