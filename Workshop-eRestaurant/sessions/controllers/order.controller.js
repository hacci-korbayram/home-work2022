const OrderModel = require("../models/order.model");

class OrderController {
    //0.fetch all order
    static async fetchAllOrders(req, res) {
        try {
            const orders = await OrderModel.getAllOrders()
            res.status(200).send(orders);
        } catch (error) {
            res.status(400).send(error);
        }
    }
  //1. Fetch order by id
    static async fetchOrderById(req, res) {
        try {
            const { id: orderId } = req.params;

            const order = await OrderModel.getAllOrderById(orderId);
            res.status(200).send(order);

        } catch (error) {
            res.status(400).send(error);
        }
    }
    //2. create new order
    static async createNewOrder(req, res) {
        try {
            const newOrderData = req.body;
            const createdOrder = await OrderModel.addNewOrder(newOrderData);
            res.status(201).send(createdOrder);
        } catch (error) {
            res.status(400).send(error)
        }
    }
    //3. Update order
    static async updateOrder(req, res) {
        try {
            const orderId = req.params.id;
            const orderUpdates = req.body;

            if (orderUpdates.id) res.status(400).send({ msg: 'invalid updates' });
            await OrderModel.patchOrder(orderId, orderUpdates);
            res.status(200);
        } catch (error) {
            res.status(400).send(error);
        }
    }
      //4. Update status
    static async updateStatus(req, res) {
        try {
            const orderId = req.params.id;
            const orderUpdates = req.body;

            if (orderUpdates.id || orderUpdates.dishName) res.status(400).send({ msg: "invalid update" });
            const updatedStatus = await OrderModel.patchOrder(orderId, orderUpdates);
            res.status(200).send(updatedStatus);

        } catch (error) {
            res.status(400).send(error);
        }
    }
//5. Delete order
    static async deleteOrder(req, res){
        try {
            const orderId = req.params.id;

            await OrderModel.deleteOrder(orderId);
            res.status(200);
        } catch (error) {
            res.status(400).send(error)
        }
    }

}

module.exports = OrderController;