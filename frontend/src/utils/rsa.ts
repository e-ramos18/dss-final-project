import NodeRSA from "node-rsa";

export const rsaEncrypt = (text: any, key: string) => {
  let keyPublic = new NodeRSA(key);
  const encrypted = keyPublic.encrypt(JSON.stringify(text), "base64");
  return encrypted;
};
