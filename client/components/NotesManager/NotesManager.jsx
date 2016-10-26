import React from 'react';

import Tasker from '../../components/Tasker'
import Paper from 'material-ui/Paper';

import Note from '../Note';

import flexboxgridcss from 'flexboxgrid';

import request from 'superagent';

const styles = {
  noteArea: {
    marginTop: '30px'
  }
}

export default class NotesManager extends React.Component {
  constructor() {
    super();
    this.state = {
      notes: []
    }
  }

  componentDidMount() {
    request
      .get('/note')
      .end((err, res) => {
        if(err) { return console.err('ERR',err); }
        this.setState({notes: res.body});
      });
  }

  render() {
    const notes = this.state.notes.map((note) => {
      return (
        <div className="col-md-4 col-lg-3" key={note._id}>
          <Note note={note} delete={this.handleDeleteNote.bind(this,note._id) }/>
        </div>
      );
    });

    return (
      <div className="container-fluid">
        <div className="row center-xs">
          <div className="col-xs-12 col-md-6 col-lg-4">
            <Tasker createNewNote={this.handleCreateNewNote.bind(this)}/>
          </div>
        </div>
        <div style={styles.noteArea}>
          <div className="row center-xs">
            {notes}
          </div>
        </div>
      </div>
    );
  }

  handleCreateNewNote(note) {
    request
      .post('/note')
      .send(note)
      .set('Content-Type','application/json')
      .end((err, res) => {
        if(err) { return console.log('ERR',err); }
        const notes = this.state.notes;
        notes.push(res.body);
        this.setState({notes});
    });
  }

  handleDeleteNote(noteId) {
    const notes = this.state.notes.filter((note) => {
      return note._id !== noteId
    });

    request
      .delete('/note/'+noteId)
      .end((err, res) => {
        if(err) { return console.log('ERR',err); }
      });

    this.setState({notes});
  }
}
