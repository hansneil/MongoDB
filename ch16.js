/*
 * Mongoose：实现结构化模式和验证
 * 好处：为文档创建一个模式结构
 *      对模型中的对象/文档进行验证
 *      强制类型转换为对象模型
 *      使用中间件来应用业务逻辑挂钩
 * -------------------------------------------------------------
 * 对象：Schema -- 定义结构化的模式集合中的文档
 *      Model -- 集合中所有文档的表示
 *      Document -- 集合中单个文档的表示
 */

/*
 * 连接到MongoDB数据库，类似连接字符串的方法
 *   mongoose.connect(uri, options, callback)
 *   一旦创建就可以使用mongoose.connection访问相应的属性
 *   connection对象提供了对Db对象和表示集合对象的Model对象的访问
 */

/*var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/words');
//connection定义了open事件，确保在访问数据库之前连接已经打开
mongoose.connection.on('open', function(){
    console.log(mongoose.connection.collection);    //可以访问collection属性
    mongoose.connection.db.collectionNames(function(err, collectionNames){
        console.log(collectionNames); //可以访问db对象，和13章中的数据一样
        mongoose.disconnect();
    })
});*/

/*
 * Schema: 定义模式
 * 如果数据是被结构化成支持模式的，可以对对象进行验证和类型转换
 * 数据类型支持：String Number Boolean Array Buffer Date ObjectId Mixed
 *      创建一个模式定义：
 *          new Schema(definition, options)
 *          例如： var schema = new Schema({
 *                     name: String,
 *                     average: Number,
 *                     scores: [Number]
 *                }, {collection: 'students'});
 *      把索引添加到一个模式：
 *          var schema = new Schema({
 *              name: {type: String, index: 1}
 *          })
 *          或者：
 *          schema.index({name: 1});
 *          获得索引字段列表： schema.indexes();
 *      实现字段的唯一性：
 *          var schema = new Schema({
 *              name: {type: String, unique: true, index: 1}
 *          })
 *      强制字段的必需性：
 *          var schema = new Schema({
 *              name: {type: String, unique: true, index: 1, required: true}
 *          })
 *          schema.requiredPaths() 获取必须的字段列表
 *      添加Schema对象的方法：
 *          schema.methods.fullName = function(){
 *              return this.first + ' ' + this.last;
 *          }
 * 编译模型：
 *      定义对象模型后需要将它编译成Model对象
 *      当编译模型时，由mongoose.connect建立到数据库的连接
 *      编译模型：使用模块中的model方法
 *      model(name, [schema], [collection], [skipInit])
 *      编译：var Words = mongoose.model('Words', wordSchema);
 *           mongoose.model('Words')
 */

//在数据库上实现一个模式
/*
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    wordSchema = new Schema({
        word: {type: String, index: 1, required: true, unique: true},
        first: {type: String, index: 1},
        last: String,
        size: Number,
        letters: [String],
        stats: {
            vowels: Number,
            constants: Number},
        charsets: [{type: String, chars: [String]}]
        }, {collection: 'word_stats'}
    );
wordSchema.methods.startsWith = function(letter) {
    return this.first == letter;
};
exports.wordSchema = wordSchema;
console.log("Required Path:");
console.log(wordSchema.requiredPaths());
console.log("Indexes:");
console.log(wordSchema.indexes());*/

//-------------------------------------------------------------------------------------//
// 将Schema对象编译成Model对象后，就完全准备好开始在模型中访问、添加、更新和删除文档了

/*
 *  Query对象
 *      在使用model对象时，如果没传入callback函数，则会返回Query对象
 *      运行在执行Query对象前添加额外的功能，当准备完成后，调用exec方法
 *      单独定义所有的查询选项：
 *          var query = model.find({});
 *          query.where('value').gt(5);
 *          query.sort('-value');
 *          query.select('name title value');
 *          query.exec(function(err, results))----这里调用了callback
 *
 *          还可以连接在一起：
 *              model.find({}).where('value').gt(5).sort('-value').exec(callback)
 *      1. 设置查询数据库操作
 *         两种方法可以将数据库操作分配给Query对象
 *         一、从Model对象调用操作，但不指定回调函数
 *            var query = model.count();
 *            query.where('value').lt(5) 首先应用count()操作，然后是where()
 *
 */