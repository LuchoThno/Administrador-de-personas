import { format as fnsFormat, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

export const formatDate = (date: string | Date, formatStr: string = 'dd/MM/yyyy'): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return fnsFormat(dateObj, formatStr, { locale: es });
};

export const formatDateTime = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return fnsFormat(dateObj, 'dd/MM/yyyy HH:mm', { locale: es });
};

export const formatTime = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return fnsFormat(dateObj, 'HH:mm', { locale: es });
};

export const formatDateLong = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return fnsFormat(dateObj, "EEEE d 'de' MMMM, yyyy", { locale: es });
};

export const formatDateShort = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return fnsFormat(dateObj, 'dd MMM yyyy', { locale: es });
};