// --- ADAPTER ---
let Ordenes : string[] = []
class OldOrderSystem{
    constructor(){}
    placeOrder(orden:string){
        Ordenes.push(orden)
    }    
}

class OrderAdapter {
  constructor(private adapter: any) {}

  setAdapter(adapter: OldOrderSystem): void {
    this.adapter = adapter;
  }

 submitOrder(orden: string): void {
      this.adapter.placeOrder(orden);
      return 
  }
}

const oldSystem = new OldOrderSystem()
const adapter = new OrderAdapter(oldSystem)

console.log("pre orden: " + Ordenes)
adapter.submitOrder('Orden para la mesa 5')
console.log("post orden: " + Ordenes)

// --- ---- ---
// --- FACTORY ---

class DineInOrder{
  tableNumber: number;
  constructor(tableNumber: number){
    this.tableNumber = tableNumber
  }
}
class TakeAwayOrder{
  deliveryAddress: string;
  constructor(deliveryAddress: string){
    this.deliveryAddress = deliveryAddress
  }
}

class OrderFactory{
  constructor(){}

  create(tipo: "DineIn" | "TakeAway", options: {tableNumber: number} | {deliveryAddress : string} ){
    if (tipo == "DineIn"){
      const option = options as {tableNumber: number}
      return new DineInOrder(option.tableNumber)
      }else if (tipo == "TakeAway"){
    const option = options as {deliveryAddress: string}
    return new TakeAwayOrder(option.deliveryAddress)
    }
  }
}
const orderFactory = new OrderFactory()

const dineInOrder = orderFactory.create('DineIn',{tableNumber: 5})
const takeAwayOrder = orderFactory.create('TakeAway',{deliveryAddress:'Junin 213'})

console.log(dineInOrder)
console.log(takeAwayOrder)