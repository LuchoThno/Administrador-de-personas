import { jsPDF } from 'jspdf';
import { Employee } from '../types/employee';

export const generateCredentialPDF = (
  employee: Employee,
  barcodeDataUrl: string,
  onComplete?: () => void
) => {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: [85.6, 54], // Standard credit card size
  });

  // Create credential content
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  canvas.width = 1016; // 85.6mm at 300dpi
  canvas.height = 642; // 54mm at 300dpi

  // Background
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Company logo/name
  ctx.fillStyle = '#1e40af';
  ctx.font = 'bold 48px Arial';
  ctx.fillText('EMS', 40, 60);

  // Employee photo placeholder or actual photo
  ctx.strokeStyle = '#e5e7eb';
  ctx.strokeRect(40, 100, 200, 200);
  
  const drawImage = () => {
    // Convert canvas to PDF
    const imgData = canvas.toDataURL('image/jpeg', 1.0);
    doc.addImage(imgData, 'JPEG', 0, 0, 85.6, 54);
    doc.save(`credential-${employee.rut}.pdf`);
    
    if (onComplete) {
      onComplete();
    }
  };

  if (employee.profileImage) {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      ctx.drawImage(img, 40, 100, 200, 200);
      
      // Employee information
      ctx.fillStyle = '#111827';
      ctx.font = 'bold 36px Arial';
      ctx.fillText(`${employee.firstName} ${employee.lastName}`, 280, 140);
      
      ctx.font = '24px Arial';
      ctx.fillStyle = '#4b5563';
      ctx.fillText(employee.position, 280, 180);
      ctx.fillText(employee.department, 280, 220);
      
      // Add barcode
      const barcodeImg = new Image();
      barcodeImg.onload = () => {
        ctx.drawImage(barcodeImg, 40, 320, 440, 100);
        drawImage();
      };
      barcodeImg.src = barcodeDataUrl;
    };
    img.src = employee.profileImage;
  } else {
    // Employee information without photo
    ctx.fillStyle = '#111827';
    ctx.font = 'bold 36px Arial';
    ctx.fillText(`${employee.firstName} ${employee.lastName}`, 280, 140);
    
    ctx.font = '24px Arial';
    ctx.fillStyle = '#4b5563';
    ctx.fillText(employee.position, 280, 180);
    ctx.fillText(employee.department, 280, 220);
    
    // Add barcode
    const barcodeImg = new Image();
    barcodeImg.onload = () => {
      ctx.drawImage(barcodeImg, 40, 320, 440, 100);
      drawImage();
    };
    barcodeImg.src = barcodeDataUrl;
  }
};