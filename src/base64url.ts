import padString from './pad-string';

/**
 * Check if the given input is a buffer.
 * @param input The input to check.
 * @returns True if the input is a buffer, false otherwise.
 */
function isBuffer(input: any): input is Buffer {
  return typeof Buffer !== 'undefined' && Buffer.isBuffer(input);
}

/**
 * Convert a string to a buffer.
 * @param string The string to convert.
 * @param encoding The encoding to use.
 * @returns The buffer.
 */
function bufferFromString(
  string: string,
  encoding: BufferEncoding
): ArrayBuffer | Buffer {
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(string, encoding);
  } else {
    const encoder = new TextEncoder();
    return encoder.encode(string);
  }
}

/**
 * Convert a buffer to a string.
 * @param buffer The buffer to convert.
 * @param encoding  The encoding to use.
 * @returns The string.
 */
function stringFromBuffer(
  buffer: ArrayBuffer | Buffer,
  encoding: BufferEncoding
): string {
  if (typeof Buffer !== 'undefined' && buffer instanceof Buffer) {
    return buffer.toString(encoding);
  } else {
    const decoder = new TextDecoder(encoding);
    return decoder.decode(buffer);
  }
}

/**
 * Convert a base64url string to a buffer.
 * @param base64url The base64url string to convert.
 * @returns The buffer.
 */
function toBuffer(base64url: string): ArrayBuffer | Buffer {
  return bufferFromString(toBase64(base64url), 'base64');
}

/**
 * Encode a string or buffer to a base64url string.
 * @param input The input to encode.
 * @param encoding The encoding to use.
 * @returns The base64url string.
 */
function encode(
  input: string | Buffer,
  encoding: BufferEncoding = 'utf8'
): string {
  if (isBuffer(input)) {
    return fromBase64(stringFromBuffer(input, 'base64'));
  }
  return fromBase64(
    stringFromBuffer(bufferFromString(input, encoding), 'base64')
  );
}

/**
 * Decode a base64url string to a string.
 * @param base64url The base64url string to decode.
 * @param encoding The encoding to use.
 * @returns The string.
 */
function decode(base64url: string, encoding: BufferEncoding = 'utf8'): string {
  return stringFromBuffer(toBuffer(base64url), encoding);
}

/**
 * Convert a base64url string to a base64 string.
 * @param base64url The base64url string to convert.
 * @returns The base64 string.
 */
function toBase64(base64url: string | ArrayBuffer | Buffer): string {
  if (base64url instanceof ArrayBuffer) {
    base64url = stringFromBuffer(base64url, 'utf8');
  } else if (isBuffer(base64url)) {
    base64url = base64url.toString();
  }

  return padString(base64url).replace(/\-/g, '+').replace(/_/g, '/');
}

/**
 * Convert a base64 string to a base64url string.
 * @param base64 The base64 string to convert.
 * @returns The base64url string.
 */
function fromBase64(base64: string): string {
  return base64.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

/**
 * The base64url object.
 */
export interface Base64Url {
  (input: string | Buffer, encoding?: string): string;
  encode(input: string | Buffer, encoding?: string): string;
  decode(base64url: string, encoding?: string): string;
  toBase64(base64url: string | Buffer): string;
  fromBase64(base64: string): string;
  toBuffer(base64url: string): Buffer | ArrayBuffer;
}

let base64url = encode as Base64Url;

base64url.encode = encode;
base64url.decode = decode;
base64url.toBase64 = toBase64;
base64url.fromBase64 = fromBase64;
base64url.toBuffer = toBuffer;

export default base64url;
