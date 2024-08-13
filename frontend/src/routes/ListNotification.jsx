import React, { useState, useEffect } from 'react';

const NotificationList = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Define the WebSocket connection
    const ws_url = `${import.meta.env.VITE_WEBSOCKERT_URL}/ws/notifications/?token=${import.meta.env.VITE_WS_TOKEN}`
    const ws = new WebSocket(ws_url)

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
      setNotifications(prevNotifications => {

        // Add the new notification
        return [
          ...prevNotifications,
          {
            timestamp: data.timestamp,
            id: data.id,
            message: data.message,
          }
        ];
      });
    };

    ws.onclose = () => {
      console.log('WebSocket closed');
    };

    // Cleanup on component unmount
    return () => {
      ws.close();
    };
  }, []); // Empty dependency array means this effect runs once after the initial render

  return (
    <div className="container border">
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Message</th>
            <th scope="col">Timestamp</th>
          </tr> 
        </thead>
        <tbody>
          {notifications.map((item) => (
            <tr key={item.id} scope="row">
              <td>{item.id}</td>
              <td>{item.message}</td>
              <td>{item.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export { NotificationList };
