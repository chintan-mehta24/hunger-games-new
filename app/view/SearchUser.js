Ext.define('HungerApp.view.SearchUser', {
	extend: 'Ext.dataview.DataView',
	xtype: 'SearchUser',
	config:{
		cls: 'clsMainFeedActivity',
		padding: '1em',
		style : 'color : white;',
		itemTpl: [	'<div class="thumb avatar" style="background-image:url({avatar_url});"></div>',
					'<div class="endorsPlayer">',
						'<div>',
							'<div class="title">{name} {last_name}</div>',
							'<div class="message">{title}</div>',
						'</div>',
					'</div>',
				].join(""),
		store: 'SearchUser',
		emptyText: 'No items',
		/*{
			data: [
				{ title: 'Player Name 1', date:'9/12/13', message: 'This user endorses John Doe for Great Marketing Skills',thumb : 'resources/images/user.png',poster:"resources/images/nature.png",comments:"3 Comments"},
				{ title: 'Player Name 2', date:'9/12/13', message: 'This user endorses John Doe for Great Marketing Skills',thumb : 'resources/images/user.png',poster:"resources/images/nature.png",comments:"3 Comments"},
				{ title: 'Player Name 3', date:'9/12/13', message: 'This user endorses John Doe for Great Marketing Skills',thumb : 'resources/images/user.png',poster:"resources/images/nature.png",comments:"3 Comments"},
				{ title: 'Player Name 4', date:'9/12/13', message: 'This user endorses John Doe for Great Marketing Skills',thumb : 'resources/images/user.png',poster:"resources/images/nature.png",comments:"3 Comments"}
			],
			fields:["title","date","message","thumb","poster","comments"]
		},*/
		items:[{
			xtype: 'toolbar',
			docked: 'top',
			cls: 'clsTopbar',
			ui: 'plain',
			items:[{
				xtype: 'textfield',
				flex: 1,
				placeHolder : 'Search User',
				itemId : 'idSearchUserField',
				clearIcon: false,
				listeners:{
					'keyup' : function( ths, e, eOpts ){
						console.log(ths._value,  e.browserEvent.keyCode);
						if(e.browserEvent.keyCode==13)
						{
							var searchStore = Ext.getStore('SearchUser');
							searchStore.clearData();
							var proxyObj = searchStore.getProxy();
							proxyObj.setExtraParam( 'name', ths._value );
							searchStore.load();
							Ext.Viewport.setMasked(false);
						}
					}
				}
			}]
		}],
		listeners:[{
			event: 'itemtap',
			fn: 'onItemTapAction'
		}]
	},
	onItemTapAction: function(ths,index,target,record,e){
		console.log(ths,index,target,record,e);
		var homeController=HungerApp.app.getController('Home');
		homeController.setProfilePageData(record.data.user_id,false);
		//if(e.getTarget('.avatar')){
			//var homeview = Ext.Viewport.down('homeview');
			//homeview.animateActiveItem('#formUserProfile',{type:'slide',direction: 'right'});
		//}
	}
});