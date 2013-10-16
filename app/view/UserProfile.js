var tp = new Ext.XTemplate('<div class="thumb" style="background-image:url(\'{avatar_url}\');"></div>',
							'<div class="endorsPlayer">',
								'<div class="title">{user_first_name} {user_last_name}<span>{created_at:this.setMyDate}</span></div>',
								'<div class="message">{message}</div>',
							'</div>',{
										// XTemplate configuration:
										disableFormats: false,
										// member functions:
										setMyDate: function(date){
										   return Ext.Date.format(new Date(date), 'd/m/y');
										},
									});
Ext.define('HungerApp.view.UserProfile', {
	extend: 'Ext.form.Panel',
	xtype: 'userprofile',
	config: {
		userRecord: false,
		items : [
			{
				xtype : 'panel',
				layout: {
					align:'stretch',
					pack: 'justify',
					type : 'hbox'
				},
				items : [
					{
						xtype : 'image',
						cls	  : 'clsPlayerAvatar',
						itemId  : 'avatar_url',
						src   : 'resources/images/user.png'
					},
					{
						xtype : 'panel',
						layout:  'vbox',
						flex : 1,
						items : [
							/*{
								xtype : 'component',
								cls: 'clsPlayerTitle',
								tpl:[	'<div class="username">{username}</div>',
										'<div class="position">{position},<span>{company}<span></div>',
										'<div class="district">{district}</div>',
										'<div class="sponser">MD / Sponsor</div>'].join(''),
								data:{
									username : "John Doe",
									position : "Position",
									company : "Company",
									district : "District"
								}
							},*/
							{
								xtype : 'label',
								cls: 'clsPlayerTitle username',
								itemId : 'name',
								//html : "John Doe",
							},
							{
								xtype : 'label',
								cls: 'clsPlayerTitle district',
								itemId : 'company',
								//html : "District",
							},
							{
								xtype : 'label',
								cls: 'clsPlayerTitle sponser',
								itemId : 'status',
								//html : "MD / Sponsor",
							},
							{
								xtype : 'panel',
								layout: 'hbox',
								itemId: 'charity',
								defaults:{
									xtype: 'button',
									cls: 'btnPlainProfileAction',
									ui: 'plain'
								},
								items: [{
									icon: 'resources/images/support.png',
									itemId : 'btnSupportPlayer'
								},{
									hidden: true,
									icon: 'resources/images/donate.png',
									itemId : 'btnPledgeCharityPage'
								}]
							}
						]
					}
				]
			},
			{
				xtype : 'component',
				itemId: 'bio',
				//html  : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non mauris semper turpis convallis consectetur in sollicitudin massa. Nam sed lorem arcu. ',
				cls   : 'formExtraLableCls',
			},
			{
				xtype: 'dataview',
				name: 'skills',
				emptyText: 'No skills available',
				cls: 'skillDataviewCls',
				itemCls: 'profileSkills',
				itemId: 'userSkills',
				itemTpl: '<div class="skill {isEndorse}">{name}</div>',
				inline: true,
				scrollable: null,
				store:{
					fields:['name','id','isEndorse'],
					data:[]
				},
				items:[{
					xtype: 'label',
					scrollDocked: 'top',
					cls   : 'formExtraLableCls',
					html: 'Skill set: '
				}]
			},
			{
				xtype : 'dataview',
				scrollable : null,
				itemId : 'recent_challenges',
				cls: 'clsEndorsmentDataview',
				emptyText: 'No challenges available posted',
				style : 'color : white;',
				itemTpl: new Ext.XTemplate('<div class="endorsPlayer">',
							'<div class="title">{title}<span>{created_at:this.setMyDate}</span></div>',
							'<div class="message">{description}</div>',
						'</div>',{
							setMyDate:function(date){
							   return Ext.Date.format(new Date(date), 'd/m/y');
							}
						}),
				store : {
					fields:["description","title","created_at"]
				},
				items:[{
					xtype: 'label',
					scrollDocked: 'top',
					cls   : 'formExtraLableCls',
					html: 'Challenges Completed: '
				}]
			},
			{
				xtype : 'dataview',
				scrollable : null,
				emptyText: 'No activity available',
				itemId : 'recent_activity',
				cls: 'clsEndorsmentDataview',
				style : 'color : white;',
				itemTpl: tp,
				store : 'GetUserData'
			}
		],
		listeners : [ {
			delegate: '#btnPledgeCharityPage',
			event: 'tap',
			fn: 'doPledgeCharity'
		},{
			delegate: '#btnSupportPlayer',
			event: 'tap',
			fn: 'doSupportPlayer'
		},{
			delegate: '#userSkills',
			event: 'itemtap',
			fn: 'endorseSkill'
		}]
	},
 	doPledgeCharity: function(){
		var homeview = Ext.Viewport.down('homeview');
		homeview.animateActiveItem('#idUserPledgeCharity',{type:'slide',direction: 'left'});
	},
 	doSupportPlayer: function(){	
				var userRecord = this.getConfig('userRecord'),
				uid = userRecord.user_id;

		Ext.Msg.confirm("Confirm","Do you want to support "+userRecord.name,function(btn,data){
			if(btn == "yes"){


				var currentUserProfile = Ext.getStore('Profile'),
					currentUser = currentUserProfile.getAt(0),
					currentUser_id = currentUser.get('user_id');

				Ext.Ajax.request({
					url:applink+"api/users/support_to_player",
					method:"POST",
					jsonData : {
						auth_token : currentUser.get('auth_token'),
						support : uid
					},
					success:function(res){
						var resData = Ext.decode(res.responseText);
						if(resData.errors){
							Ext.Msg.alert("Error",resData.errors);
							return;
						}
						currentUser.set('support',true);
						Ext.Msg.alert("",resData.message);
					},
					failure:function(res){
						Ext.Msg.alert("Error","Status Code: " + res.status);
					}
				});	
			}
		});
		//var homeview = Ext.Viewport.down('homeview');
		//homeview.animateActiveItem('#idSupportPlayer',{type:'slide',direction: 'left'});
	},
	endorseSkill: function(ths,indx,target,record){
		console.log(ths,indx,record);
		var userRecord = this.getConfig('userRecord'),
			user_id = userRecord.user_id;
		var currentUserProfile = Ext.getStore('Profile'),
			currentUser = currentUserProfile.getAt(0),
			currentUser_id = currentUser.get('user_id');
		if(user_id == currentUser_id || record.get('isEndorse'))	//Current User
			return true;
			
		Ext.Ajax.request({
			url:applink+"api/users/endorsement",
			method:"POST",
			jsonData : {
				auth_token : currentUser.get('auth_token'),
				endorse : {
					user_id : currentUser_id,
					skill_id : record.get('id'),
					endorse_id: user_id
				}
			},
			success:function(res){
				var loginData = Ext.decode(res.responseText);
				if(loginData.errors){
					Ext.Msg.alert("Error",loginData.errors);
					return;
				}
				Ext.Msg.alert("",loginData.message);
				
			},
			failure:function(res){
				Ext.Msg.alert("Error","Status Code: " + res.status);
			}
		});
	}
});