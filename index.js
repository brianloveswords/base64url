function fromBase64(base64string) {
  return (
    base64string
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
  );
}

function toBase64(base64UrlString) {
  return Buffer(base64UrlString, 'base64').toString('base64');
}

function decodeBase64Url(base64UrlString, encoding) {
  return Buffer(base64UrlString, 'base64').toString(encoding);
}

function base64url(stringOrBuffer) {
  return fromBase64(Buffer(stringOrBuffer).toString('base64'));
}

function toBuffer(base64string) {
  return Buffer(toBase64(base64string), 'base64');
}

base64url.toBase64 = toBase64;
base64url.fromBase64 = fromBase64;
base64url.decode = decodeBase64Url;
base64url.toBuffer = toBuffer;

module.exports = base64url;
