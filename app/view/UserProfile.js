var tp = new Ext.XTemplate('<div class="thumb" style="background-image:url({avatar_url});"></div>',
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
					type : 'hbox',
					align : 'center',
					pack: 'start'
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
				cls: 'skillDataviewCls',
				itemId: 'userSkills',
				itemTpl: '{name}',
				inline: true,
				scrollable: null,
				store:{
					fields:['name','id'],
					data:[]
				},
				items:[{
					xtype: 'label',
					docked: 'top',
					cls   : 'formExtraLableCls',
					html: 'Skill set: '
				}]
			},
/* 			{
				xtype : 'component',
				tpl  : [	'<div>Skill sets</div>',
							'<tpl for="skills">',
								'<span class="cls-skill-item"> {.} </span>',
							'</tpl>'].join(''),
				data: {
					skills: ["skill_1","skill_2","skill_3","skill_4","skill_5","skill_6"]
				},
				cls   : 'formExtraLableCls',
			}, */
			{
				xtype : 'dataview',
				scrollable : null,
				itemId : 'recent_activity',
				cls: 'clsEndorsmentDataview',
				style : 'color : white;',
				itemTpl: tp,
				store : 'GetUserData'
				//data:[]
			/*	data: [
					{ title: 'Player Name 1', date:'9/12/13', message: 'This user endorses John Doe for Great Marketing Skills',thumb : 'resources/images/user.png'},
					{ title: 'Player Name 2', date:'9/12/13', message: 'This user endorses John Doe for Great Marketing Skills',thumb : 'resources/images/user.png'},
					{ title: 'Player Name 3', date:'9/12/13', message: 'This user endorses John Doe for Great Marketing Skills',thumb : 'resources/images/user.png'},
					{ title: 'Player Name 4', date:'9/12/13', message: 'This user endorses John Doe for Great Marketing Skills',thumb : 'resources/images/user.png'}
				]*/
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
		var homeview = Ext.Viewport.down('homeview');
		homeview.animateActiveItem('#idSupportPlayer',{type:'slide',direction: 'left'});
	},
	endorseSkill: function(ths,indx,target,record){
		console.log(ths,indx,record);
		var userRecord = this.getConfig('userRecord'),
			user_id = userRecord.user_id;
		var currentUserProfile = Ext.getStore('Profile'),
			currentUser = currentUserProfile.getAt(0),
			currentUser_id = currentUser.get('user_id');
		if(user_id == currentUser_id)	//Current User
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
			},
			failure:function(res){
				Ext.Msg.alert("Error","Status Code: " + res.status);
			}
		});
	}
});