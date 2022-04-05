const Notification = ({ message, type }) => {
  return (
    message && (
      <div className={`${type !== 'error' ? type : 'err'}`}>
        <p>{message}</p>
      </div>
    )
  );
};

export default Notification;
