import React from 'react';
import Header from './components/Header';
import Main from './components/Main';
import { Card } from 'antd';


class User extends React.Component {

  render() {
    return (
      <Card>
        <Header></Header>
        <Main></Main>
      </Card>
    );
  }
}

export default User;