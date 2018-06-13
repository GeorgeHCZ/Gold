const {ccclass, property} = cc._decorator;

@ccclass
export class NewClass extends cc.Component {

    @property(cc.Label)
    rScore:cc.Label = null;

    @property(cc.Node)
    objNode:cc.Node = null;

    private score = 0;

    start(){

        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        //manager.enabledDebugDraw = true;
    }

    onCollisionEnter(other,self){

        var objNode = this.objNode;
        var objsprite = other.node.getComponent(cc.Sprite);
        objNode.getComponent(cc.Sprite).spriteFrame = objsprite.spriteFrame;
        objNode.width = other.node.width;
        objNode.height = other.node.height; 
        this.objNode.opacity=255;

        if(other.tag == 1){
            this.score += 2;
            this.rScore.string = this.score.toString();
        }
        else if(other.tag == 2){
            this.score += 3;
            this.rScore.string = this.score.toString();
        }
        else if(other.tag == 3){
            this.score += 5;
            this.rScore.string = this.score.toString();
        }
        else if(other.tag == 4){
            this.score += 10;
            this.rScore.string = this.score.toString();
        }
        else{
            this.score += 1;
            this.rScore.string = this.score.toString();
        }
        other.node.destroy();
        
    }
}