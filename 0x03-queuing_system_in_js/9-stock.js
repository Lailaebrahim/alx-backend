const { json } = require('express');
const express = import('express');
const { createClient } = import('redis');
const { promisify } = import('util');

const app = express();
const port = 1245;

/** DataBase Items  */
const listProducts = [
    {
        Id: 1, name: "Suitcase 250", price: 50, stock: 4
    },
    {
        Id: 2, name: "Suitcase 450", price: 100, stock: 10
    },
    {
        Id: 3, name: "Suitcase 650", price: 350, stock: 2,
    },
    {
        Id: 4, name: "Suitcase 1050", price: 550, stock: 5
    }
];

/* Method to get the item by id (simualte job of orm) */
const getItemById = (id) => {
    return listProducts.find(item => item.Id === id)
};

/** in stock redis */
const client = createClient();
const clientGetAsync = promisify(client.get).bind(client);
const clientSetAsync = promisify(client.set).bind(client);
client.on('error', (error) => { console.log(error) });
client.on('connect', () => { console.log('Connected') });
try {
    client.connect();
} catch (err) {
    console.error(err);
}

const reserveStockById = async (itemId, stock) => {
    const item = getItemById(itemId);
    if (item) {
        await clientSetAsyn(`stock:${itemId}`, stock);
    }
};

const getCurrentReservedStockById = async (itemId) => {
    const stock = await clientGetAsync(`stock:${itemId}`);
    return stock;
};


/* API Routes */
app.get("/list_products", (request, response) => {
    response.send(json(listProducts));
});

app.get('/list_products/:itemId', (request, response) => {
    const itemId = request.params.itemId;
    const item = getItemById(itemId);
    if (item) {
        response.send(json(item));
    }
    else {
        response.status(404).send({"status":"Product not found"});
    }
});

app.get('reserve_product/:itemId', async (request, response) => {
    const itemId = request.params.itemId;
    const item = getItemById(itemId);
    if (!item) {
        response.status(404).send({ "status": "Product not found" });
    }
    else {
        const stock = await getCurrentReservedStockById(itemId);
        if (stock < 1) {
            response.status(400).send({"status":"Not enough stock available","itemId":itemId});
        }
        else {
            await reserveStockById(itemId, stock + 1);
            response.send({"status":"Reservation confirmed","itemId":itemId});
        }
    }
});

/* express server listen at port */
app.listen(port, () => {
    console.log('In Stock System Runing');
});