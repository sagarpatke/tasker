import React, { Component } from 'react';
import {Card, CardHeader} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import {grey400, red300} from 'material-ui/styles/colors';
import ContentRemoveCircle from 'material-ui/svg-icons/content/remove-circle';

export default class ActivityList extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      newActivity: "",
      hoverIndex: -1
    };
  }

  handleItemChecked(index, checked) {
    const items = this.state.items;
    const item = items[index];
    item.completed = checked;
    items.splice(index, 1, item);
    this.setState({items});
  }

  handleNewActivityChange(newActivity) {
    this.setState({newActivity: newActivity});
  }

  handleAddNewActivity() {
    const items = this.state.items;
    items.push({activity: this.state.newActivity.trim(), completed: false});
    this.setState({items, newActivity: ''});
  }

  handleRemoveActivity(index) {
    const items = this.state.items;
    items.splice(index, 1);
    this.setState({items});
  }

  render() {
    const todoList = this.state.items.map((item, index) => {
      const checkbox = (
        <Checkbox
          checked={item.completed}
          onCheck={(event, isChecked) => this.handleItemChecked(index, isChecked)} />
      );

      const completedStyle = {
        textDecoration: 'line-through',
        fontStyle: 'italic',
        color: grey400
      }

      const rightIconButton = (
        <ContentRemoveCircle
          hoverColor={red300}
          onTouchTap={this.handleRemoveActivity.bind(this, index)} />
      );

      var timeout = null;

      function showRemoveIcon(show) {
        if(timeout) { clearTimeout(timeout); }
        timeout = setTimeout(() => {
          this.setState({hoverIndex: show ? index : -1});
        });
      }

      return (
        <ListItem
          key={item.activity}
          primaryText={item.activity}
          leftCheckbox={checkbox}
          style={item.completed ? completedStyle : null}
          rightIcon={ this.state.hoverIndex === index ? rightIconButton : null}
          onMouseOver={showRemoveIcon.bind(this, true)}
          onMouseOut={showRemoveIcon.bind(this, false)}/>
      );
    });

    return (
      <Card>
        <CardHeader
          title="Default" />
        <List>
          {todoList}
        </List>
        <form style={{padding: '10px'}} onSubmit={this.handleAddNewActivity.bind(this)}>
          <TextField
            value={this.state.newActivity}
            onChange={(event) => this.handleNewActivityChange(event.target.value)}
            onKeyUp={(event) => event.keyCode===13 ? this.handleAddNewActivity() : null}
            hintText="New Activity"
            multiLine={true}
            fullWidth={true} />
        </form>
      </Card>
    );
  }
}
