import Ajv from 'ajv';

const ValidateMap = {
  "getInfo": {
    type: "object",
    properties: {
      a: {
        type: "string",
      },
      b: {
        type: "string",
      },
    },
  },
  "about": {
    type: "object",
    properties: {
      a: {
        type: "string",
      },
      b: {
        type: "string",
      },
    },
  },
};

export function ValidateApi(url,data) {
  const validate = Object.keys(ValidateMap).find(z => z === url);
  if (!validate) {
    return;
  } else {
    const ajv = new Ajv();
    const isPass = ajv.validate(ValidateMap[validate],data);
    if (!isPass) {
      console.error(`api ${url} response data error:`,ajv.errors);
    }
  }
}
