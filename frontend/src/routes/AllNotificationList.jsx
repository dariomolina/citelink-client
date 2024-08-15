import React, { useEffect, useState } from 'react';

const AllNotificationList = () => {
  const [notifications, setNotifications] = useState([]);
  const [totalNotifications, setTotalNotifications] = useState(0);
  const [page, setPage] = useState(1);
  const pageSize = 100;

  useEffect(() => {
    const ws_url = `${import.meta.env.VITE_WEBSOCKERT_URL}/ws/notifications/?token=${import.meta.env.VITE_WS_TOKEN}`;
    const socket = new WebSocket(ws_url);

    const fetchNotifications = () => {
      socket.send(JSON.stringify({ 
        type: "notifications_list", 
        page: page, 
        page_size: pageSize 
      }));
    };

    socket.onopen = () => {
      fetchNotifications();
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('Received data:', data);

      if (data.type === "notifications_list") {
        const notificationsList = data.data;
        const total = data.total_pages;

        // Ensure notificationsList is an array before proceeding
        if (Array.isArray(notificationsList)) {
          setNotifications(prevNotifications => {
            return page === 1 
              ? [...notificationsList, ...prevNotifications] 
              : notificationsList;
          });
          setTotalNotifications(total);
        } else {
          console.error('notificationsList is not an array:', notificationsList);
        }
      } else if (data.type === "new_notification") {
        const newNotification = data.notification;
        setNotifications(prevNotifications => [newNotification, ...prevNotifications]);
        setTotalNotifications(prevTotal => prevTotal + 1);
      } else if (data.type === "read") {
        // Update the notification list to mark the item as read
        setNotifications(prevNotifications => prevNotifications.map(
          notification => notification.id === data.id 
            ? { ...notification, is_read: true }
            : notification
        ));
      } else if (data.type === "delete") {
        // Update the notification list to remove the deleted item
        setNotifications(prevNotifications => prevNotifications.filter(
          notification => notification.id !== data.id
        ));
      }
    };

    return () => {
      socket.close();
    };
  }, [page]);

  const markAsRead = (notificationId) => {
    const ws_url = `${import.meta.env.VITE_WEBSOCKERT_URL}/ws/notifications/?token=${import.meta.env.VITE_WS_TOKEN}`;
    const socket = new WebSocket(ws_url);
    
    socket.onopen = () => {
      socket.send(JSON.stringify({
        type: "read",
        id: notificationId
      }));
    };
  };

  const deleteNotification = (notificationId) => {
    const ws_url = `${import.meta.env.VITE_WEBSOCKERT_URL}/ws/notifications/?token=${import.meta.env.VITE_WS_TOKEN}`;
    const socket = new WebSocket(ws_url);
    
    socket.onopen = () => {
      socket.send(JSON.stringify({
        type: "deleted",
        id: notificationId
      }));
    };
  };
  
  const totalPages = Math.ceil(totalNotifications / pageSize);

  return (
    <div className="container border">
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Message</th>
            <th scope="col">Timestamp</th>
            <th scope="col">Is read</th>
            <th scope="col">Actions</th>
          </tr> 
        </thead>
        <tbody>
          {notifications.map((item) => (
            <tr key={item.id} scope="row">
              <td>{item.id}</td>
              <td>{item.message}</td>
              <td>{item.timestamp}</td>
              <td>{`${item.is_read}`}</td>
              <td>
                {!item.is_read && (
                  <button onClick={() => markAsRead(item.id)}>
                    Mark as Read
                  </button>
                )}
                <button onClick={() => deleteNotification(item.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export { AllNotificationList };
