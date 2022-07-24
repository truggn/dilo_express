const {Schema, model} = require('mongoose')

// products

const productSchema = new Schema({
    productId: {
        type: Number,
        required: true
    },
    code: { type: String },
    name: { type: String},
    brand: { type: String},
    discription: { type:  String },
    release_date: {type: Date },
    specs :{ type: Array, default:[]},
},{
    collection:'products',
    timestamps:true
})

// cart
const cartSchema = new Schema({
    userId: Number,
    cartId: Number,
    status: { type: String, default:'active'},
    modifiedOn:{type: Date, default: Date.now},
    products: Array

},{
    collection:'carts',
    timestamps:true
})

// oder
const OderSchema = new Schema({
    cartId: Number,
    oderId: Number,
    userId: Number,
    shipping: Object,
    payment:Object,
    products: Array
},{
    collection:'oders',
    timestamps:true
})

// inventori model
const InventorySchema = new Schema({
    productId: Number,
    quantity: Number,
    reservations: Array,
    create_at: {type: Date, default: Date.now}
},{
    collection:'inventories',
    timestamps:true
})

module.exports= {
    _product: model('products', productSchema),
    _cart: model('carts', cartSchema),
    _oder: model('oders', OderSchema),
    _inventory: model('inventories', InventorySchema) 
}