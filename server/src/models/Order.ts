// Dependencies
import mongoose, { Schema } from 'mongoose';

// Import types
import { IOrder } from 'mongooseTypes';

// Generic address schema
const address = {
    firstName: String,
    lastName: String,
    company: String,
    address1: String,
    address2: String,
    city: String,
    state: String,
    zip: String,
    country: String,
    email: String,
    phone: String
}

const OrderSchema: mongoose.Schema = new Schema({
    marketplaceID: String,
    marketplace: String,
    address: {
        billing: address,
        shipping: address,
        shipFron: address
    },
    orderItems: Array,
    currency: String,
    total: Number,
    totalTax: Number,
    shippingTotal: Number,
    refunds: Array,
    paymentMethod: String,
    paidDate: Date,
    createdDate: Date,
    modifiedDate: Date,
    completedDate: Date,
    status: String,
    userID: String
});

const OrderModel: mongoose.Model<IOrder> = mongoose.model<IOrder>('Orders', OrderSchema);

export default OrderModel;
