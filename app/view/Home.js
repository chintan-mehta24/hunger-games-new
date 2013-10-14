Ext.define('HungerApp.view.Home', {
	extend: 'Ext.Panel',
	xtype: 'homeview',
	requires:[
		'Ext.form.Panel',
		'Ext.form.FieldSet',
		'Ext.field.Email',
		'HungerApp.view.Login'
	],
	config:{
		layout:'card',
		cls: 'blackBgFormPanelCls',
		items:[
			{
				xtype: 'titlebar',
				docked: 'top',
				layout:{
					align:'stretch',
					pack: 'justify'
				},
				hidden: true,
				itemId: 'mainNavigationTopbar',
				cls: 'mainNavigationToolbar',
				ui: 'plain',
				items:[{
					xtype: 'button',
					icon: 'resources/images/menu.png',
					ui: 'plain',
					align: 'left',
					cls: 'leftMainMenuBtn',
					itemId: 'mainMenuNavigationBtn',
					text: 'Main Menu'
				},{
					xtype: 'button',
					icon: 'resources/images/down_arrow.png',
					ui: 'plain',
					iconAlign: 'right',
					cls: 'leftMainMenuBtn',
					itemId: 'mainMenuSubNavigationBtn',
					align: 'right',
					text: 'Sub Nav'
				}]
			},
			{
				xtype: 'panel',
				itemId: 'panelHomeLogin',
				layout:{
					type:'vbox',
					pack:'justify'
				},
				items:[
					{xtype:'spacer'},
					{
						xtype: 'button',
						itemId: 'btnLogin',
						ui: 'main-ui-button',
						text: 'Login'
					},
					{xtype:'spacer'},
					{
						xtype: 'button',
						itemId: 'btnSpectator',
						ui: 'main-ui-button',
						text: 'Register User'
					},
					{xtype:'spacer'},
					{
						xtype: 'button',
						itemId: 'btnPlayer',
						ui: 'main-ui-button',
						text: 'Register Player'
					},
					{xtype:'spacer'}
				]
			},
			{
				xtype: 'loginform',
				itemId: 'formPanelLogin',
			},
			{
				xtype: 'SpectatorRegistration',
				itemId: 'formPanelSpectatorRegistration'
			},
			{
				xtype: 'PlayerRegistration',
				itemId: 'formPanelPlayerRegistration'
			},
			{
				xtype: 'avatarSelector',
				itemId: 'idAvatarSelection'
			},
			{
				xtype: 'mainfeedactivity',
				itemId: 'idListMainFeed'
			},
			{
				xtype: 'userprofile',
				itemId: 'formUserProfile'
			},
			{
				xtype: 'scoreboard',
				itemId: 'idScorecard'
			},
			{
				xtype: 'UserPledgeCharity',
				itemId: 'idUserPledgeCharity'
			},
			{
				xtype: 'SupportPlayer',
				itemId: 'idSupportPlayer'
			},
			{
				xtype: 'EditProfile',
				itemId: 'idEditProfile'
			},
			{
				xtype: 'UserChallenge',
				itemId: 'idUserChallenge'
			},
			{
				xtype: 'SearchUser',
				itemId: 'idSearchUser'
			},
			{
				xtype: 'PlayerRequestList',
				itemId: 'idPlayerRequestList'
			},
			{
				xtype: 'FeaturedVideo',
				itemId: 'idFeaturedVideo'
			},
			{
				xtype: 'ChallengeReview',
				itemId: 'idChallengeReview'
			},
			{
				xtype: 'ActionSheetUploadImage',
				itemId: 'idActionSheetUploadImage'
			},
			{
				xtype: 'JudgeChallenge',
				itemId: 'idJudgeChallenge'
			},
			{
				xtype: 'minichallenge',
				itemId: 'idMiniChallenge',
			},
			{
				xtype: 'ActionSheetViewChallenge',
				itemId: 'idActionSheetViewChallenge',
			},
			{
				xtype: 'footer',
				docked: 'bottom'
			}
		],
		listeners:[{
			delegate: '#btnLogin',
			event: 'tap',
			fn: 'onButtonLogin'
		},{
			delegate: '#btnSpectator',
			event: 'tap',
			fn: 'onButtonSpectator'
		},{
			delegate: '#btnPlayer',
			event: 'tap',
			fn: 'onButtonPlayer'
		},{
			delegate: '#mainMenuNavigationBtn',
			event: 'tap',
			fn: 'onMainMenuButtonTap'
		},{
			delegate: '#mainMenuSubNavigationBtn',
			event: 'tap',
			fn: 'onMainSubNavButtonTap'
		}]
	},
	onButtonLogin: function(){
		this.animateActiveItem('#formPanelLogin',{type:'slide',direction:'left',duration:200});
	},
	onButtonSpectator: function(){
		this.animateActiveItem('#formPanelSpectatorRegistration',{type:'slide',direction:'left',duration:200});
	},
	onButtonPlayer:  function(){
		this.animateActiveItem('#formPanelPlayerRegistration',{type:'slide',direction:'left',duration:200});
	},
	onMainSubNavButtonTap: function(btn){
		var data = [{title: 'Edit Profile'},
					{title: 'Logout'}],
			me = this;
		this.showPopupOverlay(btn,data,function(ths,index,target,record){
			switch(index){
				case 0:	// Edit Profile
					me.onEditProfileButtonTap();
					break;
				case 1: // Logout
					me.onLogoutButtonTap();
					break;
			}
		},this);
	},
	onEditProfileButtonTap : function(){
		var userStore = Ext.getStore('Profile');
		var homeview = Ext.Viewport.down('homeview');
		var editProfileForm = homeview.down('#idEditProfile');
		editProfileForm.setValues(userStore.getAt(0).data);
		if(userStore.getAt(0).data.sex=='Male'){
			editProfileForm.down('#checkBoxMale').check();
		}
		else{
			editProfileForm.down('#checkBoxFemale').check();
		}
		homeview.animateActiveItem('#idEditProfile',{type:'slide',direction: 'right'});
		if(userStore.getAt(0).data.status=="player"){
			editProfileForm.down('#skillLabel').setHidden(false);
			editProfileForm.down('#skillSet').setHidden(false);
		}
		else
		{
			editProfileForm.down('#skillLabel').setHidden(true);
			editProfileForm.down('#skillSet').setHidden(true);
		}

	},
	onLogoutButtonTap : function(){
		var userStore = Ext.getStore('Profile');
		userStore.clearData();
		var homeview = Ext.Viewport.down('homeview');
		homeview.down('#mainNavigationTopbar').setHidden(true);
		homeview.animateActiveItem('#panelHomeLogin',{type:'slide',direction: 'right'});
	},
	
	onMainMenuButtonTap:function(btn){
		var userStore = Ext.getStore('Profile');
		var data = [];
		if((userStore.data.getAt(0).data.status=="player") || (userStore.data.getAt(0).data.status=="judge") ){
			data = [{title: 'Main Activity',index:0},
					{title: 'Search User',index:1},
					{title: 'Scorecard',index:2},
					{title: 'Profile',index:3},
					{title: 'Challenges',index:4},
					{title: 'Mini Challenge',index:5}];
		}
		else{
			data = [{title: 'Main Activity',index:0},
					{title: 'Search User',index:1},
					{title: 'Scorecard',index:2},
					{title: 'Profile',index:3},
					/* {title: 'Mini Challenge',index:5} */];
		}
		me = this;
		this.showPopupOverlay(btn,data,function(ths,index,target,record){
			switch(record.get('index')){
				case 0:	
						me.animateActiveItem('#idListMainFeed',{type:'slide',direction:'left',duration:200});
					break;
				case 1:
						var searchStore = Ext.getStore('SearchUser');
						searchStore.clearData();
						me.animateActiveItem('#idSearchUser',{type:'slide',direction:'left',duration:200});
					break;
				case 2:
						var homeview = Ext.Viewport.down('homeview'),
							userStore = Ext.getStore('Profile'),
							record = userStore.getAt(0),
							scoreBordeStore = Ext.getStore('ScoreBoard'),
							scoreBoardProxy = scoreBordeStore.getProxy();
						
						homeview.animateActiveItem('#idScorecard',{type:'slide',direction:'left',duration:200});				
						scoreBoardProxy.setExtraParam('auth_token',record.get('auth_token'));
						scoreBordeStore.load();
						Ext.Viewport.setMasked(false);
						// var homeController=HungerApp.app.getController('Home');
						// homeController.setScroeBoard(userStore.getAt(0).data.auth_token);
					break;
				case 3:
						var userStore = Ext.getStore('Profile');
						var homeController=HungerApp.app.getController('Home');
						homeController.setProfilePageData(userStore.getAt(0).data.user_id,true);
						//me.animateActiveItem('#formUserProfile',{type:'slide',direction:'left',duration:200});
					break;
				case 4:
						var userStore = Ext.getStore('Profile'),
							record = userStore.getAt(0),
							status = record.get('status');
						var userChallenge = Ext.getStore('UserChallenge');
						userChallenge.getProxy().setUrl(applink+'api/challenges?user_id='+record.get('user_id'));
						userChallenge.load();
						if(status=="player")
							me.animateActiveItem('#idUserChallenge',{type:'slide',direction:'left',duration:200});
						else if(status=="judge")
							me.animateActiveItem('#idJudgeChallenge',{type:'slide',direction:'left',duration:200});
					break;
				case 5: 
					me.animateActiveItem('#idMiniChallenge',{type:'slide',direction:'left',duration:200});
					break;
			}
		},this);
	},
	
	showPopupOverlay: function(btn,data,callback,scope){
		var box = btn.element.getBox(),
			top = box.bottom;
		var overlay = Ext.create("Ext.Panel",{
			centered : true,
			modal: true,
			top: top,
			left: 0, right: 0,
			cls: 'mainMenuOverlayCls',
			hideOnMaskTap: true,
			items:[{
				xtype: 'dataview',
				scrollable: null,
				inline: true,
				itemTpl: '{title}',
				store: {
					data: data
				},
			}]
		});
		overlay.down('dataview').on('itemtap',function(){
			callback.apply(scope,arguments);
			this.hide();
		},overlay);
		Ext.Viewport.add(overlay);
		overlay.on('hide',function(){this.destroy();},overlay);
		overlay.show();
	}
});