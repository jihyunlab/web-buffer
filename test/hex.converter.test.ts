import { WebBuffer } from '../src/index';
import { HexConverter } from '../src/converters/hex.converter';

describe('Hex converter', () => {
  test(`Positive: hex to uint8array`, async () => {
    const hex = '6a696879756e6c6162';
    const uint8Array = new Uint8Array([
      106, 105, 104, 121, 117, 110, 108, 97, 98,
    ]);

    const converter = WebBuffer.from(hex, 'hex');
    expect(uint8Array).toStrictEqual(converter.toUint8Array());
  });

  test(`Positive: hex to uint8array`, async () => {
    const hex = '';
    const uint8Array = new Uint8Array([]);

    const converter = WebBuffer.from(hex, 'hex');
    expect(uint8Array).toStrictEqual(converter.toUint8Array());
  });

  test(`Positive: hex to uint8array`, async () => {
    const hex = '0';
    const uint8Array = new Uint8Array([0]);

    const converter = WebBuffer.from(hex, 'hex');
    expect(uint8Array).toStrictEqual(converter.toUint8Array());
  });

  test(`Positive: uint8array to hex`, async () => {
    const hex = '6a696879756e6c6162';
    const uint8Array = new Uint8Array([
      106, 105, 104, 121, 117, 110, 108, 97, 98,
    ]);

    const converter = WebBuffer.from(uint8Array);
    expect(hex).toBe(converter.toString('hex'));
  });

  test(`Positive: uint8array to hex`, async () => {
    const hex = '';
    const uint8Array = new Uint8Array([]);

    const converter = WebBuffer.from(uint8Array);
    expect(hex).toBe(converter.toString('hex'));
  });

  test(`Positive: uint8array to hex`, async () => {
    const hex = '00';
    const uint8Array = new Uint8Array([0]);

    const converter = WebBuffer.from(uint8Array);
    expect(hex).toBe(converter.toString('hex'));
  });

  test(`Negative: hex - encoding and input do not match.`, async () => {
    const uint8Array = new Uint8Array([
      106, 105, 104, 121, 117, 110, 108, 97, 98,
    ]);

    expect(() => {
      WebBuffer.from(uint8Array, 'hex');
    }).toThrow(Error('encoding and input do not match.'));
  });

  test(`Negative: hex - encoding and input do not match.`, async () => {
    const hex = '6a696879756e6c6162';

    const spy = jest.spyOn(HexConverter as any, 'toUint8Array');
    spy.mockImplementation(() => {
      return undefined;
    });

    expect(() => {
      WebBuffer.from(hex, 'hex');
    }).toThrow(Error('encoding and input do not match.'));

    spy.mockReset();
    spy.mockRestore();
  });

  test(`Negative: uint8array - encoding and input do not match.`, async () => {
    const hex = '6a696879756e6c6162';

    expect(() => {
      WebBuffer.from(hex);
    }).toThrow(Error('encoding and input do not match.'));
  });

  test(`Negative: HexConverter.toUint8Array() - null`, async () => {
    expect(HexConverter.toUint8Array(null as unknown as string)).toBeNull();
  });

  test(`Negative: HexConverter.toUint8Array() - empty hex`, async () => {
    expect(HexConverter.toUint8Array('')).toStrictEqual(new Uint8Array(0));
  });

  test(`Negative: HexConverter.toUint8Array() - not enough hex string`, async () => {
    expect(HexConverter.toUint8Array('1')).toStrictEqual(new Uint8Array([1]));
  });

  test(`Negative: HexConverter.toHex() - null`, async () => {
    expect(HexConverter.toHex(null as unknown as Uint8Array)).toBeNull();
  });

  test(`Negative: HexConverter.toHex() - empty buffer`, async () => {
    expect(HexConverter.toHex(new Uint8Array(0))).toStrictEqual('');
  });
});
