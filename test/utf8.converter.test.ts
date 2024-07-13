import { WebBuffer } from '../src/index';
import { Utf8Converter } from '../src/converters/utf8.converter';

describe('Utf8 converter', () => {
  test(`Positive: utf8 to uint8array`, async () => {
    const utf8 = 'JihyunLab 지현랩';
    const uint8Array = new Uint8Array([
      74, 105, 104, 121, 117, 110, 76, 97, 98, 32, 236, 167, 128, 237, 152, 132,
      235, 158, 169,
    ]);

    const converter = WebBuffer.from(utf8, 'utf8');
    expect(uint8Array).toStrictEqual(converter.toUint8Array());
  });

  test(`Positive: utf8 to uint8array`, async () => {
    const utf8 = '';
    const uint8Array = new Uint8Array([]);

    const converter = WebBuffer.from(utf8, 'utf8');
    expect(uint8Array).toStrictEqual(converter.toUint8Array());
  });

  test(`Positive: uint8array to utf8`, async () => {
    const utf8 = 'JihyunLab 지현랩';
    const uint8Array = new Uint8Array([
      74, 105, 104, 121, 117, 110, 76, 97, 98, 32, 236, 167, 128, 237, 152, 132,
      235, 158, 169,
    ]);

    const converter = WebBuffer.from(uint8Array);
    expect(utf8).toBe(converter.toString());
  });

  test(`Positive: uint8array to utf8`, async () => {
    const utf8 = '';
    const uint8Array = new Uint8Array([]);

    const converter = WebBuffer.from(uint8Array);
    expect(utf8).toBe(converter.toString());
  });

  test(`Negative: utf8 - encoding and input do not match.`, async () => {
    const uint8Array = new Uint8Array([
      74, 105, 104, 121, 117, 110, 76, 97, 98, 32, 236, 167, 128, 237, 152, 132,
      235, 158, 169,
    ]);

    expect(() => {
      WebBuffer.from(uint8Array, 'utf8');
    }).toThrow(Error('encoding and input do not match.'));
  });

  test(`Negative: utf8 - encoding and input do not match.`, async () => {
    const utf8 = 'JihyunLab 지현랩';

    const spy = jest.spyOn(Utf8Converter as any, 'toUint8Array');
    spy.mockImplementation(() => {
      return undefined;
    });

    expect(() => {
      WebBuffer.from(utf8, 'utf8');
    }).toThrow(Error('encoding and input do not match.'));

    spy.mockReset();
    spy.mockRestore();
  });

  test(`Negative: uint8array - encoding and input do not match.`, async () => {
    const utf8 = 'JihyunLab 지현랩';

    expect(() => {
      WebBuffer.from(utf8);
    }).toThrow(Error('encoding and input do not match.'));
  });

  test(`Negative: Utf8Converter.toUint8Array() - null`, async () => {
    expect(Utf8Converter.toUint8Array(null as unknown as string)).toBeNull();
  });

  test(`Negative: Utf8Converter.toUint8Array() - empty utf8`, async () => {
    expect(Utf8Converter.toUint8Array('')).toStrictEqual(new Uint8Array(0));
  });

  test(`Negative: Utf8Converter.toUtf8() - null`, async () => {
    expect(Utf8Converter.toUtf8(null as unknown as Uint8Array)).toBeNull();
  });

  test(`Negative: Utf8Converter.toUtf8() - empty buffer`, async () => {
    expect(Utf8Converter.toUtf8(new Uint8Array(0))).toStrictEqual('');
  });
});
