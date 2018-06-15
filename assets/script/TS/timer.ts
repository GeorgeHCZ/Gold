const {ccclass, property} = cc._decorator;

@ccclass
export class NewClass extends cc.Component {

    @property(cc.Node)
    game:cc.Node = null;

    @property(cc.Node)
    claw:cc.Node = null;

    @property(cc.Node)
    objBool:cc.Node = null;

    private timer;

    private add;

    private time;

    start(){
        var obj = this.claw.getChildByName("obj");
        this.add = this.claw.getComponent('claw');
        var objb = this.objBool.getComponent("init");
        var time = this.game.getComponent("settings");
        this.timer = this.node.getComponent(cc.Label).string;

        this.schedule(function(){
            if(this.timer > 0){
                this.timer--;
                if(obj.getComponent(cc.Sprite).spriteFrame){
                    this.timer += this.add.time;
                    //console.log("time:" + this.add.time)
                    this.add.time = 0;
                }
                if(objb.next){
                    this.timer = time.time;
                    objb.next = false;
                }
            }
        },5/3);
    }

    update(){
        this.node.getComponent(cc.Label).string = this.timer;
        if(this.timer == 0){
        }
    }
}