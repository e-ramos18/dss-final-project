import NodeRSA from "node-rsa";

export const rsaEncrypt = (text: string, key: string) => {
  let keyPublic = new NodeRSA(key);
  const encrypted = keyPublic.encrypt(text, "base64");
  return encrypted;
};
