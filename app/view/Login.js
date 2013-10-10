Ext.define('HungerApp.view.Login', {
	extend: 'Ext.form.Panel',
	xtype:'loginform',
	config:{
		items:[
			{
				xtype:'titlebar',
				docked: 'top',
				ui: 'plain',
				cls: 'topBarLoginCls',
				title: 'Login',
				items:[{
					xtype: 'button',
					ui: 'plain',
					icon: 'resources/images/left_arrow.png',
					text: 'Back',
					itemId: 'btnLoginBack'
				},{
					xtype: 'button',
					ui: 'plain',
					iconMask : true,
					iconCls : 'video',
					align : 'right',
					//icon: 'resources/images/left_arrow.png',
					text: 'Video',
					itemId: 'btnVideo'
				}],
			},
			{
				xtype: 'emailfield',
				label: 'User email address',
				labelAlign: 'top',
				itemId: 'emailLogin',
				//value : 'j@yopmail.com' // 'a@yopmail.com' //'shahdeep1989@gmail.com' //'md@yopmail.com'
			},{
				xtype: 'passwordfield',
				label: 'Password',
				labelAlign: 'top',
				itemId: 'passwordLogin',
				//value : '12345678'
			},{
				xtype: 'button',
				text: 'Login',
				itemId: 'btnLoginForm',
				cls   : 'submitBtnCls'
			},{
				xtype: 'button',
				text: 'Forgot Password',
				itemId: 'btnForgotForm',
				cls   : 'submitBtnCls'
			}
		],
		listeners:[{
			delegate: '#btnLoginBack',
			event: 'tap',
			fn: 'backFromLogin'
		},{
			delegate: '#btnForgotForm',
			event: 'tap',
			fn: 'doForgot'
		},{
			delegate: '#btnLoginForm',
			event: 'tap',
			fn: 'doLogin'
		},{
			delegate: '#btnVideo',
			event: 'tap',
			fn: 'playVideo'
		}]
	},
	backFromLogin: function(){
		var homeview = Ext.Viewport.down('homeview');
		homeview.animateActiveItem('#panelHomeLogin',{type:'slide',direction: 'right'});
	},
	doForgot: function(){
	
		Ext.Msg.prompt("Forgot Password","Enter your email address",function(btn,data){
			if(btn == "ok"){
				if(Ext.isEmpty(data)){
					Ext.Msg.alert(null,'Email cannot be blank.',function(){
						this.doForgot();
					},this);
					return;
				}
				var homeController = HungerApp.app.getController('Home');
				homeController.doForgotPassword(data);
			}
		},this,false,false,{
			xtype: 'emailfield',
			placeHolder: 'abc@email.com'
		});
	},
	doLogin: function(){
		var homeview = Ext.Viewport.down('homeview');
		var emailLogin = homeview.down('#emailLogin')._value;
		var passwordLogin = homeview.down('#passwordLogin')._value;
		var homeController=HungerApp.app.getController('Home');
		
        if(Ext.isEmpty(emailLogin)){
			Ext.Msg.alert(null,'Email cannot be blank.');
			return;
        }
        else if(Ext.isEmpty(passwordLogin)){
            Ext.Msg.alert(null,'Password cannot be blank.');
			return;
        }

		homeController.doLogin(emailLogin, passwordLogin);
	},
	
	playVideo: function(){
		var homeController=HungerApp.app.getController('Home');
		homeController.getVideo(this);
	},
});