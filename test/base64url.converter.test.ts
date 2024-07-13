import { WebBuffer } from '../src/index';
import { Base64UrlConverter } from '../src/converters/base64url.converter';

describe('Base64Url converter', () => {
  test(`Positive: base64url to uint8array`, async () => {
    const base64Url =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    const uint8Array = new Uint8Array([
      0, 16, 131, 16, 81, 135, 32, 146, 139, 48, 211, 143, 65, 20, 147, 81, 85,
      151, 97, 150, 155, 113, 215, 159, 130, 24, 163, 146, 89, 167, 162, 154,
      171, 178, 219, 175, 195, 28, 179, 211, 93, 183, 227, 158, 187, 243, 223,
      191,
    ]);

    const converter = WebBuffer.from(base64Url, 'base64url');
    expect(uint8Array).toStrictEqual(converter.toUint8Array());
  });

  test(`Positive: base64url to uint8array`, async () => {
    const base64Url = '';
    const uint8Array = new Uint8Array([]);

    const converter = WebBuffer.from(base64Url, 'base64url');
    expect(uint8Array).toStrictEqual(converter.toUint8Array());
  });

  test(`Positive: uint8array to base64url`, async () => {
    const base64Url =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    const uint8Array = new Uint8Array([
      0, 16, 131, 16, 81, 135, 32, 146, 139, 48, 211, 143, 65, 20, 147, 81, 85,
      151, 97, 150, 155, 113, 215, 159, 130, 24, 163, 146, 89, 167, 162, 154,
      171, 178, 219, 175, 195, 28, 179, 211, 93, 183, 227, 158, 187, 243, 223,
      191,
    ]);

    const converter = WebBuffer.from(uint8Array);
    expect(base64Url).toBe(converter.toString('base64url'));
  });

  test(`Positive: uint8array to base64url`, async () => {
    const base64Url = '';
    const uint8Array = new Uint8Array([]);

    const converter = WebBuffer.from(uint8Array);
    expect(base64Url).toBe(converter.toString('base64url'));
  });

  test(`Positive: uint8array to base64url`, async () => {
    const base64Url = 'AA==';
    const uint8Array = new Uint8Array([0]);

    const converter = WebBuffer.from(uint8Array);
    expect(base64Url).toBe(converter.toString('base64url'));
  });

  test(`Negative: base64url - encoding and input do not match.`, async () => {
    const uint8Array = new Uint8Array([
      0, 16, 131, 16, 81, 135, 32, 146, 139, 48, 211, 143, 65, 20, 147, 81, 85,
      151, 97, 150, 155, 113, 215, 159, 130, 24, 163, 146, 89, 167, 162, 154,
      171, 178, 219, 175, 195, 28, 179, 211, 93, 183, 227, 158, 187, 243, 223,
      191,
    ]);

    expect(() => {
      WebBuffer.from(uint8Array, 'base64url');
    }).toThrow(Error('encoding and input do not match.'));
  });

  test(`Negative: base64url - encoding and input do not match.`, async () => {
    const base64Url =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

    const spy = jest.spyOn(Base64UrlConverter as any, 'toUint8Array');
    spy.mockImplementation(() => {
      return undefined;
    });

    expect(() => {
      WebBuffer.from(base64Url, 'base64url');
    }).toThrow(Error('encoding and input do not match.'));

    spy.mockReset();
    spy.mockRestore();
  });

  test(`Negative: uint8array - encoding and input do not match.`, async () => {
    const base64Url =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

    expect(() => {
      WebBuffer.from(base64Url);
    }).toThrow(Error('encoding and input do not match.'));
  });

  test(`Negative: Base64UrlConverter.toUint8Array() - null`, async () => {
    expect(
      Base64UrlConverter.toUint8Array(null as unknown as string)
    ).toBeNull();
  });

  test(`Negative: Base64UrlConverter.toUint8Array() - empty base64url`, async () => {
    expect(Base64UrlConverter.toUint8Array('')).toStrictEqual(
      new Uint8Array(0)
    );
  });

  test(`Negative: Base64UrlConverter.toBase64() - null`, async () => {
    expect(
      Base64UrlConverter.toBase64Url(null as unknown as Uint8Array)
    ).toBeNull();
  });

  test(`Negative: Base64UrlConverter.toBase64() - empty buffer`, async () => {
    expect(Base64UrlConverter.toBase64Url(new Uint8Array(0))).toStrictEqual('');
  });
});
