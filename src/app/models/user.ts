export interface Address {
  city: string
  street: string
  suite: string
  zipcode: string
}

export interface Company {
  bs: string
  catchPhrase: string
  name: string
}

export interface User {
  id: number
  name: string
  username: string
  email: string
  address: Address
  phone: string | number
  website: string
  company: Company
}
