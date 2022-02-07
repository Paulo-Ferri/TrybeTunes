import React from 'react';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      carregando: true,
    };
  }

  async componentDidMount() {
    const user = await getUser();

    this.setState({
      name: user.name,
      carregando: false,
    });
  }

  render() {
    const { name, carregando } = this.state;
    return (
      <header data-testid="header-component">
        {carregando
          ? <Loading />
          : <p data-testid="header-user-name">{`Seja bem-vindo(a), ${name}`}</p>}
      </header>
    );
  }
}

export default Header;
