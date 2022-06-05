import React, { useState, useEffect, useRef } from 'react';
import Button from './Button';
import InputRadio from './InputRadio';
import Input from './Input';

const validEmailRegex = RegExp(
  /^(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/gm
);
const validTelRegex = RegExp(`^[+]{0,1}380([0-9]{9})$`);

const Form = (props) => {
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    tel: '',
    img: '',
    positions: props.positionsError,
  });
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [phoneValue, setPhoneValue] = useState('');
  const [imageName, setImageName] = useState('');
  const [positionId, setPositionId] = useState(1);
  const fileInputRef = useRef();

  const onRadioChange = (event) => {
    setPositionId(event.target.id[event.target.id.length - 1]);
  };

  const isSubmitDisabled = () => {
    if (nameValue && emailValue && phoneValue && imageName) {
      if (
        !errors.email &&
        !errors.name &&
        !errors.img &&
        !errors.tel &&
        !errors.positions
      ) {
        return false;
      }
    }

    return true;
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitDisabled()) {
      return;
    }

    const response = await fetch(
      'https://frontend-test-assignment-api.abz.agency/api/v1/token'
    );
    const { token } = await response.json();
    let formData = new FormData();

    formData.append('position_id', positionId);
    formData.append('name', nameValue);
    formData.append('email', emailValue);
    formData.append('phone', phoneValue);
    formData.append('photo', fileInputRef.current.files[0]);

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
          setIsSubmitSuccess(true);
          props.onSubmitSuccess();
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

  const onFileChange = (e) => {
    const setErrorImageMessage = (message) => {
      setErrors({
        ...errors,
        img: message,
      });
    };

    if (e.target.files && e.target.files[0]) {
      const img = document.createElement('img');
      const type = e.target.files[0].type.replace('image/', '');

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

  const onInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;

    switch (name) {
      case 'name':
        setNameValue(value);
        errors.name =
          value.length < 2 || value.length > 60
            ? 'Full Name must be at least 2 characters long but no more than 60!'
            : '';
        break;
      case 'email':
        setEmailValue(value);
        errors.email = validEmailRegex.test(value) ? '' : 'Email is not valid!';
        break;
      case 'tel':
        setPhoneValue(value);
        errors.tel = validTelRegex.test(value) ? '' : '+38 (XXX) XXX - XX - XX';
        break;
      default:
        break;
    }

    setErrors({ ...errors });
  };

  const renderPositions = () => {
    if (errors.positions !== '') {
      return null;
    }

    return props.positions.map((position) => {
      return (
        <InputRadio
          name="position"
          value={position.name}
          id={'position' + position.id}
          key={position.id}
          onChange={(e) => onRadioChange(e)}
          defaultChecked={positionId === position.id}
        />
      );
    });
  };

  const renderInputs = () => {
    return (
      <>
        <Input
          id="name"
          name="name"
          type="text"
          label="Your name"
          error={errors.name}
          value={nameValue}
          onChange={onInputChange}
        />
        <Input
          id="email"
          name="email"
          type="email"
          label="Email"
          error={errors.email}
          value={emailValue}
          onChange={onInputChange}
        />
        <Input
          id="phone"
          name="tel"
          type="tel"
          label="Phone"
          error={errors.tel}
          value={phoneValue}
          onChange={onInputChange}
          helperText="+38 (XXX) XXX - XX - XX"
        />
        <div>
          <p>{errors.positions || 'Select your position'}</p>
          <div className="form-radio">{renderPositions()}</div>
        </div>
        <div>
          <div className="input-file">
            <input
              type="file"
              onChange={onFileChange}
              ref={fileInputRef}
              id="input-file"
            />
            <label htmlFor="input-file">Upload</label>
            <div className="input-file-text">
              {imageName || 'Upload your photo'}
            </div>
            <div className="input-helper">{errors.img}</div>
          </div>
        </div>
        <Button buttonText="Sign up" disabled={isSubmitDisabled()} />
      </>
    );
  };

  const renderSuccessImage = () => {
    return (
      <div className="form-success">
        <img src="./assets/success-image.svg" alt="Success" />
      </div>
    );
  };

  return (
    <form noValidate onSubmit={onSubmit} autoComplete="off" className="form">
      <h2>
        {isSubmitSuccess
          ? 'User successfully registered'
          : 'Working with POST request'}
      </h2>
      <div className="form-wrapper">
        {isSubmitSuccess ? renderSuccessImage() : renderInputs()}
      </div>
    </form>
  );
};

export default Form;
