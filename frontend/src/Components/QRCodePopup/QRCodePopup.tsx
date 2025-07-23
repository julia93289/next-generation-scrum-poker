

import { useEffect, useRef, useState } from 'preact/compat';
import { createQRCode } from '../../helpers/qrCodeHelper';
import classes from './QRCodePopup.module.css';

interface QRCodePopupProps {
  url: string;
  isOpen: boolean;
  onClose: () => void;
}

export const QRCodePopup = ({ url, isOpen, onClose }: QRCodePopupProps) => {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && url) {
      createQRCode(url).then(setQrCodeDataUrl);
    }
  }, [isOpen, url]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div class={classes.popupOverlay}>
      <div class={classes.popupContent} ref={popupRef}>
        <button class={classes.closeButton} onClick={onClose}>
          &times;
        </button>
        {qrCodeDataUrl ? (
          <img src={qrCodeDataUrl} alt="QR Code" class={classes.qrCodeImage} />
        ) : (
          <div class={classes.loading}>Loading QR Code...</div>
        )}
      </div>
    </div>
  );
};

