module qmr {
	/**游戏服务器登录流程控制类 */
	export class LoginManager 
	{
		public static async showLoginView()
		{
			ModuleManager.showModule(ModuleNameLogin.LOGIN_VIEW);
		}

		public static async showCreateView()
		{
			await GameLoadManager.instance.loadcreateRes();//先加载创角界面资源
			ModuleManager.showModule(qmr.ModuleNameLogin.CREATEROLE_VIEW);
		}

	}
}