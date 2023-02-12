
export interface Purchase {
    idType:string
    idClient:string
    nameClient:string
    products: ProductsPost[]
 }

 export interface ProductsPost {
    id:string
    amount:number;
 }

 export type Purchases = Purchase2[]

export interface Purchase2 {
  id: string
  dateTime: string
  idType: string
  idClient: string
  nameClient: string
  products: Product[]
}

export interface Product {
  id: string
  amount: number
}