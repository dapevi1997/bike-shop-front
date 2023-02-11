export interface Bike {
    id: string
    name: string
    inInventory: number
    enabled: boolean
    min: number
    max: number
    urlImage: string
    state: boolean
    precio: number
  }

  export interface BikeInCar {
    id: string
    name: string
    precio: number
    amount: number
  }