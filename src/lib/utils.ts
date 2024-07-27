import cryptoEngine from 'crypto';
import { Environment } from './constants';

export const encryptString = (plain: string) => {
  const key = cryptoEngine.createCipher('aes-128-cbc', Environment.SESSION_ENCRYPT_KEY);
  const encrypted = key.update(plain, 'utf8', 'hex') + key.final('hex');
  return encrypted;
};

export const decryptString = (encrypted: string) => {
  const key = cryptoEngine.createDecipher('aes-128-cbc', Environment.SESSION_ENCRYPT_KEY);
  const plain = key.update(encrypted, 'hex', 'utf-8') + key.final('utf-8');
  return plain;
};