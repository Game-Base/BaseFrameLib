class Main extends eui.UILayer {
    protected createChildren(): void {
        super.createChildren();

        console.log("xxxxxxxxxxxxxxxxxxxxxxxxxx初始化游戏引擎xxxxxxxxxxxxxxxxxxxxxxxx");
        qmr.GameMain.setup(this.stage);
    }
}
