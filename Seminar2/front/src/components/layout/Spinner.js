import React, { Fragment } from 'react';
import spinner from './spinner.png';

export default () => (
  <Fragment>
    <img
      src={spinner}
      style={{ width: '200px', margin: 'auto', display: 'black' }}
      alt='Loading...'
    />
  </Fragment>
)