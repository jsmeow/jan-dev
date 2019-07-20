import { withRouter, Switch, Route } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './scss/global-router.scss';
import HomeRoutes from '../routes/HomeRoutes';
import TetrisRoutes from '../routes/TetrisRoutes';
import NebulonRoutes from '../routes/NebulonRoutes';

const Router = ({ location }) => {
  return (
    <TransitionGroup className="router--transition-group--div">
      <CSSTransition
        key={location.key}
        classNames="fade"
        timeout={{
          enter: 600,
          exit: 600
        }}
      >
        <section
          className="router--route-section--section"
          id="router--route-section--section"
        >
          <Switch location={location}>
            <Route component={HomeRoutes} exact path="/" />
            <Route component={TetrisRoutes} path="/tetris" />
            <Route component={NebulonRoutes} path="/nebulon" />
          </Switch>
        </section>
      </CSSTransition>
    </TransitionGroup>
  );
};

Router.propTypes = {
  location: PropTypes.object.isRequired
};

export default withRouter(Router);
