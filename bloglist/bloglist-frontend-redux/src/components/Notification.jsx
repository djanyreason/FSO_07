import { useSelector } from 'react-redux';
import { Alert } from 'react-bootstrap';

const Notification = () => {
  const notification = useSelector(({ notification }) =>
    notification.length === 0
      ? null
      : notification[notification.length - 1].content
  );

  if (!notification) return <div></div>;

  const style =
    notification.color === 'green'
      ? 'success'
      : notification.color === 'red'
      ? 'danger'
      : 'secondary';

  return <Alert variant={style}>{notification.content}</Alert>;
};

export default Notification;
