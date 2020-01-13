/* MongoDB */
let MongoClient=require('mongodb').MongoClient;
let url='mongodb://adminRoot:0@192.168.0.225:8000/runoob';
MongoClient.connect(url,{authSource:'admin',useNewUrlParser:true},function(err,db){
	if(err){
		console.log('mongodb服务端连接错误！');
		throw err;
	}
	console.log('数据库已创建');

	let dbase=db.db('runoob');
	dbase.createCollection('site',function(err,res){
		if(err) throw err;
		console.log('创建集合！');
		db.close();
	});
});
