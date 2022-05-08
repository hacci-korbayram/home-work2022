const path = require("path");
const DataService = require("../services/data.service");
const { v4: uuid } = require("uuid");
const { realpathSync } = require("fs");
const DishModel = require("../models/dish.model");

const ordersPath = path.join(__dirname, "..", "data", "orders.json");


class OrderModel {
    static async getAllOrders() {
        return DataService.readJSONFile(ordersPath);

    }
    static async getAllOrderById(orderId) {
        const orders = await this.getAllOrders();

        const foundOrder = orders.find(order => order.id === orderId);

        if (foundOrder) {
            return foundOrder;

        } else {
            return Promise.reject({ msg: "No order found" });
        }
    }
    static async addNewOrder(newOrderData) {
        const orders = await this.getAllOrders();
        const nameExists = orders.some(order => order.neme === newOrderData.name
        );
        if (nameExists) return Promise.reject({ msg: "registered" });

        const newOrder = {
            id: uuid(),
            ...newOrderData,

        };
        const updatedOrders = [...orders, newOrder];
        await DataService.saveJSONFile(ordersPath, updatedOrders);

        return newOrder;

    }
    static async patchStatus(orderId, orderUpdateData) {
        const orders = await this.getAllOrders();
    
        const foundOrder = await this.getOrderById(orderId);
    
        const updatedOrder = { ...foundOrder, ...orderUpdateData };
       
    
        const updatedOrders = orders.map(order => order.id === foundOrder.id ? updatedOrder : order
        );
    
        await DataService.saveJSONFile(ordersPath, updatedOrders)
    
        return updatedOrder;
    }
    static async patchOrder(orderId, orderUpdateData) {
        const orders = await this.getAllOrders();

        const foundOrder = await this.getAllOrderById(orderId);

        const updatedOrder = { ...foundOrder, ...orderUpdateData };

        const updateOrders = orders.map(order =>
            order.id === foundOrder.id ? updatedOrder : order
        );
        await DataService.saveJSONFile(ordersPath, updateOrders);

    }
    static async deleteOrder(orderId) {
        const orders = await this.getAllOrders();
        const updatedOrders = orders.filter(order => order.id !== orderId
        );

        if (updatedOrders.length === orders.length)
            return Promise.reject({ msg: "order not found" });

        await DataService.saveJSONFile(ordersPath, updatedOrders);
    }
}

module.exports = OrderModel;