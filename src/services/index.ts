import { XMLBuilder, XMLParser } from "fast-xml-parser";

type WTicketBody = Record<string, string | number | boolean | object | undefined>

export class WTicketBase {
  constructor(protected readonly config: {
    url: string
    username: string
    password: Promise<string>
    nonce: string
    created: string
  }) {}

  protected async request(action: string, params: WTicketBody, type: "com" | "rel") {
    const response = await fetch(this.config.url, {
      method: "POST",
      headers: {
        "Content-Type": "text/xml;charset=UTF-8"
      },
      body: await this.createRequestBody(action, params, type)
    })
    if (response.ok) {
      return await response.text();
    } else {
      console.error(await response.text())
      console.log(response)
      throw Error(response.statusText);
    }
  }

  protected xmlParse(xml: string, name: string) {
    const parser = new XMLParser();
    const parsed = parser.parse(xml);
    return parsed["SOAP-ENV:Envelope"]["SOAP-ENV:Body"][`ns2:${name}-response`];
  }

  private createRequestBody(name: string, params: WTicketBody, type: "com" | "rel") {
    const getBody = () => {
      const body: Record<string, string | number | true | object> = {}
      for (const key in params) {
        const xml = `${type}:${key}`;
        if (params[key]) body[xml] = params[key]
      }
      return body
    }

    return this.createWSS(name, type, getBody());
  }

  private async createWSS(name: string, type: "com" | "rel", body: WTicketBody, wrap = true) {
    const builder = new XMLBuilder({
      ignoreAttributes: false,
      attributeNamePrefix: "$",
      textNodeName: "#value",
      format: true
    });

    const bodyWrapper = `${type}:${name}-request`;
    const getBody = () => {
      if (wrap) {
        const object: Record<string, typeof body> = {}
        object[bodyWrapper] = body;
        return object;
      } else return body;
    }
    const schema: Record<string, string> = {}
    schema[`$xmlns:${type}`] = `http://www.atsc.nl/schemas/${type === "com" ? "common" : "relation"}`

    return builder.build({
      "soapenv:Envelope": {
        ...schema,
        "$xmlns:glob": "http://www.atsc.nl/schemas/global",
        "$xmlns:soapenv": "http://schemas.xmlsoap.org/soap/envelope/",
        "soapenv:Header": {
          "wsse:Security": {
            "$soapenv:mustUnderstand": "1",
            "$xmlns:wsse": "http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd",
            "$xmlns:wsu": "http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd",
            "wsse:UsernameToken": {
              "$wsu:Id": "UsernameToken-F4BDE120A459153167172805252411826",
              "wsse:Username": this.config.username,
              "wsse:Password": {
                "#value": await this.config.password,
                "$Type": "http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordDigest"
              },
              "wsse:Nonce": {
                "#value": this.config.nonce,
                "$EncodingType": "http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-soap-message-security-1.0#Base64Binary"
              },
              "wsu:Created": this.config.created
            }
          }
        },
        "soapenv:Body": getBody()
      }
    }).toString()
  }
}