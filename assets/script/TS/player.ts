const {ccclass, property} = cc._decorator;

@ccclass
export class NewClass extends cc.Component {

    @property(cc.Node)
    rope:cc.Node = null

    @property(cc.Node)
    claw:cc.Node = null

    private startPos;
    private shackeAction;

    private speed = 3;
    

    start(){

        this.startPos = this.rope.position;
        
        this.shackeAction = cc.repeatForever(cc.sequence(cc.rotateTo(3,60),cc.rotateTo(3,-60)));

        this.rope.runAction(this.shackeAction);

        var self = this;
        this.node.on('mousedown',function(){

            self.rope.stopAction(this.shackeAction);

            self.rope.runAction(cc.moveBy(3,-470*Math.tan(Math.PI/180*this.rope.rotation),-470));
        },this);
        
        this.node.on('mouseup',function(){
            self.rope.runAction(cc.sequence(cc.moveTo(this.speed,this.startPos),cc.callFunc(function(){
                if(this.rope.position.y == this.startPos.y){
                    this.rope.runAction(this.shackeAction);
                }
                
            },this)));
        },this);

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,function(){
            if(cc.KEY.space){
                this.speed = 1;
            }
        },this);

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,function(){
            if(cc.KEY.space){
                this.speed = 3;
            }
        },this);
    }

    update(dt){
        
    }
}