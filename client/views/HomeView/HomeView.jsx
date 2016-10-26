import React from 'react';
import request from 'superagent';

const styles = {
  loginStyle: {
    textAlign: 'center',
    marginTop: '200px'
  }
}

export default class HomeView extends React.Component {
  constructor() {
    super();
    this.state = {
    }
  }

  componentDidMount() {
    request
      .get('/auth/github/url')
      .end((err, res) => {
        this.setState({githubUrl: res.text});
      });
  }

  render() {
    return (
      <div style={styles.loginStyle}>
        <div>Login to continue</div>
        <a href={this.state.githubUrl}>
          <img src="/icons/GitHub_Logo.png" width="100px"/>
        </a>
      </div>
    );
  };
}
