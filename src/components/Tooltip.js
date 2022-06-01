import React from 'react';

const Tooltip = (props) => {
  return (
    <div className="tooltip">
      {props.children}
      <div className="tooltip-message">{props.message}</div>
    </div>
  );
};

export default Tooltip;
