declare module "cbor-js" {
  function decode(buffer: ArrayBuffer): any;
  function encode(value: any): ArrayBuffer;
  const cbor: {
    decode: (buffer: ArrayBuffer) => any;
    encode: (value: any) => ArrayBuffer;
  };
  export default cbor;
}

