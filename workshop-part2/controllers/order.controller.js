const OrderModel = require("../models/order.models");

class OrderController {
    static async fetchAllOrders(req, res) {
        try {
            const orders = await OrderModel.getAllOrders()
            res.status(200).send(orders);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    static async fetchOrderById(req, res) {
        try {
            const { id: orderId } = req.params.orderId;
            const order = await OrderModel.getOrderById(orderId);

            res.status(200).send(order);
        } catch (error) {
            res.status(400).send(error);
        }
    }
    static async createNewOrder(req, res) {
        try {
            const newOrderData = req.body;
            const createOrder = await OrderModerl.addNewOrder(newOrderData);
            res.stauts(201).send(createOrder);
        } catch (error) {
            res.stauts(400).send(error);
        }
    }
    static async updateOrder(req, res) {
        try {
            const orderId = req.params.id;
            const orderUpdate = req.body;

            if (orderUpdate.id) res.status(400).send({ msg: `invalid updates` });
            await OrderModel.patchOrder(orderId, orderUpdate);
            res.status(200);
        } catch (error) {
            res.status(400).send(error);
        }
    }
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