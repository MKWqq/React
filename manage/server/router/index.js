/* server router */
let express=require('express');
let router=express.Router();
router.post('/test',function(req,res,next){
	res.json({msg:'成功'})
});

module.exports=router;