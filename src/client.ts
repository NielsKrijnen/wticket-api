import { WTicketCommon } from "./services/common";
import { WTicketRelation } from "./services/relation";
import crypto from "node:crypto"

type WTicketAPIConfig = {
  username: string
  password: string
  url: string
  crypto?: Crypto
}

export class WTicketAPI {
  private readonly username: string;
  private readonly password: Promise<string>;
  private readonly url: string;
  private readonly nonce: string;
  private readonly created: string;
  private readonly crypto: Crypto;

  constructor(protected readonly config: WTicketAPIConfig) {
    this.url = config.url
    this.username = config.username
    this.crypto = config.crypto ?? crypto as Crypto

    const array = new Uint8Array(16);
    this.crypto.getRandomValues(array)
    this.nonce = btoa(String.fromCharCode(...array))
    this.created = new Date().toISOString()

    this.password = this.getPassword(array, this.created, config.password)
  }

  private async getPassword(nonce: Uint8Array, created: string, password: string) {
    const encoder = new TextEncoder()
    const data = new Uint8Array([...nonce, ...encoder.encode(created + password)])

    const hashBuffer = await this.crypto.subtle.digest("SHA-1", data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return btoa(String.fromCharCode(...hashArray))
  }

  get common() {
    return new WTicketCommon({
      url: this.url,
      username: this.username,
      password: this.password,
      nonce: this.nonce,
      created: this.created
    });
  }
  get relation() {
    return new WTicketRelation({
      url: this.url,
      username: this.username,
      password: this.password,
      nonce: this.nonce,
      created: this.created
    });
  }
}