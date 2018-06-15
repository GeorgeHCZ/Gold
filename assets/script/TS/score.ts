const {ccclass, property} = cc._decorator;

@ccclass
export class NewClass extends cc.Component {

    @property(cc.Node)
    obj:cc.Node = null;

    //显示当前得分的Label
    @property(cc.Label)
    rScore:cc.Label = null;
    //显示过关所需分数的Label
    @property(cc.Label)
    nScore:cc.Label = null;

    //过关所需分数
    private score;

    start(){
        
    }

    update(){
        this.score = Number(this.nScore.string);
        //如果当前得分大于等于过关所需分数，更新下一关所需分数
        if((this.obj.childrenCount == 0)&&(this.score >= Number(this.nScore.string))){
            this.score += 15;
            this.nScore.string = this.score.toString();
        }
    }

}