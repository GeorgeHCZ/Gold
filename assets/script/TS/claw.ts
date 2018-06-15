const {ccclass, property} = cc._decorator;

@ccclass
export class NewClass extends cc.Component {

    //钩子上渲染金块的节点
    @property(cc.Node)
    objNode:cc.Node = null;

    //保存得分信息
    public score;

    start(){
        this.score = 0;
    }

    onCollisionEnter(other,self){

        //将发生碰撞的金块的spriteFrame渲染到钩子上的节点上
        var objNode = this.objNode;
        var objsprite = other.node.getComponent(cc.Sprite);
        objNode.getComponent(cc.Sprite).spriteFrame = objsprite.spriteFrame;
        objNode.width = other.node.width;
        objNode.height = other.node.height; 
        this.objNode.opacity=255;

        if(other.tag == 1){
            this.score = 2;
        }
        else if(other.tag == 2){
            this.score = 3;
        }
        else if(other.tag == 3){
            this.score = 5;
        }
        else if(other.tag == 4){
            this.score = 10;
        }
        else{
            this.score = 1;
        }
        other.node.destroy();   
    }

    update(){
        if(this.objNode.getComponent(cc.Sprite).spriteFrame != null){
            var manager = cc.director.getCollisionManager();
            manager.enabled = false;
        }
    }
}