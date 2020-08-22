module qmr
{
	/** 创建角色UI */
	export class CreateRoleViewUI extends SuperBaseModule
	{
		public imageBg: eui.Image;
		public bgGroup: eui.Group;
		public modelCon: eui.Group;
		public manButton: eui.ToggleButton;
		public womanButton: eui.ToggleButton;
		public roleName:eui.TextInput;
		public btn_enter: eui.Button;
		public randomName: eui.Group;
		public lbl_time: eui.Label;

		public constructor()
		{
			super();
			this.qmrSkinName = "CreateRoleSkin";
		}
	}
}