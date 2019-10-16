import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Toolbar from '@material-ui/core/Toolbar';
import { Typography } from '@material-ui/core';
import ViewListIcon from '@material-ui/icons/ViewList';
import BallotIcon from '@material-ui/icons/Ballot';
import InfoIcon from '@material-ui/icons/Info';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import AddIcon from '@material-ui/icons/Add';
import ImageIcon from '@material-ui/icons/Image';
import { actions } from '@storybook/addon-actions';
import { Editor } from '@seine/editor';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    minHeight: '100vh',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawerPaper: {
    position: 'relative',
    width: 240,
  },
  main: {
    padding: theme.spacing(3),
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    width: '100%',
  },
  content: {
    width: '100%',
    maxWidth: theme.breakpoints.width('lg'),
  },
  title: {
    textDecoration: 'none',
  },
  toolbar: theme.mixins.toolbar,
}));

export default { title: 'In an application layout' };

export const EditorInAdminLayout = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />

      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar>
          <Typography
            className={classes.title}
            variant="h6"
            color="inherit"
            noWrap
          >
            Admin
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant={'permanent'}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar} />
        <List>
          <ListItem button>
            <ListItemIcon>
              <ViewListIcon />
            </ListItemIcon>
            <ListItemText primary={'View'} />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <BallotIcon />
            </ListItemIcon>
            <ListItemText primary={'Ballots'} />
            <ListItemSecondaryAction>
              <IconButton aria-label={'Add ballot'}>
                <AddIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <BusinessCenterIcon />
            </ListItemIcon>
            <ListItemText primary={'Business center'} />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary={'Info'} />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <ImageIcon />
            </ListItemIcon>
            <ListItemText primary={'Images'} />
            <ListItemSecondaryAction>
              <IconButton aria-label={'Add image'}>
                <AddIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Drawer>

      <main className={classes.main}>
        <div className={classes.content}>
          <div className={classes.toolbar} />
          <Editor
            parent={{
              id: 'bee1c449-5515-4b12-9779-cfa11f1f62d9',
              type: 'page',
              body: null,
              format: null,
              parent_id: null,
            }}
            {...actions('onChange')}
          />
        </div>
      </main>
    </div>
  );
};
