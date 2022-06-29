import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';
import '../CSS/Login.css';

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
    console.log('entrei')
    this.setState({ carregando: true });
    const { name } = this.state;
    const nomeRequisicao = { name };
    await createUser(nomeRequisicao);
    this.setState({
      redirect: true,
    });
  }

  onKeyUp = (e) => {
    if(e.key === "Enter") {
      this.createUserByName();
    }
  }

  render() {
    const { carregando, name, redirect, loginButtonDisabled } = this.state;
    return (
      <div data-testid="page-login" className="login_page">
        <div className="login_container">
          {carregando ? (
            <div className="login_loading_container">
              <Loading />
            </div>
          ) : (
            <>
              <div className="login_text_description">
                <h1>Welcome to TrybeTunes!</h1>
                <h2>The Trybe's Music Project</h2>
              </div>
              <form className="login_form">
                <label htmlFor="name">
                  Login
                  <input
                    className="input_login"
                    type="text"
                    data-testid="login-name-input"
                    name="name"
                    value={ name }
                    onChange={ this.onInputChange }
                    onKeyPress={(e) => this.onKeyUp(e)}
                  />
                </label>
                <button
                  className="btn_login"
                  type="button"
                  data-testid="login-submit-button"
                  disabled={ loginButtonDisabled }
                  onClick={ this.createUserByName }
                >
                  Login
                </button>
              </form>
            </>
          )}
        </div>
        { redirect && <Redirect to="/search" /> }

      </div>
    );
  }
}

export default Login;
