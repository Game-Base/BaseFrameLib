module qmr
{
    export class CreateRoleView extends CreateRoleViewUI
    {

        private avatar: BaseActor;
        private manId: number = 100300;
        private womanId: number = 200300;
        private curId: number;
        public sex: number;

        public constructor()
        {
            super();
            this.needAdaptStatusBar = false;
            this.groupName = "createrole"; 
            GlobalConfig.isCreatRoleEnterGame = true;
        }

		/*
		 *  初始化组件
         */
        protected initComponent(): void
        {
            let t = this;
            if (Math.random() > 0.5)
            {
                t.sex = 1;
                t.womanButton.selected = true;
                t.manButton.selected = false;
            } else
            {
                t.sex = 0;
                t.womanButton.selected = false;
                t.manButton.selected = true;
            }
            
            t.roleName.textDisplay.textAlign = "center";
            t.roleName.promptDisplay.textAlign = "center";

            t.bgGroup.addChild(t.womanButton);
            t.bgGroup.addChild(t.manButton);
        }
        /**
         *  初始化事件
         */
        protected initListener(): void
        {
            super.initListener();
            let t = this;
            t.addEvent(t.manButton, egret.TouchEvent.TOUCH_TAP, t.roleCheck, t);
            t.addEvent(t.womanButton, egret.TouchEvent.TOUCH_TAP, t.roleCheck, t);
            t.addClickEvent(t.btn_enter, t.onCreatRole, t);
            t.roleName.addEventListener(egret.FocusEvent.FOCUS_IN, this.focusInTxtHandler, t)
			t.roleName.addEventListener(egret.FocusEvent.FOCUS_OUT, this.focusOutTxtHandler, t)
        }

        /**
         *  初始化数据
         */
        protected initData(): void
        {
            super.initData();
            PlatformManager.instance.platform.setLoadingStatus("");
            // window["hideProgress"]();
            GameLoading.getInstance().close();
            this.imageBg.source = "cjbg1_jpg";
            this.showSelectEffect();

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

            if (document && document.getElementById("loaingMyBg"))
            {
                let myBg = document.getElementById("loaingMyBg");
                myBg.style.display = "none";
            }
            //开始后台加载游戏资源
            GameLoadManager.instance.loadGameResAfterLogin();
        }

        private focusInTxtHandler(){
            LabelUtil.focusInTxtHandler();
        }

        private focusOutTxtHandler(){
            LabelUtil.focusInTxtHandler();
        }

        /**
         *  按钮处理函数
         */
        private roleCheck(evt: egret.TouchEvent): void
        {
            this.loadAndPlayEffect("SOUND_XUANZHONG");
            if (evt.currentTarget == this.manButton)
            {
                this.manButton.selected = true;
                this.womanButton.selected = false;
                this.sex = 0;
            } else
            {
                this.womanButton.selected = true;
                this.manButton.selected = false;
                this.sex = 1;
            }
            this.showSelectEffect();
        }
        /**
         *  根据性别显示效果
         */
        private showSelectEffect(): void
        {
            let tframe: number;
            if (this.sex == 0)
            {
                this.curId = this.manId;
                tframe = 9;
            } else
            {
                this.curId = this.womanId;
                tframe = 10;
            }
            if (this.avatar)
                this.avatar.dispos();
            this.avatar = new BaseActor(SystemPath.roleUiPath, null, this, Status.IDLE);
            this.modelCon.addChild(this.avatar);
            this.avatar.scaleX = this.avatar.scaleY = 1.5;
            this.avatar.addPartAt(ActorPart.BODY, this.curId, 0, -1);
        }

        /**
         *  创建角色按钮点击结束
         */
        private onCreatRole(isClick:boolean = true): void
        {
            LoginManager.showLoginView();
        }

        /**
         *  资源释放
         */
        public dispose(): void
        {
            this.roleName.removeEventListener(egret.FocusEvent.FOCUS_IN, this.focusInTxtHandler, this)
			this.roleName.removeEventListener(egret.FocusEvent.FOCUS_OUT, this.focusOutTxtHandler, this)
            super.dispose();
            GameLoading.getInstance().close();
            if (this.avatar)
            {
                this.avatar.dispos();
            }
            //该界面只会被使用一次，用完就删除
            ModuleManager.deleteModule(ModuleNameLogin.CREATEROLE_VIEW);
			let destroySuccess: boolean = RES.destroyRes("createrole")
			qmr.LogUtil.log("RES.destroyRes,createRole=", destroySuccess);
        }
    }
}
