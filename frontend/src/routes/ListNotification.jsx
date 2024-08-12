import React, { useState, useEffect } from 'react';

const NotificationList = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Define the WebSocket connection
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzIzNDUxNzYwLCJpYXQiOjE3MjM0NTE0NjAsImp0aSI6ImIyYmZmZjY0Yjg5ODQ3YTdiNjZjNDlkYzlmYTNlYTVhIiwidXNlcl9pZCI6MX0.GbudbNNcrG5Odj-K1kNtp2aay7rbr-V9xUaqNtaGbzY";
    const ws = new WebSocket(`ws://127.0.0.1:9000/ws/notifications/?token=${token}`);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setNotifications(prevNotifications => {

        // Add the new notification
        return [
          ...prevNotifications,
          {
            timestamp: data.timestamp,
            notification_id: data.notification_id,
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
            <tr key={item.notification_id} scope="row">
              <td>{item.notification_id}</td>
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
