import { Products} from "./products.interface";

export interface Purchase {
    idType:string
    idClient:string
    nameClient:string
    products: [ProductsPost]
 }

 export interface ProductsPost {
    id:string
    amount:number;
 }