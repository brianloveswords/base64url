/// <reference path="../typings/index.d.ts" />

/**
 * Encoding type
 */
export declare type Encoding = "ascii" | "utf8" | "utf16le" | "ucs2" | "utf16le" | "base64" | "binary" | "hex"

/**
 * Encoded string or buffer
 */
export declare type EncodedString = string | Buffer;

import padString from "./pad-string";

function encode(input: EncodedString, encoding: string = "utf8"): string {
    if (Buffer.isBuffer(input)) {
        return fromBase64(input.toString("base64"));
    }
    return fromBase64(new Buffer(input as string, encoding).toString("base64"));
};

function decode(base64url: EncodedString, encoding: string = "utf8"): string {
    return new Buffer(toBase64(base64url), "base64").toString(encoding);
}

function toBase64(base64url: EncodedString): string {
    // We this to be a string so we can do .replace on it. If it's
    // already a string, this is a noop.
    let _base64url = base64url.toString();
    return padString(_base64url)
        .replace(/\-/g, "+")
        .replace(/_/g, "/");
}

function fromBase64(base64: EncodedString): string {
    let _base64 = base64.toString();
    return _base64
        .replace(/=/g, "")
        .replace(/\+/g, "-")
        .replace(/\//g, "_");
}

function toBuffer(base64url: EncodedString): Buffer {
    return new Buffer(toBase64(base64url), "base64");
}

export interface Base64Url {
    /**
     * Encode input to base64url
     * 
     * @param {EncodedString} input Incoming value
     * @param {string} [encoding]
     * @returns {string}
     */
    (input: EncodedString, encoding?: string): string;
    /**
     * Encode input to base64url
     * 
     * @param {EncodedString} input Incoming value
     * @param {string} [encoding]
     * @returns {string}
     */
    encode(input: EncodedString, encoding?: string): string;
    /**
     * Convert a base64url encoded string into a raw string
     * 
     * @param {EncodedString} base64url base64url encoded value
     * @param {string} [encoding]
     * @returns {string}
     */
    decode(base64url: EncodedString, encoding?: string): string;
    /**
     * Convert a base64url encoded string to a base64 encoded string 
     * 
     * @param {EncodedString} base64url base64url encoded value 
     * @returns {string}
     */
    toBase64(base64url: EncodedString): string;
    /**
     * Convert a base64 encoded string to a base64url encoded string
     * 
     * @param {EncodedString} base64 base64 encoded value
     * @returns {string}
     */
    fromBase64(base64: EncodedString): string;
    /**
     * Convert a base64url encoded string to a Buffer 
     * 
     * @param {EncodedString} base64url base64url encoded string
     * @returns {Buffer}
     */
    toBuffer(base64url: EncodedString): Buffer;
}

let base64url = encode as Base64Url;

base64url.encode = encode;
base64url.decode = decode;
base64url.toBase64 = toBase64;
base64url.fromBase64 = fromBase64;
base64url.toBuffer = toBuffer;

export default base64url;