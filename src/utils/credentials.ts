import { jsPDF } from 'jspdf';
import { Employee } from '../types/employee';

export const generateSingleCredential = async (
  employee: Employee,
  barcodeDataUrl: string
): Promise<Blob> => {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: [85.6, 54], // Standard credit card size
  });

  // Create credential content
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get canvas context');

  canvas.width = 1016; // 85.6mm at 300dpi
  canvas.height = 642; // 54mm at 300dpi

  // Background
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Company logo/name
  ctx.fillStyle = '#1e40af';
  ctx.font = 'bold 48px Arial';
  ctx.fillText('EMS', 40, 60);

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
  await new Promise((resolve) => {
    barcodeImg.onload = resolve;
    barcodeImg.src = barcodeDataUrl;
  });
  ctx.drawImage(barcodeImg, 40, 320, 440, 100);

  // If employee has a profile image, add it
  if (employee.profileImage) {
    const profileImg = new Image();
    profileImg.crossOrigin = 'anonymous';
    await new Promise((resolve) => {
      profileImg.onload = resolve;
      profileImg.src = employee.profileImage!;
    });
    ctx.drawImage(profileImg, 40, 100, 200, 200);
  } else {
    // Draw placeholder
    ctx.strokeStyle = '#e5e7eb';
    ctx.strokeRect(40, 100, 200, 200);
    ctx.font = 'bold 48px Arial';
    ctx.fillStyle = '#9ca3af';
    ctx.fillText(
      `${employee.firstName[0]}${employee.lastName[0]}`,
      100,
      200
    );
  }

  // Convert canvas to PDF
  const imgData = canvas.toDataURL('image/jpeg', 1.0);
  doc.addImage(imgData, 'JPEG', 0, 0, 85.6, 54);

  return doc.output('blob');
};

export const generateBatchCredentials = async (
  employees: Employee[],
  onProgress?: (progress: number) => void
): Promise<Blob> => {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: [85.6, 54],
  });

  for (let i = 0; i < employees.length; i++) {
    const employee = employees[i];
    if (i > 0) doc.addPage();

    // Generate individual credential
    const credentialBlob = await generateSingleCredential(
      employee,
      `data:image/svg+xml;base64,${btoa(employee.rut)}`
    );

    // Add to batch PDF
    const url = URL.createObjectURL(credentialBlob);
    doc.addPage();
    doc.addImage(url, 'JPEG', 0, 0, 85.6, 54);
    URL.revokeObjectURL(url);

    if (onProgress) {
      onProgress((i + 1) / employees.length);
    }
  }

  return doc.output('blob');
};