// AddOrder is used to Add orders to Database
import { MongoClient } from "mongodb";


const uri =
    "mongodb+srv://engaligulf:Cossacks%401@cluster0.fj9bpe7.mongodb.net/?maxIdleTimeMS=5000";

const client = new MongoClient(uri);
// AddOrder function is used to add Order to database

const AddOrder = async (OrderData) => {
    console.log("AddOrder 0")
    console.log(OrderData)
    console.log(typeof OrderData)
    const res = await client.db("Gehazik").collection("Orders").insertOne({
        ClientName: OrderData.ClientName,
        OrderDate: new Date(),
        ClientEmail: OrderData.ClientEmail,
        ItemCode: OrderData.ItemCode,
        ItemQty: OrderData.ItemQty,
        Paid: OrderData.Paid,
        PaymentDate: new Date(),
        Shipped: OrderData.Shipped,
        ShipmentDate: new Date(),
        Delivered: OrderData.Delivered,
        DeliveryDate: new Date(),
        MerchantID: OrderData.MerchantID,
        MerchantRecievedMoney: OrderData.MerchantRecievedMoney



    }).then(res => {
        console.log("AddOrder 1")
        console.log(res)
        if (res.insertedId) {
            console.log("AddOrder 2")
            console.log(" Order Added to DB")
            return res.insertedId


        } else {
            console.log("AddOrder 3")
            console.log("Order not Added to DB")
            return "Order not Added to DB"

        }

    }).catch(err => {
        console.log("AddOrder 4")
        console.log(err)
        return "Connection error"
    })

    if (res === "Connection error" || res === "Order not Added to DB") {
        console.log("AddOrder 5")
        console.log("return error massage")
        return res

    } else {
        const AddedOrder = await client.db("Gehazik").collection("Orders").findOne({ _id: res }).then(res => {
            console.log("AddOrder 6")
            console.log(res)
            return res

        }).catch(err => {
            console.log("AddOrder 7")
            console.log(err)
            return "Connection error"

        })

        return AddedOrder

    }





}

export default AddOrder