import React from 'react';
import { Redirect } from 'react-router-dom';
import '../CSS/ProfileEdit.css';
import { updateUser, getUser } from '../services/userAPI';
import Loading from './Loading';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      image: '',
      email: '',
      description: '',
      enviado: false,
      carregando: false,
    };
  }

  componentDidMount = async () => {
    this.setState({
      carregando: true,
    });
    const userInfos = await getUser();
    const { name, image, email, description } = userInfos;
    this.setState({
      name,
      image,
      email,
      description,
      carregando: false,
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { name, image, email, description } = this.state;
    const userInfos = {
      name, image, email, description,
    };
    updateUser(userInfos);
    this.setState({
      enviado: true,
    });
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { name, email, description, enviado, carregando } = this.state;
    return(
        <div className="profile_edit_component">
          { carregando ? <div className="loading_pe_container"><Loading /></div>
            : (
              <form className="form_profile">
                <div className="img_edit_container">
                  <label
                    htmlFor="file"
                    className="pe_img_edit"
                  >
                    Choose one picture - You need to inform one valid path
                    <input
                      type="text"
                      name="image"
                      alt="edit image"
                      onChange={ this.onInputChange }
                    />
                  </label>
                </div>
                <label className="pe_name_edit" htmlFor="name">
                  Edit your name
                  <input
                    type="text"
                    name="name"
                    value={ name }
                    onChange={ this.onInputChange }
                  />
                </label>
                <label className="pe_email_edit" htmlFor="email">
                  Edit your email
                  <input
                    type="email"
                    name="email"
                    value={ email }
                    onChange={ this.onInputChange }
                  />
                </label>
                <label
                  className="pe_description_edit"
                  htmlFor="description"
                >
                  Edit your description 
                  <textarea
                    name="description"
                    value={ description }
                    onChange={ this.onInputChange }
                  />
                </label>
                <button
                  type="submit"
                  onClick={ (e) => this.onSubmit(e) }
                >
                  Save
                </button>
                { enviado && location.reload() }
              </form>
            ) }
        </div>
    );
  }
}

export default ProfileEdit;
