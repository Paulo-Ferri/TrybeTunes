import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import loading_gif from '../img/loading_gif.gif'
import { getUser } from '../services/userAPI';
import '../Header.css';
import Icon from '../img/icon.png';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      carregando: true,
    };
  }

  getPathName = () => {
    const { history: { location } } = this.props;
    if (location.pathname === '/') return false;
    getUser().then((user) => {
      this.setState({ name: user.name, carregando: false, });
    });
    return true;
  }

  render() {
    const { name, carregando } = this.state;
    return (
      this.getPathName() && (
        <header data-testid="header-component" className="div_header">
          <div className="header_upper_container">
            <div className="header_logo">
              <img src={ Icon } className="header_icon" alt="icon" />
              <h1>TrybeTunes</h1>
            </div>
            {carregando
              ?
              <img src={loading_gif} alt="loading gif" />
              : <p data-testid="header-user-name">
                {`Welcome, ${name}`}
                </p>
            }
          </div>
          <nav className="nav_container">
            <NavLink
              to="/search"
              data-testid="link-to-search"
              className="link_search"
              activeClassName="active"
            >
              Search
            </NavLink>
            <NavLink
              to="/favorites"
              data-testid="link-to-favorites"
              className="link_favorites"
              activeClassName="active"
            >
              Favorites
            </NavLink>
            <NavLink
              to="/profile"
              data-testid="link-to-profile"
              className="link_profile"
              activeClassName="active"
            >
              Profile
            </NavLink>
          </nav>
        </header>
      )
    );
  }
}

export default withRouter(Header);
