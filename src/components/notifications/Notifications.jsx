import React, { memo, useEffect, useRef } from 'react';

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
    const readed = notifications.map((el, i) => {
      if (isInViewport(refs.current[i]?.current)) {
        return {
          ...el,
          seen: true,
        };
      }
      return el;
    });
    setTimeout(() => {
      setNotifications(readed);
    }, 5000);
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
            style={{
              backgroundColor: seen ? '#fff' : '#a8c3df71',
            }}
            id={id}
            className="notification"
            key={i}
          >
            <div className="flex-center">
              <span
                style={{
                  display: seen ? 'none' : 'block',
                }}
                className="unread"
              ></span>
              <h2>{category}</h2>
            </div>
            <p>{message}</p>
          </div>
        );
      })}
    </div>
  );
};

export default memo(Notifications);
