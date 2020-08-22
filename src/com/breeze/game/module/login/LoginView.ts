module qmr
{
    export class LoginView extends LoginViewUI
    {
        public groupWind: eui.Group;
        public imgWindSlow: eui.Image;
        public imgWindFast: eui.Image;
        public imgWindMiddle: eui.Image;

        public groupRoleMonkey: eui.Group;
        private avatar: BaseActor;



        public constructor()
        {
            super();
            this.needAdaptStatusBar = false;
        }

        /**
         * @description 初始化事件
         */
        protected initListener(): void
        {
            super.initListener();
            this.addClickEvent(this.btn_login, this.onStartLogin, this);
            this.addClickEvent(this.btn_switch, this.onShowCreate, this);

            LabelUtil.addInputListener(this.txt_account, this);

        }

        protected addedToStage(evt: egret.Event): void
        {
            super.addedToStage(evt);

            this.addEffect();

            var loadSpan = document.getElementById("gameLoading");
            if (loadSpan && loadSpan.parentNode)
            {
                loadSpan.parentNode.removeChild(loadSpan);
            }
            var styleSpan = document.getElementById("style");
            if (styleSpan && styleSpan.parentNode)
            {
                styleSpan.parentNode.removeChild(styleSpan);
            }


            PlatformManager.instance.platform.setLoadingStatus("");
            this.imgBg.source = "serverlist_loginBg_jpg";
            this.imgBg.addEventListener(egret.Event.COMPLETE, this.onBgResBack, this);

            GameLoadManager.instance.loadGameResAfterLogin();
        }

        private onBgResBack(): void
        {
            qmr.LogUtil.log("onBgResBack");
            if (document && document.getElementById("loaingMyBg"))
            {
                let myBg = document.getElementById("loaingMyBg");
                myBg.style.display = "none";
            }
        }

            
        /** 加云朵 */
        private addWindEffect(): void
        {
            let moveTime = 7000;
            this.imgWindSlow.x = this.stage.stageWidth;
            this.imgWindFast.x = this.stage.stageWidth;
            this.imgWindMiddle.x = this.stage.stageWidth;


            let windTarget = -this.imgWindSlow.width;
            qmr.LogUtil.log("this.imgWindSlow.width", this.imgWindSlow.width);
            egret.Tween.get(this.imgWindSlow, { loop: true }).to({ x: windTarget }, moveTime);
            egret.Tween.get(this.imgWindFast, { loop: true }).to({ x: windTarget }, moveTime / 1.5);
            egret.Tween.get(this.imgWindMiddle, { loop: true }).to({ x: windTarget }, moveTime / 1.3);
        }

        private createAvatar(){
            this.avatar = new BaseActor(SystemPath.roleUiPath, null, this, Status.IDLE);
            this.groupRoleMonkey.addChild(this.avatar);
            this.avatar.addPartAt(ActorPart.BODY, 20100, 0, -1);
        }

        /** 加特效 */
        private addEffect(): void
        {
            this.createAvatar();

            let moveTime = 4000;
            this.groupMonkey.y = 0;
            egret.Tween.get(this.groupMonkey, { loop: true }).to({ y: 40 }, moveTime).to({ y: 0 }, moveTime);

            this.addWindEffect();

        }

        /**
        * @description 初始化数据,需被子类继承
        */
        protected initData(): void
        {
            super.initData();
            this.btn_login.enabled = true;
            this.txt_account.text = "服务一区";
            this.txt_severmax.text = "服务二区";
        }

        /**
         * @description 点击登陆
         */
        private onStartLogin(flag: boolean = true): void
        {
           LoginController.instance.onEnterGame();
        }

        private onShowCreate():void
        {
            LoginManager.showCreateView();
        }

        public dispose(): void
        {
            super.dispose();
            LabelUtil.removeInputListener(this.txt_account, this);

            egret.Tween.removeTweens(this.imgWindSlow);
            egret.Tween.removeTweens(this.imgWindFast);
            egret.Tween.removeTweens(this.imgWindMiddle);

            egret.Tween.removeTweens(this.groupMonkey);

            // egret.Tween.removeTweens(this.imgLight);

            if (this.avatar)
            {
                this.avatar.dispos();
            }
            
			ModuleManager.deleteModule(ModuleNameLogin.LOGIN_VIEW);
			
			let destroySuccess: boolean = RES.destroyRes("login");
			qmr.LogUtil.log("RES.destroyRes,login=", destroySuccess); 
        }
    }
}
