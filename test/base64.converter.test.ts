import { WebBuffer } from '../src/index';
import { Base64Converter } from '../src/converters/base64.converter';

describe('Base64 converter', () => {
  test(`Positive: base64 to uint8array`, async () => {
    const base64 = 'amloeXVubGFi';
    const uint8Array = new Uint8Array([
      106, 105, 104, 121, 117, 110, 108, 97, 98,
    ]);

    const converter = WebBuffer.from(base64, 'base64');
    expect(uint8Array).toStrictEqual(converter.toUint8Array());
  });

  test(`Positive: base64 to uint8array`, async () => {
    const base64 = '';
    const uint8Array = new Uint8Array([]);

    const converter = WebBuffer.from(base64, 'base64');
    expect(uint8Array).toStrictEqual(converter.toUint8Array());
  });

  test(`Positive: uint8array to base64`, async () => {
    const base64 = 'amloeXVubGFi';
    const uint8Array = new Uint8Array([
      106, 105, 104, 121, 117, 110, 108, 97, 98,
    ]);

    const converter = WebBuffer.from(uint8Array);
    expect(base64).toBe(converter.toString('base64'));
  });

  test(`Positive: uint8array to base64`, async () => {
    const base64 = '';
    const uint8Array = new Uint8Array([]);

    const converter = WebBuffer.from(uint8Array);
    expect(base64).toBe(converter.toString('base64'));
  });

  test(`Positive: uint8array to base64`, async () => {
    const base64 = 'AA==';
    const uint8Array = new Uint8Array([0]);

    const converter = WebBuffer.from(uint8Array);
    expect(base64).toBe(converter.toString('base64'));
  });

  test(`Negative: base64 - encoding and input do not match.`, async () => {
    const uint8Array = new Uint8Array([
      106, 105, 104, 121, 117, 110, 108, 97, 98,
    ]);

    expect(() => {
      WebBuffer.from(uint8Array, 'base64');
    }).toThrow(Error('encoding and input do not match.'));
  });

  test(`Negative: base64 - encoding and input do not match.`, async () => {
    const base64 = 'amloeXVubGFi';

    const spy = jest.spyOn(Base64Converter as any, 'toUint8Array');
    spy.mockImplementation(() => {
      return undefined;
    });

    expect(() => {
      WebBuffer.from(base64, 'base64');
    }).toThrow(Error('encoding and input do not match.'));

    spy.mockReset();
    spy.mockRestore();
  });

  test(`Negative: uint8array - encoding and input do not match.`, async () => {
    const base64 = 'amloeXVubGFi';

    expect(() => {
      WebBuffer.from(base64);
    }).toThrow(Error('encoding and input do not match.'));
  });

  test(`Negative: Base64Converter.toUint8Array() - null`, async () => {
    expect(Base64Converter.toUint8Array(null as unknown as string)).toBeNull();
  });

  test(`Negative: Base64Converter.toUint8Array() - empty base64`, async () => {
    expect(Base64Converter.toUint8Array('')).toStrictEqual(new Uint8Array(0));
  });

  test(`Negative: Base64Converter.toBase64() - null`, async () => {
    expect(Base64Converter.toBase64(null as unknown as Uint8Array)).toBeNull();
  });

  test(`Negative: Base64Converter.toBase64() - empty buffer`, async () => {
    expect(Base64Converter.toBase64(new Uint8Array(0))).toStrictEqual('');
  });
});
