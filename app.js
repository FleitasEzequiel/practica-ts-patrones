// --- ADAPTER ---
var Ordenes = [];
var OldOrderSystem = /** @class */ (function () {
    function OldOrderSystem() {
    }
    OldOrderSystem.prototype.placeOrder = function (orden) {
        Ordenes.push(orden);
    };
    return OldOrderSystem;
}());
var OrderAdapter = /** @class */ (function () {
    function OrderAdapter(adapter) {
        this.adapter = adapter;
    }
    OrderAdapter.prototype.setAdapter = function (adapter) {
        this.adapter = adapter;
    };
    OrderAdapter.prototype.submitOrder = function (orden) {
        this.adapter.placeOrder(orden);
        return;
    };
    return OrderAdapter;
}());
var oldSystem = new OldOrderSystem();
var adapter = new OrderAdapter(oldSystem);
console.log("pre orden: " + Ordenes);
adapter.submitOrder('Orden para la mesa 5');
console.log("post orden: " + Ordenes);
// --- ---- ---
// --- FACTORY ---
var DineInOrder = /** @class */ (function () {
    function DineInOrder(tableNumber) {
        this.tableNumber = tableNumber;
    }
    return DineInOrder;
}());
var TakeAwayOrder = /** @class */ (function () {
    function TakeAwayOrder(deliveryAddress) {
        this.deliveryAddress = deliveryAddress;
    }
    return TakeAwayOrder;
}());
var OrderFactory = /** @class */ (function () {
    function OrderFactory() {
    }
    OrderFactory.prototype.create = function (tipo, options) {
        if (tipo == "DineIn") {
            var option = options;
            return new DineInOrder(option.tableNumber);
        }
        else if (tipo == "TakeAway") {
            var option = options;
            return new TakeAwayOrder(option.deliveryAddress);
        }
    };
    return OrderFactory;
}());
var orderFactory = new OrderFactory();
var dineInOrder = orderFactory.create('DineIn', { tableNumber: 5 });
var takeAwayOrder = orderFactory.create('TakeAway', { deliveryAddress: 'Junin 213' });
console.log(dineInOrder);
console.log(takeAwayOrder);
