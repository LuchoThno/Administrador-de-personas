import JsBarcode from 'jsbarcode';

export const generateBarcode = (text: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      const canvas = document.createElement('canvas');
      JsBarcode(canvas, text, {
        format: 'CODE128',
        width: 2,
        height: 100,
        displayValue: true,
        fontSize: 20,
        margin: 10,
      });
      resolve(canvas.toDataURL('image/png'));
    } catch (error) {
      reject(error);
    }
  });
};