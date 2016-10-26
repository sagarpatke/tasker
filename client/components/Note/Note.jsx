import React from 'react';
import Paper from 'material-ui/Paper';
import ReactMarkdown from 'react-markdown';

import ActionDelete from 'material-ui/svg-icons/action/delete';

import {red400} from 'material-ui/styles/colors';

const styles = {
  notePaper: {
    margin: '10px',
    padding: '10px',
    textAlign: 'left'
  },
  actionBar: {
    height: '20px',
    textAlign: 'right'
  },
  actionBarItem: {
    cursor: 'pointer'
  }
}

export default class Note extends React.Component {
  constructor() {
    super();
    this.state = {
      hover: false
    }
  }

  static get propTypes() {
    return {
      note: React.PropTypes.object.isRequired,
      delete: React.PropTypes.func.isRequired
    }
  }

  render() {
    const actionBar = (
        <ActionDelete color={red400} style={styles.actionBarItem} onClick={this.props.delete.bind(this,this.props.note._id)} />
    );

    const text = '# ' + this.props.note.title + '\n\n' + this.props.note.text;
    return (
      <Paper style={styles.notePaper} zDepth={2} onMouseEnter={this.setHover.bind(this,true)} onMouseLeave={this.setHover.bind(this,false)}>
        <div>
          <ReactMarkdown source={text} />
        </div>
        <div style={styles.actionBar}>
          {this.state.hover ? actionBar : null}
        </div>
      </Paper>
    );
  }

  setHover(hover) {
    this.setState({hover});
  }
}
