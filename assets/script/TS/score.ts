const {ccclass, property} = cc._decorator;

@ccclass
export class NewClass extends cc.Component {

    @property(cc.Label)
    rScore:cc.Label = null;

    @property(cc.Label)
    nScore:cc.Label = null;

    private score = 0;

    start(){
        
    }

    update(){
        this.score = Number(this.nScore.string);
        if(Number(this.rScore.string) >= Number(this.nScore.string)){
            this.score += 15;
            this.nScore.string = this.score.toString();
        }
    }

}