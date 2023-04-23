import React, { useEffect, useRef } from 'react';
import Hunt from 'huntjs';

import './notifications.scss';

const Notifications = ({ notifications, setNotifications }) => {
  const unreadMessages = notifications.filter((el) => !el.seen);
  const refs = useRef(unreadMessages.map(() => React.createRef()));

  const isInViewport = (element) => {
    if (element) {
      const rect = element.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <=
          (window.innerWidth || document.documentElement.clientWidth)
      );
    }
  };

  const checkAndRead = () => {
    let observer = new Hunt(
      refs.current.map((ref) => ref.current),
      {
        enter: (ref) => {
          setTimeout(() => {
            ref.className = 'notification readed';
            setNotifications(prev => prev.map(notification => {
              if (notification.id + "" === ref.id) {
                return {
                  ...notification,
                  seen: true
                }
              }
              return notification
            }))
          }, 5000);
        },
      }
    );
  };

  window.onscroll = () => {
    if (unreadMessages.length) {
      checkAndRead();
    }
  };

  useEffect(() => {
    if (unreadMessages.length) {
      checkAndRead();
    }
  }, []);

  return (
    <div className="notifications flex-column">
      {notifications.map(({ id, seen, category, message }, i) => {
        return (
          <div
            ref={refs.current[i]}
            className={`notification ${seen ? 'readed' : 'unreaded'}`}
            id={id}
            key={i}
          >
            <div className="flex-center">
              <span className="unread"></span>
              <h2>{category}</h2>
            </div>
            <p>{message}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Notifications;
