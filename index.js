function base64url(stringOrBuffer) {
  const b64url = Buffer(stringOrBuffer).toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
  return b64url;
};

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

module.exports = base64url;