Ext.define('HungerApp.controller.Home', {
    extend: 'Ext.app.Controller',
    
    config: {
			refs: {
				videoBtn      : '#idVideoBtn',
			},
			control: {
				homePage: {
					hide : 'homePageHide'
				},
				videoBtn: {
					tap : 'videoBtnClicked'
				},
			},
    },
    launch:function(){
            var me = this;
			
			//ActionSheetViewChallenge = Ext.create('HungerApp.view.ActionSheetViewChallenge');
			//Ext.Viewport.add(ActionSheetViewChallenge);
			
			Ext.Ajax.on('beforerequest',function(){
				Ext.Viewport.setMasked({xtype:'loadmask'});
			});
			Ext.Ajax.on('requestcomplete',function(){
				Ext.Viewport.setMasked(false);
			});
			Ext.Ajax.on('requestexception',function(){
				Ext.Viewport.setMasked(false);
				Ext.Msg.alert(null,'Error');
			});
			
			var userStore = Ext.getStore('Profile');
			if(userStore.getCount()>0){
				var homeview = Ext.Viewport.down('homeview'),
					navToolbar = homeview.down('#mainNavigationTopbar'),
					subNavBtn = navToolbar.down('#mainMenuSubNavigationBtn'),
					userRec = userStore.getAt(0);
				subNavBtn.setText(userRec.get('name') + " " + userRec.get('last_name'));
				if(userRec.get('status') == "md"){
					me.getPlayerReq(userStore.getAt(0).get('auth_token'));
					return;
				}
				navToolbar.setHidden(false);
				me.setNavigationToolbar();
				homeview.setActiveItem('#idListMainFeed');
			}
    },
	setNavigationToolbar: function(){
		var homeview = Ext.Viewport.down('homeview'),
			navToolbar = homeview.down('#mainNavigationTopbar'),
			userStore = Ext.getStore('Profile'),
			userRec = userStore.getAt(0);
		if(Ext.os.is.Desktop){
			navToolbar.down('#mainMenuNavigationBtn').setHidden(true);
			var dataview = navToolbar.down('dataview'),
				store = dataview.getStore();
			dataview.setHidden(false);
			if((userRec.get('status') == "player") || (userRec.get('status') == "judge") ){
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
			store.clearData();
			store.add(data);
		}
		else{
			navToolbar.down('#mainMenuNavigationBtn').setHidden(false);
			navToolbar.down('dataview').setHidden(true);
		}
	},
	getPlayerReq : function(token){

		var me = this;
		Ext.Ajax.request({
			url:applink+"api/users/accept_reject_of_player?auth_token="+token,
			method:"GET",
			success:function(res){
				console.log(res);
				var loginData = Ext.decode(res.responseText);
				if(loginData.errors)
				{
					Ext.Msg.alert("Error",loginData.errors);
					return;
				}
				
				var userStore = Ext.getStore('PlayerRequest');
				userStore.clearData();
				userStore.add(loginData.accept_reject_player);
				
				var homeview = Ext.Viewport.down('homeview');
				homeview.down('#mainNavigationTopbar').setHidden(false);
				if(userStore.getCount()>0)
				{
					homeview.down('#mainNavigationTopbar').setHidden(false);
					homeview.animateActiveItem('#idPlayerRequestList',{type:'slide',direction: 'left'});
				}
				else
				{
					homeview.down('#mainNavigationTopbar').setHidden(false);
					homeview.animateActiveItem('#idListMainFeed',{type:'slide',direction: 'left'});
				}
			},
			failure:function(res){
				Ext.Msg.alert(null,"Communication Error");
			}
		});

		
	},
	
    doLogin	: function(email,password){
		var me = this;
		Ext.Ajax.request({
			url:applink+"api/login",
			method:"POST",
			jsonData : {
					email : email,  //'admin@yopmail.com',
					password : password //'admin@123'
				},
			success:function(res){
				console.log(res);
				var loginData = Ext.decode(res.responseText);
				if(loginData.errors)
				{
					Ext.Msg.alert("Error",loginData.errors);
					return;
				}
				
				var userStore = Ext.getStore('Profile');
				userStore.clearData();
				userStore.add(loginData.user);
				var userRecord = userStore.getAt(0);
				var homeview = Ext.Viewport.down('homeview');
				var loginForm = homeview.down('#formPanelLogin');
				var navToolbar = homeview.down('#mainNavigationTopbar'),
					subNavBtn = navToolbar.down('#mainMenuSubNavigationBtn');
				subNavBtn.setText(userRecord.get('name') + " " + userRecord.get('last_name'));
				
				if(userRecord.get('status') == "md"){
					me.getPlayerReq(userRecord.get('auth_token'));
					return;
				}
				loginForm.reset();
				navToolbar.setHidden(false);
				me.setNavigationToolbar();
				homeview.animateActiveItem('#idListMainFeed',{type:'slide',direction: 'left'});
			},
			failure:function(res){
				Ext.Msg.alert(null,"Communication Error");
			}
		});
    },
	
	doForgotPassword : function(email){
		var me = this;
		Ext.Ajax.request({
			url:applink+"api/users/forget_password",
			method:"POST",
			jsonData : {
					email : email
			},
			success:function(res){
				var loginData = Ext.decode(res.responseText);
				console.log(loginData);
				if(loginData.errors)
				{
					Ext.Msg.alert("Error",loginData.errors);
					return;
				}
				Ext.Msg.alert("",loginData.message);
			},
			failure:function(res){
				Ext.Msg.alert(null,"Communication Error");
			}
		});
    },
    
    doSpectatorRegistration: function(data,backRef){
		var me = this;
		Ext.Ajax.request({
			url:applink+"api/users",
			method:"POST",
			jsonData : {
					user : data,
			},
			success:function(res){
				console.log(res);
				var resData = Ext.decode(res.responseText);
				if(resData.errors)
				{
					Ext.Msg.alert("Error",resData.errors);
					return;
				}
				
				var userStore = Ext.getStore('Profile');
				userStore.clearData();
				userStore.add(resData.user);
				
				var homeview = Ext.Viewport.down('homeview');
				var spectatorView = homeview.down('#formPanelSpectatorRegistration');
				spectatorView.reset();
				var avatarView = homeview.down('#idAvatarSelection');
				avatarView.setBackForm(backRef.getItemId());
				homeview.animateActiveItem(avatarView,{type:'slide',direction: 'left'});
			},
			failure:function(res){
				Ext.Msg.alert(null,"Communication Error");
			}
		});
    },

    doPlayerRegistration: function(data,backRef,skills){
		var me = this;
		Ext.Ajax.request({
			url:applink+"api/users",
			method:"POST",
			jsonData : {
					user : data,
					skills: skills 
			},
			success:function(res){
				console.log(res);
				var resData = Ext.decode(res.responseText);
				if(resData.errors)
				{
					Ext.Msg.alert("Error",resData.errors);
					return;
				}
				
				var userStore = Ext.getStore('Profile');
				userStore.clearData();
				userStore.add(resData.user);
				
				var homeview = Ext.Viewport.down('homeview');
				var playerView = homeview.down('#formPanelPlayerRegistration');
				playerView.reset();
				var dataview = playerView.down('dataview[name=skills]');
				dataview.select([]);
				var avatarView = homeview.down('#idAvatarSelection');
				avatarView.setBackForm(backRef.getItemId());
				homeview.animateActiveItem(avatarView,{type:'slide',direction: 'left'});
			},
			failure:function(res){
				Ext.Msg.alert(null,"Communication Error");
			}
		});
    },

    doEditProfile: function(data,backRef){
		var me = this;
		var skills = data.skills;
		delete data.skills;
		//alert(data.auth_token)
		Ext.Ajax.request({
			url:applink+"api/users/edit_profile?auth_token="+data.auth_token,
			method:"POST",
			jsonData : {
					user : data,
					skills : skills
			},
			success:function(res){
				console.log(res);
				var resData = Ext.decode(res.responseText);
				if(resData.errors){
					Ext.Msg.alert("Error",resData.errors);
					return;
				}
				
				var userStore = Ext.getStore('Profile');
//				userStore.clearData();
				var record = userStore.getAt(0);
				record.set(resData.user);
				
				var homeview = Ext.Viewport.down('homeview');
				var avatarView = homeview.down('#idAvatarSelection');
				avatarView.setBackForm(backRef.getItemId());
				homeview.animateActiveItem(avatarView,{type:'slide',direction: 'left'});
			},
			failure:function(res){
				Ext.Msg.alert(null,"Communication Error");
			}
		});
    },

    setProfilePageData: function( user_id, isMyProfile){
		var me = this;
		var userStore = Ext.getStore('Profile'),
			record = userStore.getAt(0),
			auth_token = record.get('auth_token'),
			my_id = record.get('user_id');
		isMyProfile = (my_id == user_id);
		Ext.Ajax.request({
			url:applink+"api/users/get_profile?auth_token=" + auth_token,
			method:"POST",
			jsonData : {
					user_id : user_id
			},
			success:function(res){
				var data = Ext.decode(res.responseText);
				if(data.errors){
					Ext.Msg.alert("Error",data.errors);
					return;
				}
				data = data.user;
				var homeview = Ext.Viewport.down('homeview');
				var profileForm = homeview.down('#formUserProfile');
				profileForm.setConfig({
					userRecord: data
				});
				profileForm.down('#name').setHtml(data.name+" "+data.last_name);
				profileForm.down('#company').setHtml(data.company);
				profileForm.down('#md_name').setHtml(data.md_name);
				profileForm.down('#user_type').setSrc("resources/images/" + data.status + ".png");
				profileForm.down('#bio').setHtml(data.bio);
				
				if(!isMyProfile){
					var component = profileForm.down('#charity');
					component.setHidden(false);
					if(Ext.getStore('Profile').getAt(0).data.support)
						component.down('#btnSupportPlayer').setHidden(true);
					else
						component.down('#btnSupportPlayer').setHidden(false);
				}
				else{
					profileForm.down('#charity').setHidden(true);		
				}
				
				var recentActivity = profileForm.down('#recent_activity');
				var store = Ext.getStore('GetUserData');
				store.clearData();
				if(data.recent_activities && data.recent_activities.length > 0)
					store.add(data.recent_activities);
				var skillDataview = profileForm.down('#userSkills'),
					skillStore = skillDataview.getStore();
				if(skillStore){
					skillStore.clearData();
					if(!isMyProfile){
						data.skills.forEach(function(skill){
							if(data.skills_endorse.indexOf(skill.id) >= 0)
								skill.isEndorse = "endorsed";
						});
						console.log(data.skills);
					}
					skillStore.add(data.skills);
				}
				var challenges_Dataview = profileForm.down('#recent_challenges'),
					challenges_store = challenges_Dataview.getStore();
				challenges_store.clearData();
				if(data.status == "player"){
					challenges_store.add(data.player_challenges);
					challenges_Dataview.show();
				}
				else{
					challenges_Dataview.hide();
				}
				profileForm.down('#avatar_url').setSrc(data.avatar_url);
				homeview.animateActiveItem('#formUserProfile',{type:'slide',direction:'left',duration:200});
				
			},
			failure:function(res){
				Ext.Msg.alert(null,"Communication Error");
			}
		});
	},
	
	getVideo :function(backRef){
		var me = this;
		var homeview = Ext.Viewport.down('homeview');
		var videoView = homeview.down('#idFeaturedVideo');
		videoView.setBackForm(backRef.getItemId());
		homeview.animateActiveItem('#idFeaturedVideo',{type:'slide',direction:'left',duration:200});
		return;
		Ext.Ajax.request({
			url:applink+"api/users/get_profile",
			method:"POST",
			jsonData : {
					user_id : user_id
			},
			success:function(res){
				
			},
			failure:function(res){
				Ext.Msg.alert(null,"Communication Error");
			}
		});
	},
	
	sendPoints :function(params){
		var me = this;
		Ext.Ajax.request({
			url: applink + "api/judge_points?auth_token=" + params.auth_token,
			method:"POST",
			jsonData : {
				 judge_point : {
					user_id : params.user_id,
					challenge_id : params.challenge_id,
					player_challenge_id : params.player_challenge_id,
					points: params.points
				}
			},
			success:function(res){
				console.log(res);
				var data = Ext.decode(res.responseText);
				if(data.errors){
					Ext.Msg.alert("Error",data.errors);
					return;
				}
				Ext.Msg.alert("",data.message);
			},
			failure:function(res){
				Ext.Msg.alert(null,"Communication Error");
			}
		});
	},
	
	sendReason :function(token,action,uid,msg){
		var me = this;
		Ext.Ajax.request({
			url:applink+"api/users/accept_or_reject_player?auth_token="+token,
			method:"POST",
			jsonData : {
				accept_reject : action,//= “accept” if md accept as a player else “reject” 
				user_id  : uid,
				message : msg
			},
			success:function(res){
				console.log(res);
				var data = Ext.decode(res.responseText);
				if(data.errors){
					Ext.Msg.alert("Error",data.errors);
					return;
				}
				Ext.Msg.alert(null,data.message);
				var userStore = Ext.getStore('PlayerRequest');
				var userRec = userStore.findRecord('user_id',uid);
				if(userRec)
					userRec.destroy();
//				userStore.clearData();
				
				var homeview = Ext.Viewport.down('homeview');
				if(userStore.getCount()>0){
					var userStore = Ext.getStore('Profile');
					me.getPlayerReq(userStore.getAt(0).data.auth_token);
				}
				else{
					homeview.down('#mainNavigationTopbar').setHidden(false);
					homeview.animateActiveItem('#idListMainFeed',{type:'slide',direction: 'left'});
				}
			},
			failure:function(res){
				Ext.Msg.alert(null,"Communication Error");
			}
		});
	},
	
/* 	setScroeBoard: function( token){
		var me = this;

		Ext.Ajax.request({
			url:applink+"api/users/scoreboard?auth_token="+token,
			method:"GET",
			success:function(res){
				var data = Ext.decode(res.responseText);
				if(data.errors){
					Ext.Msg.alert("Error",data.errors);
					return;
				}
				data = data.users;
				var userStore = Ext.getStore('ScoreBoard');
				userStore.clearData();
				userStore.add(data);
				var homeview = Ext.Viewport.down('homeview');
				homeview.animateActiveItem('#idScorecard',{type:'slide',direction:'left',duration:200});				
			},
			failure:function(res){
				Ext.Msg.alert(null,"Communication Error");
			}
		});
	},
 */
});
