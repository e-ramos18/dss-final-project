import NodeRSA from 'node-rsa';
import fs from 'fs';
import path from 'path';

export const resDecrypt = (text: string, key: string) => {
  let keyPrivate = new NodeRSA(key);
  let decrypt = keyPrivate.decrypt(text, 'utf8');
  return decrypt;
};

export const rsaKeys = () => {
  const keys = new NodeRSA({b: 1024});
  const publicKey = keys.exportKey('public');
  const privateKey = keys.exportKey('private');
  return {
    publicKey: publicKey,
    privateKey: privateKey,
  };
};

export const getPublicKey = () => {
  const key = fs.readFileSync(path.resolve('src/rsa-keys/public.pem'), 'utf8');
  return key;
};

export const getPrivateKey = () => {
  const key = fs.readFileSync(path.resolve('src/rsa-keys/private.pem'), 'utf8');
  return key;
};
