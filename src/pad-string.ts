export default function padString(input: string): string {
  const segmentLength = 4;
  const stringLength = input.length;
  const diff = stringLength % segmentLength;

  if (!diff) {
    return input;
  }

  const padLength = segmentLength - diff;

  // Check if Buffer is available (Node.js environment)
  if (typeof Buffer !== 'undefined') {
    let buffer = Buffer.alloc(stringLength + padLength, input);
    buffer.fill('=', stringLength);
    return buffer.toString();
  } else {
    // Fallback to string concatenation for browser environment
    return input + '='.repeat(padLength);
  }
}
