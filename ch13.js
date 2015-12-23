/*
 * 从Node.js连接到MongoDB
 * 方式一：创建一个MongoClient对象的实例
 *      var client = new MongoClient(new Server('localhost', 27017, {poolSize: 5}),
 *                                  { retryMilliSeconds: 500})
 */

/*var MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server;
//MongoClient(server options)
var client = new MongoClient(new Server('localhost', 27017, {
    socketOptions: {connectTimeoutMS: 500},
    poolSize: 5,
    auto_reconnect: true}), { //从numberOfRetries开始指定数据库连接选项
    numberOfRetries: 3,
    retryMiliSeconds: 500});
console.log("connecting");
//调用open方法打开mongodb数据库到服务器的连接，如果连接失败，第一个参数表示错误，成功，第二个参数表示MongoClient对象
client.open(function(err, client){
    if (err) {
        console.log("connection failed via client object");
    } else {
        console.log("Connect");
        var db = client.db("test"); //创建需要连接的数据库的名称
        //如果使用了身份验证，还需要验证
        db.authenticate("dbadmin", "test", function(err, results){
            if (err) {
                console.log("Authentication failed");
                client.close();
                console.log("Connection closed ......");
            } else {
                console.log("Authnticated via Client object");
                //可以调用db.logout)_注销数据库，将关闭和数据库的连接
                db.logout(function(err, result){
                    if (!err) {
                        console.log("Logged out via Client object");
                    }
                    //关闭到MongoDB的连接
                    client.close();
                    console.log("Connection closed");
                });
            }
        });
    }
});*/

/*
 * 方式二：通过连接字符串链接到MongoDB
 *        通过字符串创建、打开、验证到数据库的连接
 *        MongoClient.connect(connString, options, callback)
 *        connString: mongodb://username:password@host:port/database?options
 *        options: db{} server{}
 */
/*
var MongoClient = require('mongodb').MongoClient;
MongoClient.connect("mongodb://localhost:27017/test",{
                    db: {w: 1, native_parser: false},
                    server: {
                        poolSize: 5,
                        socketOptions: {connectTimeoutsMS: 500},
                        auto_reconnect: true
                    },
                    replSet: {},
                    mongos: {}
                    }, function(err, db){
    if (err) {
        console.log('Connection Failed Via Connection String.');
    } else {
        console.log('Connected Via Connection String...');
        db.logout(function(err, result) {
            if (err) {
                console.log("Logged out Via Connection String...");
            }
            db.close();
            console.log("Connection Closed...");
        });
    }
});
*/

/*
 * 当链接到数据库时，Db对象被创建
 * open(function(err, db)) | db | close(function(err, results)) | admin()
 * collectionInfo(function(err, cursor)) | collectionNames(function(err, names)) | collection(function(err, collection))
 * collections(function(err, collections)) | logout(function(err, results)) | authenticate()
 * addUser | removeUser | createCollection | dropCollection | renameCollection | dropDatabase
 */

/*
 * Admin对象
 *      Admin对象专门指代到admin数据库的连接，并不代表数据库，即非Db对象
 *      var adminDb = db.admin();
 *      var adminDb = new Admin(db);
 *      检查服务器的状态 serverStatus(callback)
 *      Ping MongoDB服务器 ping(callback)
 *      获取数据库列表 listDatabases(callback)
 *      以一个用户身份验证到该数据库，实现用户切换 authenticate()
 *      将用户从数据库注销 logout
 *      addUser removeUser
 */

/*
 * Collection对象
 *      代表了MongoDB的数据库集合，访问集合的条目，添加文档，查询文档等
 *      获取集合对象：
 *          var collection = db.collection;
 *          var collection = new Collection(db, "myCollection");
 *          db.createCollection("newCollection", function(err, collection))
 *      插入文档到集合, insert(docs, callback)
 *      删除文档 remove(query, options, callback)
 *      重命名集合 rename(newName, callback)
 *      保存文档 save(doc, options, callback)
 *      更新文档 update
 *      创建指向一组与查询匹配的文档的cursor对象 find(query, options, callback)
 *      findOne findAndModify findAndRemove
 *      count drop stats
 */

/*
 * Cursor对象
 *      代表了一个可迭代的在数据库中访问一组对象的指针
 *      each(callback) toArray() nextObject rewind()回到初始状态
 *      count() 确定由cursor表示的条目数量
 *      sort close isClosed()
 */

//列出数据库
/*var MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb://localhost/test', function(err, db){
    if (err) {
        console.log('err occurred');
    } else {
        var adminDB = db.admin();
        adminDB.listDatabases(function(err, databases){
            console.log('Before add datbase list:');
            console.log(databases);
        });

        db.logout(function(err, results){
            db.close();
        })
    }
});*/

//创建/删除数据库
/*var MongoClient = require('mongodb').MongoClient;
MongoClient.connect("mongodb://localhost/Neil", function(err, db){
    /!*var newDB = db.db('Neil');
    newDB.createCollection("NeilCollection", function(err, collection){
        if (!err) {
            console.log("success");
        }
    })*!/
    db.dropDatabase(function(err, results){
        if (!err) {
            console.log("success");
        }
    })
});*/

//获得MongoDB服务器的状态
/*
var MongoClient = require('mongodb').MongoClient;
MongoClient.connect("mongodb://localhost/test", function(err, db){
    var adminDB = db.admin();
    adminDB.serverStatus(function(err, status){
        console.log(status);
        db.close();
    })
})*/

//创建，列出和删除集合
var MongoClient = require('mongodb').MongoClient;
MongoClient.connect("mongodb://localhost/", function(err, db){
    var newDB = db.db('Neil');
    newDB.collectionNames(function(err, collectionNames){
        console.log("Initial collections");
        console.log(collectionNames);
        newDB.createCollection('neilCollection', function(err, collection) {
            newDB.collectionNames(function(err, collectionNames){
                console.log("Collections after creation");
                console.log(collectionNames);
            });
            newDB.dropCollection('neilCollection', function(err, results){
                newDB.collectionNames(function(err, collectionNames){
                    console.log("Collections after deletion");
                    console.log(collectionNames);
                })
            })
        })
    })
})