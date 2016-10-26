import React from 'react';

import cookie from 'react-cookie';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Avatar from 'material-ui/Avatar';
import MenuItem from 'material-ui/MenuItem';
import ActionExitToApp from 'material-ui/svg-icons/action/exit-to-app';
import IconButton from 'material-ui/IconButton';

const styles = {
  center: {
    textAlign: 'center',
  },
  avatar: {
    margin: '10px'
  },
  appBar: {
    position: 'fixed'
  }
}

/*function getInitials(name) {
  var initials = '';
  name.split(' ').forEach(function(w) {
    initials += w[0];
  });
  return initials
}*/

function getInitials() {
  return 'A';
}

export default class NavBar extends React.Component {
  constructor() {
    super();
    this.state = {
      openDrawer: false
    }
  }

  static get contextTypes() {
    return {
      router: React.PropTypes.object.isRequired,
    }
  }

  render() {
    const name = JSON.parse(atob(cookie.load('token').split('.')[1])).info.name;
    const iconElementRight = <IconButton><ActionExitToApp /></IconButton>;
    return (
      <div>
        <AppBar title="Tasker"
          style={styles.appBar}
          iconElementRight={iconElementRight}
          onRightIconButtonTouchTap={this.handleLogout.bind(this)}
          onLeftIconButtonTouchTap={this.toggleDrawer.bind(this)}
          zDepth={1}
        />
        <Drawer
          open={this.state.openDrawer}
          docked={false}
          onRequestChange={this.toggleDrawer.bind(this)}
        >
          <div style={styles.center}>
            <Avatar
              size={230}
              style={styles.avatar}
              >
              {getInitials(name)}
            </Avatar>
          </div>
          <MenuItem primaryText="Logout" leftIcon={<ActionExitToApp />} onTouchTap={this.handleLogout.bind(this)}/>
        </Drawer>
      </div>
    );
  }

  toggleDrawer() {
    this.setState({openDrawer: !this.state.openDrawer});
  }

  handleLogout() {
    cookie.remove('token');
    this.context.router.push('/');
  }
}
