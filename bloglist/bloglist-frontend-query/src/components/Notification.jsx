import { useNotificationContent } from '../Contexts/NotificationContext';

const Notification = () => {
  const notification = useNotificationContent();

  if (!notification.content) return null;

  const style = {
    color: notification.color,
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  };

  return <div style={style}>{notification.content}</div>;
};

export default Notification;
