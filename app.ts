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
// --- ---- ---
// --- OBSERVER ---

class Observador {
  constructor(private nombre: string) {}

  avisar(estado: "En Preparacion" | "Listo para servir", nombre: string){
    console.log(`[${this.nombre}] : El pedido ${nombre} ha cambiado su estado a - ${estado} - `)
  }
}

class Pedido {
private observadores: Observador[] = [];
public estado: "En Preparacion" | "Listo para servir" = "En Preparacion" 

constructor (public nombre: string){}

addObserver(observador: Observador): void {
this.observadores.push(observador);
}

updateStatus(nuevoEstado: "En Preparacion" | "Listo para servir"): void {
this.estado = nuevoEstado;
this.notificarObservadores();
}

private notificarObservadores(): void {
this.observadores.forEach((obs) => obs.avisar(this.estado,this.nombre));
 }
}

const order = new Pedido("Pollito")
const kitchen = new Observador("Cocina")
const waiter = new Observador("Mesero")
const notification = new Observador("Notificador")
order.addObserver(kitchen)
order.addObserver(waiter)
order.addObserver(notification)

order.updateStatus("Listo para servir")

// --- ---- ---
