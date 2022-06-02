import React from 'react';
import Button from './Button';

class Intro extends React.Component {
  render() {
    return (
      <div className="intro">
        <div className="intro-bg">
          <picture>
            <source
              type="image/webp"
              srcSet="./assets/intro.webp, ./assets/intro@2x.webp 2x"
            />
            <img
              src="./assets/intro.jpg"
              srcSet="./assets/intro@2x.jpg 2x"
              width="1170"
              height="650"
              alt="Поле"
            />
          </picture>
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
