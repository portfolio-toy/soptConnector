import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileEducation = ({
  education: {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description
  }
}) => (
    <div>
      <h3 className="text-dark">{school}</h3>
      <p>
        <Moment format='YYYY/MM/DD'>{from}</Moment> - {!to ? 'Now'
          : <Moment format='YYYY/MM/DD'>{to}</Moment>}
      </p>
      <p>
        <strong>Degree : </strong> {degree}
      </p>
      <p>
        <strong>Field Of Study : </strong> {fieldofstudy}
      </p>
    </div>
  );

ProfileEducation.propTypes = {

};

export default ProfileEducation;