# @jihyunlab/web-buffer

[![Version](https://img.shields.io/npm/v/@jihyunlab/web-buffer.svg?style=flat-square)](https://www.npmjs.com/package/@jihyunlab/web-buffer?activeTab=versions) [![Downloads](https://img.shields.io/npm/dt/@jihyunlab/web-buffer.svg?style=flat-square)](https://www.npmjs.com/package/@jihyunlab/web-buffer) [![Last commit](https://img.shields.io/github/last-commit/jihyunlab/web-buffer.svg?style=flat-square)](https://github.com/jihyunlab/web-buffer/graphs/commit-activity) [![License](https://img.shields.io/github/license/jihyunlab/web-buffer.svg?style=flat-square)](https://github.com/jihyunlab/web-buffer/blob/master/LICENSE) [![Linter](https://img.shields.io/badge/linter-eslint-blue?style=flat-square)](https://eslint.org) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)\
[![Build](https://github.com/jihyunlab/web-buffer/actions/workflows/build.yml/badge.svg)](https://github.com/jihyunlab/web-buffer/actions/workflows/build.yml) [![Lint](https://github.com/jihyunlab/web-buffer/actions/workflows/lint.yml/badge.svg)](https://github.com/jihyunlab/web-buffer/actions/workflows/lint.yml) [![Prettier](https://github.com/jihyunlab/web-buffer/actions/workflows/prettier.yml/badge.svg)](https://github.com/jihyunlab/web-buffer/actions/workflows/prettier.yml) [![codecov](https://codecov.io/gh/jihyunlab/web-buffer/graph/badge.svg?token=QJX5G75FXA)](https://codecov.io/gh/jihyunlab/web-buffer)

@jihyunlab/web-buffer provides data conversion capabilities in web application environments where Node.js's Buffer class cannot be used.

## Installation

```bash
npm i @jihyunlab/web-buffer
```

## Usage

You can create a buffer and convert data based on encoding type.\
Encoding types are provided for Hex, Base64, Base64URL, UTF-8, and Uint8Array data.

```
import { WebBuffer } from '@jihyunlab/web-buffer';

const buffer = WebBuffer.from(
  'jihyunlab',
  'utf8' /* hex, base64, base64url, utf8, uint8array */
);

const hex = buffer.toString('hex');
console.log(hex); // 6a696879756e6c6162

const base64 = buffer.toString('base64');
console.log(base64); // amloeXVubGFi

const base64Url = buffer.toString('base64url');
console.log(base64Url); // amloeXVubGFi

const utf8 = buffer.toString('utf8');
console.log(utf8); // jihyunlab

const uint8Array = buffer.toUint8Array();
console.log(uint8Array); // Uint8Array(9) [106, 105, 104, 121, 117, 110, 108, 97, 98]
```

Uint8Array data can create buffer without defining an encoding type.

```
const buffer = WebBuffer.from(
  new Uint8Array([106, 105, 104, 121, 117, 110, 108, 97, 98])
);
```

UTF-8 data can be converted without defining the encoding type.

```
const utf8 = buffer.toString();
```

## Credits

Authored and maintained by JihyunLab <<info@jihyunlab.com>>

## License

Open source [licensed as MIT](https://github.com/jihyunlab/web-buffer/blob/master/LICENSE).
