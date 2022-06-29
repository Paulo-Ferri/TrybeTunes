import React from 'react';
import ProfileEdit from './ProfileEdit';
import { Dialog } from '@headlessui/react';
import { RiCloseCircleFill } from 'react-icons/ri';
import { getUser } from '../services/userAPI';
import '../CSS/Profile.css';
import Loading from './Loading';
import profile_placeholder from '../img/profile_placeholder.svg';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      userInfos: {},
      carregando: false,
      isOpen: false,
    };
  }


  closeModal = () => {
    this.setState({
      isOpen: false,
    })
  };

  openModal = () => {
    this.setState({
      isOpen: true,
    })
  };

  componentDidMount = async () => {
    this.setState({
      carregando: true,
    });
    const user = await getUser();
    this.setState({
      userInfos: user,
      carregando: false,
    });
  };

  render() {
    const {
      userInfos: { name, description, email, image },
      carregando, isOpen
    } = this.state;
    return (
        <div className="profile_component">
          {carregando ? (
            <div className="loading_profile_container">
              <Loading />
            </div>
          ) : (
            <div className="profile_container">
              <div className="img_and_profile_edit">
                <img src={image ? image : profile_placeholder} />
                <button type="button" onClick={this.openModal} className="link_profile_edit">
                  Edit Profile
                </button>
              </div>
              <div className="profile_details">
                <Dialog as="div" open={isOpen} onClose={this.closeModal} className="edit_profile_modal">
                  <div className="dialog_modal_background" aria-hidden="true" />
                  <div className="fullscreen_modal_container">
                    <ProfileEdit />
                    <button onClick={this.closeModal}>{<RiCloseCircleFill />}</button>
                  </div>
                </Dialog>
                <h1>Name</h1>
                <p>{name}</p>
                <h1>Email</h1>
                <p>{email ? email : <i>You don't have a registered email yet.</i>}</p>
                <h1>Description</h1>
                <p>{description ? description : <i>You don't have a description.</i>}</p>
              </div>
            </div>
          )}
        </div>
    );
  }
}

export default Profile;
