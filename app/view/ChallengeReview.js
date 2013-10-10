Ext.define('HungerApp.view.ChallengeReview', {
	extend: 'Ext.dataview.DataView',
	xtype: 'ChallengeReview',
	config: {
		cls : 'scoreboardListCls',
		itemCls : 'scoreboardListItem',
		itemTpl: 	'<div class="thumb" style="background-image:url({avatar_url});"></div>'+
					'<div class="detail">'+
						'<div>{name} {last_name}</div>'+
						'<div>{email}</div>'+
						'<div class="actionBtn">'+
							'<div class="acceptCls">View</div>'+
							'<div class="denyCls">Rate</div>'+
						'</div>'+
					'</div>',
		emptyText: 'No items Review',
		store : 'ReviewList',								
		listeners:[{
			event: 'itemtap',
			fn: 'onItemTapAction'
		}]
	},
	onItemTapAction: function(ths,index,target,record,e){
		if(e.getTarget('.acceptCls')){
			alert("View clicked");
			
			//var homeview = Ext.Viewport.down('homeview');
			//homeview.animateActiveItem('#formUserProfile',{type:'slide',direction: 'right'});
		}
		if(e.getTarget('.denyCls')){
			//alert("Rate clicked");
			this.ratePrompt();
			//var homeview = Ext.Viewport.down('homeview');
			//homeview.animateActiveItem('#formUserProfile',{type:'slide',direction: 'right'});
		}
	},
	
	ratePrompt: function(){
		Ext.Msg.prompt("Rate","Enter your points",function(btn,data){
			if(btn == "ok"){
				if(Ext.isEmpty(data)){
					Ext.Msg.alert(null,'Points cannot be blank.',function(){
						this.ratePrompt();
					},this);
					return;
				}
				var homeController = HungerApp.app.getController('Home');
				homeController.sendPoints();
			}
		},this,false,false,{
			xtype: 'numberfield',
			placeHolder: 'Enter points'
		});
	},
	
});