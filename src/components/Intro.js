import React from 'react';
import Button from './Button';

class Intro extends React.Component {
  render() {
    return (
      <div className="intro">
        <div className="intro-bg">
          <img
            width="1170"
            height="650"
            src="./assets/pexels-alexandr-podvalny-1227513.jpeg"
            alt="Wheat"
          />
        </div>
        <div className="intro-content">
          <h1>Test assignment for front-end developer</h1>
          <p>
            What defines a good front-end developer is one that has skilled
            knowledge of HTML, CSS, JS with a vast understanding of User design
            thinking as they'll be building web interfaces with accessibility in
            mind. They should also be excited to learn, as the world of
            Front-End Development keeps evolving.
          </p>
          <Button buttonText="Sign up" />
        </div>
      </div>
    );
  }
}

export default Intro;
