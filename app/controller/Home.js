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
			if(userStore.getCount()>0)
			{
				if(userStore.getAt(0).data.status=="md")
				{
					me.getPlayerReq(userStore.getAt(0).data.auth_token);
					return;
				}
				var homeview = Ext.Viewport.down('homeview');
				homeview.down('#mainNavigationTopbar').setHidden(false);
				homeview.setActiveItem('#idListMainFeed');
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
				if(userStore.getAt(0).data.status=="md")
				{
					me.getPlayerReq(userStore.getAt(0).data.auth_token);
					return;
				}
				//console.log(userStore);
				var homeview = Ext.Viewport.down('homeview');
				homeview.down('#mainNavigationTopbar').setHidden(false);
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
		//alert(data.auth_token)
		Ext.Ajax.request({
			url:applink+"api/users/edit_profile?auth_token="+data.auth_token,
			method:"POST",
			jsonData : {
					user : data
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

		Ext.Ajax.request({
			url:applink+"api/users/get_profile",
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
				profileForm.down('#status').setHtml(data.status);
				profileForm.down('#bio').setHtml(data.bio);
				
				if(isMyProfile){
					var component = profileForm.down('#charity');
					component.setHidden(false);
					if(data.support)
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
				store.add(data.recent_activities);
				
				var skillDataview = profileForm.down('#userSkills'),
					skillStore = skillDataview.getStore();
				if(skillStore){
					skillStore.clearData();
					skillStore.add(data.skills);
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
	
	sendPoints :function(backRef){
		var me = this;
		var homeview = Ext.Viewport.down('homeview');
		//var videoView = homeview.down('#idFeaturedVideo');
		//videoView.setBackForm(backRef.getItemId());
		//homeview.animateActiveItem('#idFeaturedVideo',{type:'slide',direction:'left',duration:200});
		return;
		Ext.Ajax.request({
			url:applink+"api/",
			method:"POST",
			jsonData : {
					user_id : user_id
			},
			success:function(res){
				console.log(res);
				var data = Ext.decode(res.responseText);
				if(data.errors){
					Ext.Msg.alert("Error",data.errors);
					return;
				}
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
