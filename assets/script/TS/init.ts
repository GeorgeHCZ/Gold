const {ccclass, property} = cc._decorator;

@ccclass
export class NewClass extends cc.Component {

    //石头和金块的预制体
    @property(cc.Prefab)
    target1: cc.Prefab = null;

    @property(cc.Prefab)
    target2: cc.Prefab = null;

    @property(cc.Prefab)
    target3: cc.Prefab = null;

    @property(cc.Prefab)
    target4: cc.Prefab = null;

    @property(cc.Prefab)
    target5: cc.Prefab = null;

    @property(cc.Prefab)
    target6: cc.Prefab = null;

    onLoad(){
        
    }


    start(){
        this.newInit();
    }

    //随机生成金块产生的位置
    getNewGoldPosition(){

        var maxX,maxY;
        maxX = this.node.x;
        maxY = this.node.y;

        var randY =cc.randomMinus1To1() * maxY;
        var randX = cc.randomMinus1To1() * maxX;
        return cc.p(randX, randY);

    }

    //实例化
    newInit(){

        var gold1 = cc.instantiate(this.target1);
        this.node.addChild(gold1);
        gold1.setPosition(this.getNewGoldPosition());

        var gold2 = cc.instantiate(this.target2);
        this.node.addChild(gold2);
        gold2.setPosition(this.getNewGoldPosition());

        var gold3 = cc.instantiate(this.target3);
        this.node.addChild(gold3);
        gold3.setPosition(this.getNewGoldPosition());

        var gold4 = cc.instantiate(this.target4);
        this.node.addChild(gold4);
        gold4.setPosition(this.getNewGoldPosition());

        var gold5 = cc.instantiate(this.target5);
        this.node.addChild(gold5);
        gold5.setPosition(this.getNewGoldPosition());

        var gold6 = cc.instantiate(this.target6);
        this.node.addChild(gold6);
        gold6.setPosition(this.getNewGoldPosition());
    }

    //当场景中的金块和石头为0时，关闭碰撞管理，重新实例化
    update(){
        if(this.node.childrenCount == 0){
            var manager = cc.director.getCollisionManager();
            manager.enabled = false;
            this.newInit();
        }
        
    }

}