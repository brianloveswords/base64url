function base64url(stringOrBuffer) {
  return fromBase64(Buffer(stringOrBuffer).toString('base64'));
}

function fromBase64(b64string) {
  return (
    b64string
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
  );
}

function padString(string) {
  const segmentLength = 4;
  const stringLength = string.length;
  const diff = string.length % segmentLength;

  if (!diff)
    return string;

  var position = stringLength;
  var padLength = segmentLength - diff;
  const paddedStringLength = stringLength + padLength;
  const buffer = Buffer(paddedStringLength);
  buffer.write(string);
  while (padLength--)
    buffer.write('=', position++);
  return buffer.toString();
}

base64url.toBase64 = function toBase64(base64UrlString) {
  const b64str = padString(base64UrlString)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');
  return b64str;
};

base64url.fromBase64 = fromBase64;

module.exports = base64url;