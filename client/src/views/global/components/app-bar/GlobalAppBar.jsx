import React from 'react';
import { connect, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import octocatIcon from '../../../../shared/assets/svg/brand-buttons/github/octocat.svg';
import facebookIcon from '../../../../shared/assets/svg/brand-buttons/facebook/facebook.svg';
import linkedInIcon from '../../../../shared/assets/svg/brand-buttons/linkedin/linkedin.svg';
import gmailIcon from '../../../../shared/assets/svg/brand-buttons/mail/gmail.svg';
import FadingAppBar from '../../../../components/app-bar/fading/FadingAppBar';
import GlobalBrandButton from '../button/brand/GlobalBrandButton';
import './scss/global-app-bar.scss';
import generateKeyHash from '../../../../services/react/utils/generateKeyHash';

const GlobalAppBar = () => {
  const appBarBackground = useSelector(state => state.global.appBar.background);

  const centerButtons = [
    { image: octocatIcon, link: '' },
    { image: facebookIcon, link: 'https://www.facebook.com/janjsalomon' },
    { image: linkedInIcon, link: '' },
    { image: gmailIcon, link: '' }
  ];

  return (
    <FadingAppBar background={appBarBackground}>
      <div className="global-app-bar--flex-column--div">
        <Link
          className="global-app-bar--link global-app-bar--link--span"
          to="/"
        >
          <Button className="global-app-bar--title-button" href="">
            <Typography className="global-app-bar--title--title-button--text">
              jan.dev
            </Typography>
          </Button>
        </Link>
      </div>
      <div className="global-app-bar--flex-column--div">
        <ul className="global-app-bar--buttons--ul">
          {centerButtons.map(({ image, link }) => {
            return (
              <li key={generateKeyHash()}>
                <i key={generateKeyHash()}>
                  <GlobalBrandButton
                    key={generateKeyHash()}
                    image={image}
                    link={link}
                  />
                </i>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="global-app-bar--flex-column--div" />
    </FadingAppBar>
  );
};

export default connect()(GlobalAppBar);
