import { WTicketBase } from "../index";
import { RelationSearch, RelationSearchXML } from "./types";

export class WTicketCommon extends WTicketBase {
  /** Returns relations based on the given params.
   * `relation` is undefined when multiple results are found
   * `relations` is undefined when an exact result was found **/
  async listRelations(params?: {
    searchKey?: string
    changedSince?: string
    limit?: number
    offset?: number
  }): Promise<{ relation?: RelationSearch, relations?: RelationSearch[] }> {
    const name = "relationLookup";
    const body = {
      searchKey: params?.searchKey,
      includeNonDebtors: true,
      ...params
    }
    const xml = this.xmlParse(await this.request(name, body, "com"), name);
    let xmlRelations = xml["ns2:suggestions"]["ns2:suggestion"] as RelationSearchXML[] | RelationSearchXML;
    if (Object.prototype.toString.call(xmlRelations) === "[object Array]") {
      xmlRelations = xmlRelations as RelationSearchXML[];
      const relations: RelationSearch[] = [];
      for (const relation of xmlRelations) {
        relations.push({
          id: relation["ns2:gc1rel_unid"],
          searchKey: relation["ns2:searchKey"],
        })
      }
      return {
        relation: undefined,
        relations
      }
    } else {
      xmlRelations = xmlRelations as RelationSearchXML;
      return {
        relation: {
          id: xmlRelations["ns2:gc1rel_unid"],
          searchKey: xmlRelations["ns2:searchKey"]
        } as RelationSearch,
        relations: undefined
      }
    }
  }
}