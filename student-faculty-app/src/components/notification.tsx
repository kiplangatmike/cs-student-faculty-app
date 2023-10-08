import React, { useState, useEffect } from 'react';

const Notification = ({ message, type, onClose }: {message: string, type: any, onClose: any}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, 3000); // Auto-close the notification after 3 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`bg-white absolute p-2 text-center mx-auto inset-x-1 rounded-[10px] top-5 notification ${type} ${visible ? 'visible' : 'hidden'} shadow-2xl border-2 border-red-800 ` }>
      {message}
    </div>
  );
};

export default Notification;
