import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import { compose } from 'redux';
import { translate } from 'react-i18next';
import { withStyles } from 'material-ui/styles';
import { XMasonry, XBlock } from 'react-xmasonry/dist/index';
import Typography from 'material-ui/Typography';
import InfoIcon from 'material-ui-icons/Info';
import Fade from 'material-ui/transitions/Fade';
import Menu from './Menu';
import LoadMenusButton from './LoadMenusButton';
import Spinner from './Spinner';

const styles = theme => ({
  root: {
    margin: theme.spacing.unit,
    '@media (max-width: 599px)': {
      margin: theme.spacing.unit / 2,
    },
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
  },
  noMenus: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing.unit * 4,
    padding: theme.spacing.unit,
    background: theme.palette.grey[200],
    color: theme.palette.text.secondary,
    borderRadius: '2px',
    '& svg': {
      height: 18,
      width: 18,
      marginRight: theme.spacing.unit,
    },
    '& p': {
      flex: 1,
      fontSize: theme.typography.pxToRem(12),
    },
  },
});

const MenuWall = props => (
  <div className={props.classes.root}>
    {props.loading && props.menus.size < 1 ?
      <div className={props.classes.center}>
        <Spinner />
      </div> : null}
    {!props.loading && props.menus.size < 1 ?
      <div className={props.classes.center}>
        <div className={props.classes.noMenus}>
          <InfoIcon />
          <Typography>{props.t('noMenusForSelectedDay')}</Typography>
        </div>
      </div> :
      <div>
        <XMasonry targetBlockWidth={300}>
          {props.menus.map(menu => (
            <XBlock key={menu.get('id')} className={props.classes.block}>
              <Menu menu={menu} loading={props.loading} scrolling={props.scrolling} />
            </XBlock>
          ))}
        </XMasonry>
        <Fade
          in={!props.scrolling && !props.loading}
          unmountOnExit
        >
          <div className={props.classes.center}>
            <LoadMenusButton
              loading={props.loading}
              moreToLoad={props.moreToLoad}
              loadMore={props.loadMore}
            />
          </div>
        </Fade>
      </div>
    }
  </div>
);

MenuWall.propTypes = {
  classes: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  loadMore: PropTypes.func.isRequired,
  menus: PropTypes.instanceOf(List).isRequired,
  moreToLoad: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
  scrolling: PropTypes.bool.isRequired,
};

export default compose(
  translate('menus'),
  withStyles(styles),
)(MenuWall);
