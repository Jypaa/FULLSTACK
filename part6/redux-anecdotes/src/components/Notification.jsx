import React, { useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { setNotification } from '../reducers/notificationReducer';

const Notification = () => {
  const dispatch = useDispatch()
  const notification = useSelector((state) => state.notification);

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  };

  useEffect(() => {
    if (notification) {
      const timeoutId = setTimeout(() => {
        dispatch(setNotification('')); 
      }, 5000); 

      return () => clearTimeout(timeoutId);
    }
  }, [notification, dispatch]);

  return (
    <div style={style}>
      {notification}
    </div>
  );
};

export default Notification;
