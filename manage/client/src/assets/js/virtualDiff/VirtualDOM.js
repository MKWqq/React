/**
 * description:创建虚拟DOM
 * date:2020-02-27
 * @prompt:
 *      virtual dom包含属性：tagName（元素类型）、元素属性、子节点
 * */
import utils from '../../utils'

function VNode(tagName,options,children){
	this.tag=tagName;
	this.data=options;
    console.log(children,utils.isArray(children));
    if(utils.isArray(children)){
		this.children=children;
		this.child=undefined;
	}else{
		this.child=children;
		this.children=undefined;
	}

}

/* todo:虚拟DOM转为真实DOM */
VNode.prototype.render=function(){
	let el=document.createElement(this.tag);
	for(let key in this.data){
		if(key==='attrs'){
			for(let attrKey in this.data.attrs){
				el.setAttribute(attrKey,this.data.attrs[attrKey]);
			}
		}
	}
	let children=this.children||[];
	children.forEach(child=>{
		let childEl=(child instanceof VNode)?child.render():document.createTextNode(child);
		el.appendChild(childEl);
	});
	if(this.child){
		let childEl=(this.child instanceof VNode)?this.child.render():document.createTextNode(this.child);
		el.appendChild(childEl);
	}
	return el;
};

export default function createVirtualElement(tagName,options,children){
	return new VNode(tagName,options,children);
}