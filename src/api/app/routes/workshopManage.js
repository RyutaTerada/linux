var express = require('express');
var router = express.Router();

var mysql = require('mysql');

// MySQLの設定情報
var mysql_setting = {
    host: 'db-service.default.svc.cluster.local',
    user: 'root',
    password: '',
    database: 'tenshoku',
};

//ショップ情報をショップidから引き出す
router.get('/getShopdata', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    const shop_id = req.query.shop_id;
    var connection = mysql.createConnection(mysql_setting);
    connection.connect();
    connection.query('SELECT * from workshop_lists where shop_id=?', shop_id,
        function (error, results, fields) {
            if (error == null) {
                if (results.length > 0) {
                    return res.json(results);
                } else {
                    return res.status(403).json('You dont have workshop')
                }
            } else {
                console.log('エラーはいてるよ' + error)
                return res.status(504)
            }
        })
    connection.end();
});

router.get('/getOrderlist', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    const shop_id = req.query.shop_id;
    var connection = mysql.createConnection(mysql_setting);
    connection.connect();
    connection.query('SELECT * from order_lists where shop_id=?', shop_id,
        function (error, results, fields) {
            if (error == null) {
                if (results.length > 0) {
                    return res.json(results);
                } else {
                    return res.status(403)
                }
            } else {
                console.log('エラーはいてるよ' + error)
                return res.status(504)
            }
        })
    connection.end();
});

router.get('/getOrderdetail', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    const shop_id = req.query.shop_id;
    const order_num = req.query.order_number
    var connection = mysql.createConnection(mysql_setting);
    connection.connect();
    connection.query('SELECT * from order_details INNER JOIN product_lists ON order_details.product_id = product_lists.product_id where order_details.shop_id=? && order_details.order_number=?', [shop_id, order_num],
        function (error, results, fields) {
            if (error == null) {
                if (results.length > 0) {
                    return res.json(results);
                } else {
                    return res.status(403)
                }
            } else {
                console.log('エラーはいてるよ' + error)
                return res.status(504)
            }
        })
    connection.end();
});

router.get('/getProducts', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    const shop_id = req.query.shop_id;
    var connection = mysql.createConnection(mysql_setting);
    connection.connect();
    connection.query('SELECT * from product_lists WHERE shop_id=? ', shop_id,
        function (error, results, fields) {
            if (error == null) {
                if (results.length > 0) {
                    return res.json(results);
                } else {
                    return res.status(403)
                }
            } else {
                console.log('エラーはいてるよ' + error)
                return res.status(504)
            }
        })
    connection.end();
});

router.get('/getSale', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    const shop_id = req.query.shop_id;
    var connection = mysql.createConnection(mysql_setting);
    connection.connect();
    connection.query('SELECT * from discount INNER JOIN product_lists ON discount.product_id = product_lists.product_id WHERE discount.shop_id=? GROUP BY discount.sale_id', shop_id,
        function (error, results, fields) {
            if (error == null) {
                if (results.length > 0) {
                    return res.json(results);
                } else {
                    return res.status(403)
                }
            } else {
                console.log('エラーはいてるよ' + error)
                return res.status(504)
            }
        })
    connection.end();
});

router.get('/getSaleitem', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    const sale_id = req.query.sale_id;
    console.log('渡されたセールid:' + sale_id)
    var connection = mysql.createConnection(mysql_setting);
    connection.connect();
    connection.query('SELECT * from discount INNER JOIN product_lists ON discount.product_id = product_lists.product_id WHERE discount.sale_id=?', sale_id,
        function (error, results, fields) {
            console.log(results)
            if (error == null) {
                if (results.length > 0) {
                    return res.json(results);
                } else {
                    return res.status(403)
                }
            } else {
                console.log('エラーはいてるよ' + error)
                return res.status(504)
            }
        })
    connection.end();
});


/* インサート */
router.get('/addSale', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    const sale_id = req.query.sale_id;
    const product_id = req.query.product_id;
    const shop_id = req.query.shop_id;
    const rate = req.query.rate;
    const sale_name = req.query.sale_name;
    var connection = mysql.createConnection(mysql_setting);
    connection.connect();
    connection.query('INSERT INTO discount VALUES(?,?,?,?,?)', [sale_id, product_id, shop_id, rate, sale_name],
        function (error) {
            if (error == null) {
                return res.status(200);
            } else {
                console.log('エラーはいてるよ' + error)
                return res.status(504)
            }
        })
    connection.end();
});

router.get('/addProduct', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    const shop_id = req.query.shop_id;
    const product_name = req.query.product_name;
    const product_name_en = req.query.product_name_en;
    const product_number = req.query.product_number;
    const price = req.query.price;
    const record_date = req.query.record_date
    const product_detail = req.query.product_detail
    const product_img = req.query.product_img
    const stock = req.query.stock
    const safety = req.query.safety
    const size = req.query.size
    const mate = req.query.mate
    const weight = req.query.weight
    var connection = mysql.createConnection(mysql_setting);
    connection.connect();
    connection.query('INSERT INTO product_lists VALUES(null,?,?,?,?,?,?,?,?,?,?,?,?,?)', [shop_id, product_name, product_name_en, product_number, price, record_date, product_detail, product_img, stock, safety, size, mate, weight],
        function (error) {
            if (error == null) {
                return res.status(200);
            } else {
                console.log('エラーはいてるよ' + error)
                return res.status(504)
            }
        })
    connection.end();
});


module.exports = router;