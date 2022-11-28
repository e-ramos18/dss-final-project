const rsa = require('node-rsa');
const fs = require('fs');
const path = require('path');

const GeneratePair = () => {
  const key = new rsa().generateKeyPair();
  const publicKey = key.exportKey('public');
  const privateKey = key.exportKey('private');

  fs.openSync(path.resolve('src/rsa-keys/public.pem'), 'w');
  fs.writeFileSync(path.resolve('src/rsa-keys/public.pem'), publicKey, 'utf8');

  fs.openSync(path.resolve('src/rsa-keys/private.pem'), 'w');
  fs.writeFileSync(
    path.resolve('src/rsa-keys/private.pem'),
    privateKey,
    'utf8',
  );
};

GeneratePair();
