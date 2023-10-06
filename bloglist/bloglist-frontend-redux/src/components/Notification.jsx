import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector(({ notification }) =>
    notification.length === 0
      ? null
      : notification[notification.length - 1].content
  );

  if (!notification) return <div></div>;

  const style = {
    color: notification.color,
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    marginTop: 10
  };

  return <div style={style}>{notification.content}</div>;
};

export default Notification;
