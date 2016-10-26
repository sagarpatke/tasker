import React from 'react';
import NavBar from '../../components/NavBar';
import Tasker from '../../components/Tasker';
import NotesManager from '../../components/NotesManager';

import flexboxgridcss from 'flexboxgrid';

const styles = {
  tasker: {
    marginTop: '25px'
  }
}

export default class DashView extends React.Component {
  render() {
    return (
      <div>
        <NavBar/>
        <NotesManager />
      </div>
    );
  }
}
