const {ccclass, property} = cc._decorator;

@ccclass
export class NewClass extends cc.Component {

    @property(cc.Node)
    objNode:cc.Node = null;

    //绳子节点
    @property(cc.Node)
    rope:cc.Node = null
    //钩子节点
    @property(cc.Node)
    claw:cc.Node = null
    //显示炸药数目的Label
    @property(cc.Label)
    bNum:cc.Label = null;
    //显示当前得分的Label
    @property(cc.Label)
    rScore:cc.Label = null;

    //绳子的初始位置
    private startPos;
    //左右摇晃
    private shackeAction;
    //绳子运动的速度
    private speed = 3;
    //炸药的数目
    private num;
    //当前得分
    private rs = 0;
    //claw节点下的claw组件
    private cs;
    private moveAction;
    private bool = false;

    onLoad(){
        
    }
    
    start(){

        //获取claw节点的下的claw组件(claw.ts脚本文件)
        this.cs = this.claw.getComponent('claw');
        
        this.num = Number(this.bNum.string);

        this.startPos = this.rope.position;

        this.shackeAction = cc.repeatForever(cc.sequence(cc.rotateTo(3,75),cc.rotateTo(3,-75)));

        this.rope.runAction(this.shackeAction);


        var self = this;
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,function(event){

            this.moveAction = cc.moveBy(this.speed,-500*Math.tan(Math.PI/180*this.rope.rotation),-500);

            if(event.keyCode == cc.KEY.space){
                this.speed = 0.5;
            }
            if(event.keyCode == cc.KEY.down){
                //打开碰撞管理
                var manager = cc.director.getCollisionManager();
                manager.enabled = true;
                //manager.enabledDebugDraw = true;
        
                self.rope.stopAction(this.shackeAction);
                if(this.rope.position.x == this.startPos.x){
                    self.rope.runAction(this.moveAction);
                }
            }
        },this);

    }

    update(dt){

        if(this.speed > 3){
            this.speed = 3;
        }

        if((this.rope.position.x == this.startPos.x)&&this.bool){
            this.des();
            this.rope.runAction(this.shackeAction);
            this.bool = false;
        }

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,function(event){
            if(event.keyCode == cc.KEY.space){
                this.speed = 1;
            }
        },this);
        
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,function(event){
            if(event.keyCode == cc.KEY.space){
                this.speed = 3;
            }
        },this);

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,function(event){
            if(event.keyCode == cc.KEY.up){
                if(this.num > 0){
                    this.boom();
                }
            }
        },this);
    }
    
    //销毁，计分
    des(){
        var obj = this.claw.getChildByName("obj");
        if(obj.getComponent(cc.Sprite).spriteFrame){
            if((this.rs + this.cs.score) < 0){
                this.rs = 0;
            }else{
                this.rs += this.cs.score;
            }
            console.log(this.rs);
            this.rScore.string = this.rs.toString();
            obj.getComponent(cc.Sprite).spriteFrame = null;
        }
    }
    //爆炸,不计分
    boom(){
        var obj = this.claw.getChildByName("obj");
        if(obj.getComponent(cc.Sprite).spriteFrame){
            this.num--;
            this.bNum.string = this.num.toString();
            obj.getComponent(cc.Sprite).spriteFrame = null;
        }
    }

    onCollisionEnter(other,self){
        if((other.tag == 5)||(other.tag == 6))
        {
            this.speed = 10;
        }
        this.rope.stopAction(this.moveAction);
        this.rope.runAction(cc.moveTo(this.speed,this.startPos));
        this.bool = true;
    }
}