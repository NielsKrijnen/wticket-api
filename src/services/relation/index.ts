import { WTicketBase } from "../index";
import { Relation, RelationEdit, RelationXML } from "./types";

export class WTicketRelation extends WTicketBase {
  async get(id: number) {
    const name = "retrieveRelation";
    const xml = this.xmlParse(await this.request(name, { "gc1rel_unid": id }, "rel"), name);
    const xmlRelation = xml["ns2:relation"] as RelationXML;
    const relation: Relation = {
      number: xmlRelation["ns3:number"],
      type: xmlRelation["ns3:type"],
      searchName: xmlRelation["ns3:searchName"],
      fullName: xmlRelation["ns3:fullName"],
      address: {
        street: xmlRelation["ns3:address"]["ns3:street"],
        houseNumber: xmlRelation["ns3:address"]["ns3:houseNumber"],
        zipCode: xmlRelation["ns3:address"]["ns3:zipCode"],
        city: xmlRelation["ns3:address"]["ns3:city"],
        country: xmlRelation["ns3:address"]["ns3:country"]
      },
      mailingAddress: {
        street: xmlRelation["ns3:mailingAddress"]["ns3:street"],
        houseNumber: xmlRelation["ns3:mailingAddress"]["ns3:houseNumber"],
        zipCode: xmlRelation["ns3:mailingAddress"]["ns3:zipCode"],
        city: xmlRelation["ns3:mailingAddress"]["ns3:city"],
        country: xmlRelation["ns3:mailingAddress"]["ns3:country"]
      },
      id: xmlRelation["ns3:gc1mag_unid"],
      phoneNumber: xmlRelation["ns3:phoneNumber"],
      mobilePhoneNumber: xmlRelation["ns3:mobilePhoneNumber"],
      emailAddress: xmlRelation["ns3:emailAddress"],
      paymentCondition: {
        paymentCondition: xmlRelation["ns3:paymentCondition"]["ns3:paymentCondition"],
        paymentTerm: xmlRelation["ns3:paymentCondition"]["ns3:paymentTerm"],
        description: xmlRelation["ns3:paymentCondition"]["ns3:description"]
      },
      blockMail: xmlRelation["ns3:blockMail"]
    }
    return relation
  }

  // async create(relation: RelationEdit) {
  //   const name = "createRelation"
  //   await this.request(name, {
  //     "rel:relation": {
  //
  //     }
  //   }, "rel", "edit");
  // }

  async update(id: number, relation: RelationEdit) {
    const name = "updateRelation";
    const response = await this.request(name, {
      "rel:gc1rel_unid": id,
      "rel:relation": {}
    }, "rel", "edit")
    console.log(response)
  }
}