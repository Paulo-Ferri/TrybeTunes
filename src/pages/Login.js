import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

const TRES = 3;
class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      carregando: false,
      loginButtonDisabled: true,
      redirect: false,
    };
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    if (value.length < TRES) {
      this.setState({
        loginButtonDisabled: true,
      });
    } else {
      this.setState({
        loginButtonDisabled: false,
      });
    }

    this.setState({
      [name]: value,
    });
  };

  createUserByName = async () => {
    const { name } = this.state;

    this.setState({
      carregando: true,
    });
    const nomeRequisicao = { name }
    await createUser(nomeRequisicao);

    this.setState({
      redirect: true,
    });
  }

  render() {
    const { name, carregando, redirect, loginButtonDisabled } = this.state;
    return (
      <div data-testid="page-login">
        <form>
          <label htmlFor="name">
            <input
              type="text"
              data-testid="login-name-input"
              name="name"
              value={ name }
              onChange={ this.onInputChange }
            />
            <button
              type="button"
              data-testid="login-submit-button"
              disabled={ loginButtonDisabled }
              onClick={ this.createUserByName }
            >
              Entrar
            </button>
          </label>
        </form>
        { carregando && <Loading /> }
        { redirect && <Redirect to="/search" /> }
      </div>
    );
  }
}

export default Login;
