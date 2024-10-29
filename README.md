# WTicket API

## Contents
- [Description](#description)
- [Usage](#usage)
- [Requirements](#requirements)
- [License](#license)

## Description

Easy to use TypeScript package for fetching data from the WTicket Soap API

## Usage

Install the **wticket-api** package with [NPM](https://www.npmjs.org/):
```sh
npm install wticket-api
```

You can then use the API by importing the package, creating a client and calling a function:
```js

import { WTicketAPI } from "wticket-api";

const { common } = new WTicketAPI({
  username: "USERNAME",
  password: "PASSWORD",
  url: "URL"
});

common.listRelations({ limit: 100 }).then(response => {
  console.log(response)
})
```

## Requirements
This package uses fast-xml-parser and strong-soap to communicate with the Soap API

## License
The wticket-api script is released under the
[MIT license](https://opensource.org/licenses/MIT).