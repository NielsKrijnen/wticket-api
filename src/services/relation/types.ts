export type Relation = {
  number: number
  type: string
  searchName: string
  fullName: string
  address: Address
  mailingAddress: Address
  phoneNumber?: number
  phoneNumber2?: number
  mobilePhoneNumber?: number
  faxNumber?: number
  emailAddress?: string
  id: number
  paymentCondition: PaymentCondition
  blockMail: boolean
}

export type Address = {
  street: string
  houseNumber: number
  zipCode: string
  city: string
  country: string
}

export type PaymentCondition = {
  paymentCondition: number
  paymentTerm: number
  description: string
}

export type RelationXML = {
  "ns3:number": number
  "ns3:type": string
  "ns3:searchName": string
  "ns3:fullName": string
  "ns3:address": AddressXML
  "ns3:mailingAddress": AddressXML
  "ns3:phoneNumber": number
  "ns3:mobilePhoneNumber"?: number
  "ns3:emailAddress": string
  "ns3:gc1mag_unid": number
  "ns3:paymentCondition": {
    "ns3:paymentCondition": number
    "ns3:paymentTerm": number
    "ns3:description": string
  }
  "ns3:blockMail": boolean
}

export type AddressXML = {
  "ns3:street": string
  "ns3:houseNumber": number
  "ns3:zipCode": string
  "ns3:city": string
  "ns3:country": string
}

export type RelationEdit = {
  number?: Relation["number"]
  type?: Relation["type"]
  searchName: Relation["searchName"]
  fullName: Relation["fullName"]
  address: AddressEdit
  mailingAddress?: AddressEdit
  phoneNumber?: Relation["phoneNumber"]
  phoneNumber2?: Relation["phoneNumber2"]
  mobilePhoneNumber?: Relation["mobilePhoneNumber"]
  faxNumber?: Relation["faxNumber"]
  emailAddress?: Relation["emailAddress"]
  emailAddressInvoices?: string
  website?: string
  division?: string
  region?: string
  routeCode?: string
  username?: string
  password?: string
  shippingMethod?: string
  id?: string
  paymentCondition?: Partial<PaymentCondition> & { note?: string }
  paymentMethod?: string
  debtorNumber?: number
  creditorNumber?: number
  blockMail?: boolean
  blockCode?: boolean
  contacts?: Contact[]
  status?: string
  selectionCode1?: SelectionCode
  selectionCode2?: SelectionCode
  selectionCode3?: SelectionCode
  selectionCode4?: SelectionCode
  selectionCode5?: SelectionCode
  selectionCode6?: SelectionCode
  selectionCode7?: SelectionCode
  selectionCode8?: SelectionCode
  selectionCode9?: SelectionCode
  selectionCode10?: SelectionCode
}

export type SelectionCode = {
  code: string
  description?: string
}

export type Contact = {
  person: unknown
  lastName: string
  middleName?: string
  firstName?: string
  initials?: string
  christianNames?: string
  gender: unknown | string
  birthDate?: string
  title?: string
  salutation?: string
  titlePre?: string
  titlePost?: string
  companyName?: string
  address?: AddressEdit
  location?: string
  floor?: string
  room?: string
  phoneNumber?: number
  phoneNumber2?: number
  mobilePhoneNumber?: number
  faxNumber?: number
  jobTitle?: string
  emailAddress?: string
  website?: string
  types?: {
    type: string
    description: string
  }[]
  note?: string
}

export type AddressEdit = {
  street?: Address["street"]
  address2?: string
  houseNumber?: Address["houseNumber"]
  streetExtension?: string
  streetExtension2?: string
  zipCode?: Address["zipCode"]
  city?: Address["city"]
  province?: string
  country: Address["country"]
}