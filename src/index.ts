import { XMLParser } from "fast-xml-parser";

const parser = new XMLParser();

fetch("http://pcrolin.multitrader.nl:80/websrv", {
  method: "POST",
  headers: {
    "Content-Type": "text/xml;charset=UTF-8",
  },
  body: `<soapenv:Envelope xmlns:com="http://www.atsc.nl/schemas/common" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
   <soapenv:Header><wsse:Security soapenv:mustUnderstand="1" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd"><wsse:UsernameToken wsu:Id="UsernameToken-F4BDE120A459153167172805052979623"><wsse:Username>WEBSRV</wsse:Username><wsse:Password Type="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordDigest">egNrxhh++V8nkfenUjvKb5J4FGc=</wsse:Password><wsse:Nonce EncodingType="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-soap-message-security-1.0#Base64Binary">nPMA8UhgrQtLelvw8N+bfg==</wsse:Nonce><wsu:Created>2024-10-04T14:02:09.796Z</wsu:Created></wsse:UsernameToken></wsse:Security></soapenv:Header>
   <soapenv:Body>
      <com:relationLookup-request>
         <!--Optional:
         --><com:searchKey>INSTALLPAS</com:searchKey><!--
         <com:changedSince>?</com:changedSince>
         --><com:includeNonDebtors>true</com:includeNonDebtors><!--
         <com:limit>10</com:limit>
         <com:offset>?</com:offset>-->
      </com:relationLookup-request>
   </soapenv:Body>
</soapenv:Envelope>`
}).then(async response => {
  const xml = parser.parse(await response.text());
  console.log(xml["SOAP-ENV:Envelope"]["SOAP-ENV:Body"]["ns2:relationLookup-response"])
})