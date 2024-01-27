export const decodeHash = (hash: string) => {
  const buff = Buffer.from(hash, "base64");
  const text = buff.toString("ascii");

  return text;
};
