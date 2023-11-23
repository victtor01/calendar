import { useRouter } from 'next/router';
import { FaChevronRight } from 'react-icons/fa';

export const convertToBreadcrumb = (pathname: string): Array<string> | undefined => {
  return pathname.split('/').filter(Boolean);
};