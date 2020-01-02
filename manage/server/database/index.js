/* MongoDB */
let MongoClient=require('mongodb').MongoClient;
let url='mongodb://localhost:27017/runoob';
MongoClient.connect(url,{useNewUrlParser:true},function(err,db){
	if(err) throw err;
	console.log('数据库已创建');
	let dbase=db.db('runoob');
	dbase.createCollection('site',function(err,res){
		if(err) throw err;
		console.log('创建集合！');
		db.close();
	});
});
