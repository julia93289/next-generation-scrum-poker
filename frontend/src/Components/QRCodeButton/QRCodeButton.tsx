


import { useState } from 'preact/compat';
import { QRCodePopup } from '../QRCodePopup/QRCodePopup';
import { BUTTON_SHOW_QR_CODE } from '../../constants';
import sharedClasses from '../../styles.module.css';

export const QRCodeButton = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  return (
    <>
      <button class={sharedClasses.button} onClick={handleOpenPopup}>
        {BUTTON_SHOW_QR_CODE}
      </button>
      <QRCodePopup
        url={`${location.href}`}
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
      />
    </>
  );
};


