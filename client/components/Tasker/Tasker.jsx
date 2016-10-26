import React from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

import flexboxgridcss from 'flexboxgrid';

const styles = {
  paper: {
    width: '100%',
    marginTop: '100px',
    paddingTop: '30px'
  },
  titleTextField: {
    fontWeight: 'bold'
  }
}

export default class Tasker extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '',
      text: '',
      titleFocus: false,
      noteFocus: false,
      expandedView: true
    }
  }

  static get propTypes() {
    return {
      createNewNote: React.PropTypes.func.isRequired
    }
  }

  render() {
    const titleTextField = (
      <TextField
        hintText="Title"
        style={styles.titleTextField}
        fullWidth={true}
        onFocus={this.handleFocus.bind(this,'title')}
        onBlur={this.handleBlur.bind(this,'title')}
        value={this.state.title}
        onChange={this.handleChange.bind(this,'title')}
      />
    );

    const noteTextField = (
      <TextField
        hintText="Take a Note..."
        style={styles.textField}
        fullWidth={true}
        onFocus={this.handleFocus.bind(this,'note')}
        onBlur={this.handleBlur.bind(this,'note')}
        multiLine={true}
        value={this.state.text}
        onChange={this.handleChange.bind(this,'text')}
      />
    );

    const saveButton = (
      <FlatButton label="Done" type="submit" primary={true}/>
    );

    return (
      <Paper zDepth={3} style={styles.paper}>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-12">
                {this.state.expandedView ? titleTextField : null}
                {noteTextField}
              </div>
            </div>
          </div>
          <div style={{textAlign: 'right'}}>
            {this.state.expandedView ? saveButton : null}
          </div>
        </form>
      </Paper>
    );
  }

  handleChange(prop, e) {
    const obj = {};
    obj[prop] = e.target.value
    this.setState(obj);
  }

  handleFocus(field) {
    const state = this.state;
    state[field+'Focus'] = true
    this.setState(state);
  }

  handleBlur(field) {
    setTimeout(() => {
      const state = this.state;
      state[field+'Focus'] = false
      this.setState(state);
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const note = {title: this.state.title, text: this.state.text};
    if(note.title.trim() === '' && note.title.trim() === '') { return; }
    this.setState({title:'',text:''});
    this.props.createNewNote(note);
  }
}
