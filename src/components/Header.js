import React from 'react';
import { Link } from 'react-router-dom';
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
        <nav>
          <Link to="/search" data-testid="link-to-search">Search</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
          <Link to="/profile" data-testid="link-to-profile">Profile</Link>
        </nav>
      </header>
    );
  }
}

export default Header;
