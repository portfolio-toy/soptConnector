import React, { Fragment } from 'react';

const Try = ({ tryInfo }) => {
  return (
    <Fragment>
      <div>
        {tryInfo.try} : {tryInfo.result}
      </div>
    </Fragment>
  );
};

export default Try;
