import { format } from 'date-fns';

export const formatDate = (date: string) => {
  return format(date, 'MMMM do, yyyy');
}