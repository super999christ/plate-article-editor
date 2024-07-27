import { NextApiRequest } from 'next';
import { cookies } from 'next/headers';
import { decryptString } from '../utils';

export const getCurrentUser = (req?: NextApiRequest) => {
  const value = (req
    ? req.cookies.session
    : cookies().get('session')?.value) || '';
  try {
    return JSON.parse(decryptString(value)).user;
  } catch (err) {
    return null;
  }
};