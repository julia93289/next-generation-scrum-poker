

export const createQRCode = async (text: string): Promise<string> => {
  // Import qrcode library dynamically to avoid bundling it if not used
  const { toDataURL } = await import('qrcode');

  return new Promise((resolve, reject) => {
    toDataURL(text, (err, dataUrl) => {
      if (err) {
        reject(err);
      } else {
        resolve(dataUrl);
      }
    });
  });
};

