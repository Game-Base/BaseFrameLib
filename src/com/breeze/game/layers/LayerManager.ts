namespace qmr
{
    import DisplayObjectContainer = egret.DisplayObjectContainer;

    export class LayerManager
    {

        private static _instance: LayerManager;
        private _parent: DisplayObjectContainer;
        private layerList: Array<any> = new Array();
        private layerDic: Dictionary = new Dictionary();
        private layerIndex: number;

        public static get instance(): LayerManager
        {
            if (this._instance == null)
            {
                this._instance = new (LayerManager)();
            }
            return this._instance;
        }

        public setup(container: DisplayObjectContainer): void
        {
            this._parent = container;
            this.layerIndex = this._parent.numChildren;
            this.addLayer(LayerConst.MAP_LAYER, true);//战斗场景
            this.addLayer(LayerConst.FIGTH_UI, true);//战斗UI
            this.addLayer(LayerConst.TOOLBAR, true);
            this.addLayer(LayerConst.ACTIVITY_UI, true);//活动界面，处于战斗和UI层之家
            this.addLayer(LayerConst.BASE_UI, true);//全屏窗口UI
            this.addLayer(LayerConst.SECOND_PAGE_UI, true);//全屏窗口UI
            this.addLayer(LayerConst.UI_EFFECT, false);
            this.addLayer(LayerConst.ALERT, true);
            this.addLayer(LayerConst.SYSTEM_UI, true);
            this.addLayer(LayerConst.MASK_UI, true);//遮罩窗口UI
            this.addLayer(LayerConst.GUIDE, true);
            this.addLayer(LayerConst.CHAT, true);
            this.addLayer(LayerConst.TOP, true);
            this.addLayer(LayerConst.TIP, false);
            this.addLayer(LayerConst.LOADING, false);//loading
        }

        private _isHideFight: boolean;//是否隐藏了战斗
        /** 打开模块界面之后把战斗层，功能按钮隐藏/显示 */
        public showOrHideFightMapAndToolbar(v: boolean)
        {
            if (v)
            {
                let layer = this.getLayer(LayerConst.MAP_LAYER);
                DisplayUtils.removeDisplay(layer);
                layer = this.getLayer(LayerConst.FIGTH_UI);
                DisplayUtils.removeDisplay(layer);
                layer = this.getLayer(LayerConst.TOOLBAR);
                DisplayUtils.removeDisplay(layer);
            }
            else
            {
                let layer = this.getLayer(LayerConst.MAP_LAYER);
                this._parent.addChildAt(layer, this.layerIndex);
                layer = this.getLayer(LayerConst.FIGTH_UI);
                this._parent.addChildAt(layer, this.layerIndex + 1);
                layer = this.getLayer(LayerConst.TOOLBAR);
                this._parent.addChildAt(layer, this.layerIndex + 2);
            }
            this._isHideFight = v;
        }

        /** 是否隐藏了战斗 */
        public get isHideFight():boolean
        {
            return this._isHideFight;
        }

        public showLayer(_arg1: string): void
        {
            var layer: DisplayObjectContainer = this.getLayer(_arg1);
            if (layer)
            {
                layer.x = 0;
            };
        }
        public hideLayer(_arg1: string): void
        {
            var layer: DisplayObjectContainer = this.getLayer(_arg1);
            if (layer)
            {
                layer.x = 9999;
            }
        }
        private addLayer(layerName: string, mouseEnabled: boolean): void
        {
            var layer: DisplayObjectContainer;
            var d: DisplayObjectContainer = this._parent.getChildByName(layerName) as DisplayObjectContainer;
            if (d)
            {
                return;
            }
            layer = new DisplayObjectContainer();
            //layer.width = Config.width;
            //layer.height = Config.height;
            layer.touchEnabled = layer.touchChildren = mouseEnabled;
            layer.name = layerName;

            this.layerList.push(layer);
            this._parent.addChild(layer);
            this.layerDic.set(layerName, layer)
        }

        public getLayer(type: string): DisplayObjectContainer
        {
            if (!type)
            {
                return (null);
            }
            return this.layerDic.get(type) as DisplayObjectContainer;
        }
        public addChild(dis: DisplayObjectContainer, type: string): DisplayObjectContainer
        {
            var sp: DisplayObjectContainer = this.getLayer(type);
            if (sp)
            {
                sp.addChild(dis);
            }
            return (dis);
        }
        public addChildAt(dis: DisplayObjectContainer, _arg2: string, _arg3: number = 0): DisplayObjectContainer
        {
            var layer: DisplayObjectContainer = this.getLayer(_arg2);
            if (layer)
            {
                layer.addChildAt(dis, 0);
            }
            return (dis);
        }

        public removeChild(window: DisplayObjectContainer): DisplayObjectContainer
        {
            if (!window)
            {
                return (window);
            }
            if (window.parent)
            {
                window.parent.removeChild(window);
            }
            return (window);
        }
        public setCenter(window: DisplayObjectContainer): void
        {
            if (!window)
            {
                return;
            }
            window.x = Math.floor(((StageUtil.stageWidth - window.width) / 2));
            window.y = Math.floor(((StageUtil.stageHeight - window.height) / 2));
        }

        public set layersVisible(b: boolean)
        {
            for (let layer of this.layerList)
            {
                if (layer.visible == b) break;
                layer.visible = b;
            }
        }

        /**
		 * @description 添加显示对象
		 * @param disPlay 要添加的显示对象
		 * @param layer 显示对象的层级
		 */
        public addDisplay(disPlay: egret.DisplayObject, layerType: string, zIndex?: number): void
        {
            let layer = this.getLayer(layerType)
            if (zIndex)
            {
                layer.addChildAt(disPlay, 999);
            } else
            {
                layer.addChild(disPlay);
            }
        }
    }
}