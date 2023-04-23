import { useEffect, useState } from 'react';
import { TabContext, TabPanel } from '@mui/lab';
import { Tab, Tabs } from '@mui/material';

import notificationsData from '../../notificationsData';

import Main from '../main/Main';
import Notifications from '../notifications/Notifications';

import './app-container.scss';

const AppContainer = ({ setLoged }) => {
  const [notifications, setNotifications] = useState(notificationsData);
  const [unreadCount, setUnreadCount] = useState(null);

  useEffect(() => {
    setUnreadCount(
      notifications.filter((notification) => !notification.seen).length
    );
  }, [notifications]);

  const [value, setValue] = useState('0');
  const [userFirstName, setUserFirstName] = useState('');

  useEffect(() => {
    setUserFirstName(JSON.parse(localStorage.getItem('user')).name);
  }, []);

  const logout = () => {
    localStorage.removeItem('user');
    setLoged(false);
  };

  return (
    <div className="app-container">
      <TabContext value={value}>
        <div className="navbar flex-between">
          <Tabs value={value} onChange={(e, newValue) => setValue(newValue)}>
            <Tab sx={{ fontSize: '1.2rem' }} label="Главная" value="0" />
            <Tab
              sx={{ fontSize: '1.2rem' }}
              data-count={unreadCount > 9 ? '9+' : unreadCount}
              label="Уведомления"
              value="1"
            />
            {unreadCount !== 0 && (
              <div className="unread-count flex-center">
                {unreadCount > 9 ? '9+' : unreadCount}
              </div>
            )}
          </Tabs>
          <div className="user flex-center">
            <p className="name">{userFirstName}</p>
            <p className="logout" onClick={logout}>
              Выход
            </p>
            <div className="avatar flex-center">{userFirstName[0]}</div>
          </div>
        </div>
        <div className="wrapper flex-center">
          <TabPanel value="0">
            <Main />
          </TabPanel>
          <TabPanel value="1">
            <Notifications
              notifications={notifications}
              setNotifications={setNotifications}
            />
          </TabPanel>
        </div>
      </TabContext>
    </div>
  );
};

export default AppContainer;
