const {ccclass, property} = cc._decorator;

@ccclass
export class NewClass extends cc.Component {
    
    @property(cc.Label)
    boom:cc.Label = null;

    @property(cc.Label)
    tLabel:cc.Label = null;


    @property time = 60;
    @property boomNum = 5;

    start(){
        this.boom.string = this.boomNum.toString();
        this.tLabel.string  = this.time.toString();
    }
}