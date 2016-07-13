/// <reference path="../typings/index.d.ts" />

import padString from "./pad-string";

function encode(input: string | Buffer, encoding: string = "utf8"): string {
    if (Buffer.isBuffer(input)) {
        return fromBase64(input.toString("base64"));
    }
    return fromBase64(new Buffer(input as string, encoding).toString("base64"));
};

function decode(base64url: string, encoding: string = "utf8"): string {
    return new Buffer(toBase64(base64url), "base64").toString(encoding);
}

function toBase64(base64url: string | Buffer): string {
    // We this to be a string so we can do .replace on it. If it's
    // already a string, this is a noop.
    base64url = base64url.toString();
    return padString(base64url)
        .replace(/\-/g, "+")
        .replace(/_/g, "/");
}

function fromBase64(base64: string): string {
    return base64
        .replace(/=/g, "")
        .replace(/\+/g, "-")
        .replace(/\//g, "_");
}

function toBuffer(base64url: string): Buffer {
    return new Buffer(toBase64(base64url), "base64");
}

export interface Base64Url {
    (input: string | Buffer, encoding?: string): string;
    encode(input: string | Buffer, encoding?: string): string;
    decode(base64url: string, encoding?: string): string;
    toBase64(base64url: string | Buffer): string;
    fromBase64(base64: string): string;
    toBuffer(base64url: string): Buffer;
}

let base64url = encode as Base64Url;

base64url.encode = encode;
base64url.decode = decode;
base64url.toBase64 = toBase64;
base64url.fromBase64 = fromBase64;
base64url.toBuffer = toBuffer;

export default base64url;
