import PropTypes from 'prop-types';

const Notification = ({ notification, error }) => {
  if(!notification) return null;

  return <>
    {!error
      ? <div className="notification message">{notification}</div>
      : <div className="notification error">{notification}</div>
    }
  </>;
};

Notification.propTypes = {
};

export default Notification;