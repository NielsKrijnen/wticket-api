import { WTicketCommon } from "./services/common";
import { WTicketRelation } from "./services/relation";

export type WTicketClientConfig = {
  username: string
  password: string
  nonce: string
  created: string
  url: string
}

export class WTicketClient {
  constructor(protected readonly config: WTicketClientConfig) {}

  get common() {
    return new WTicketCommon(this.config);
  }
  get relation() {
    return new WTicketRelation(this.config);
  }
}