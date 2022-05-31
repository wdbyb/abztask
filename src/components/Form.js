import React from 'react';
import Button from './Button';
import InputRadio from './InputRadio';
import Input from './Input';

const validEmailRegex = RegExp(
  /^(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/gm
);
const validTelRegex = RegExp(`^[+]{0,1}380([0-9]{9})$`);

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isSubmitSuccess: false,
      positions: [],
      positionsError: '',
      name: '',
      email: '',
      tel: '',
      positionId: 1,
      imageName: '',
      errors: {
        name: '',
        email: '',
        tel: '',
        img: '',
      },
    };
    this.fileInput = React.createRef();
  }

  componentDidMount() {
    fetch('https://frontend-test-assignment-api.abz.agency/api/v1/positions')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          // process success response
          this.setState({ positions: data.positions, positionsError: '' });
        } else {
          this.setState({ positionsError: 'Positions not found' });
        }
      });
  }

  onRadioChange = (event) => {
    this.setState({ positionId: event.target.id[event.target.id.length - 1] });
  };

  isSubmitDisabled = () => {
    const { name, email, tel, imageName, errors } = this.state;

    if (name && email && tel && imageName) {
      if (!errors.email && !errors.name && !errors.img && !errors.tel) {
        return false;
      }
    }

    return true;
  };

  onSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(
      'https://frontend-test-assignment-api.abz.agency/api/v1/token'
    );
    const { token } = await response.json();
    let formData = new FormData();

    formData.append('position_id', this.state.positionId);
    formData.append('name', this.state.name);
    formData.append('email', this.state.email);
    formData.append('phone', this.state.tel);
    formData.append('photo', this.fileInput.current.files[0]);

    fetch('https://frontend-test-assignment-api.abz.agency/api/v1/users', {
      method: 'POST',
      body: formData,
      headers: {
        Token: token,
        // get token with GET api/v1/token method
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          // process success response
          this.setState({ isSubmitSuccess: true });
          this.props.onSubmitSuccess();
        } else {
          // proccess server errors
          console.log(data);
        }
      })
      .catch((error) => {
        // proccess network errors
        console.log(error);
      });
  };

  onFileChange = (e) => {
    const setErrorImageMessage = (message) => {
      this.setState((prevState) => ({
        errors: {
          ...prevState.errors,
          img: message,
        },
      }));
    };

    const setImageName = (imageName) => {
      this.setState({ imageName });
    };

    if (e.target.files && e.target.files[0]) {
      const img = document.createElement('img');
      const type = e.target.files[0].type.replace('image/', '');
      // this.state.backgroundImageFile = e.target.files[0];

      img.onload = function () {
        if (this.width < 70 || this.height < 70) {
          setErrorImageMessage('Image should be at least 70x70');
        } else if (e.target.files[0].size > 5000000) {
          setErrorImageMessage('Image should be less than 5MB');
        } else if (type !== 'jpeg' && type !== 'jpg') {
          setErrorImageMessage('Image type should be jpeg or jpg');
        } else {
          setErrorImageMessage('');
          setImageName(e.target.files[0].name);
        }
      };

      var reader = new FileReader();

      reader.onloadend = (event) => {
        img.src = event.target.result;
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  onInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    const { errors } = this.state;

    switch (name) {
      case 'name':
        errors.name =
          value.length < 2 || value.length > 60
            ? 'Full Name must be at least 2 characters long but no more than 60!'
            : '';
        break;
      case 'email':
        errors.email = validEmailRegex.test(value) ? '' : 'Email is not valid!';
        break;
      case 'tel':
        errors.tel = validTelRegex.test(value) ? '' : '+38 (XXX) XXX - XX - XX';
        break;
      default:
        break;
    }

    this.setState({ errors, [name]: value });
  };

  renderPositions() {
    if (this.state.positionsError !== '') {
      return null;
    }

    return this.state.positions.map((position) => {
      return (
        <InputRadio
          name="position"
          value={position.name}
          id={'position' + position.id}
          key={position.id}
          onChange={(e) => this.onRadioChange(e)}
          defaultChecked={this.state.positionId === position.id}
        />
      );
    });
  }

  renderInputs() {
    return (
      <>
        <Input
          name="name"
          type="text"
          label="Your name"
          error={this.state.errors.name}
          value={this.state.name}
          onChange={this.onInputChange}
        />
        <Input
          name="email"
          type="email"
          label="Email"
          error={this.state.errors.email}
          value={this.state.email}
          onChange={this.onInputChange}
        />
        <Input
          name="tel"
          type="tel"
          label="Phone"
          error={this.state.errors.tel}
          value={this.state.tel}
          onChange={this.onInputChange}
          helperText="+38 (XXX) XXX - XX - XX"
        />
        <div>
          <p>{this.state.positionsError || 'Select your position'}</p>
          <div className="form-radio">{this.renderPositions()}</div>
        </div>
        <div>
          <div className="input-file">
            <input
              type="file"
              onChange={this.onFileChange}
              ref={this.fileInput}
              id="input-file"
            />
            <label htmlFor="input-file">Upload</label>
            <div className="input-file-text">
              {this.state.imageName || 'Upload your photo'}
            </div>
            <div className="input-helper">{this.state.errors.img}</div>
          </div>
        </div>
        <Button buttonText="Sign up" disabled={this.isSubmitDisabled()} />
      </>
    );
  }

  renderSuccessImage() {
    return (
      <div className="form-success">
        <img src="./assets/success-image.svg" alt="Success" />
      </div>
    );
  }

  render() {
    return (
      <form
        noValidate
        onSubmit={this.onSubmit}
        autoComplete="off"
        className="form"
      >
        <h2>
          {this.state.isSubmitSuccess
            ? 'User successfully registered'
            : 'Working with POST request'}
        </h2>
        <div className="form-wrapper">
          {this.state.isSubmitSuccess
            ? this.renderSuccessImage()
            : this.renderInputs()}
        </div>
      </form>
    );
  }
}

export default Form;
