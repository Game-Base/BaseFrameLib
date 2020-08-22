module qmr
{

    export class LoginViewUI extends SuperBaseModule
    {
        public imgBg: eui.Image;


        public groupMonkey: eui.Group;
        // public imgMonkey: eui.Image;
        // public imgLight: eui.Image;

        public groupLogin: eui.Group;
        public btn_login: eui.Button;
        public txt_severmax: eui.Label;
        public g_select: eui.Group;
        public txt_new: eui.Label;
        public txt_severname: eui.Label;
        public groupAccount: eui.Group;
        public txt_account: eui.TextInput;
        public lbl_ver: eui.Label;
        public btn_switch: eui.Group;


        public constructor()
        {
            super();
            this.qmrSkinName = "LoginViewSkin";
        }
    }
}