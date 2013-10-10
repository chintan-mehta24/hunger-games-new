Ext.define('HungerApp.store.MainActvityFeed', {
    extend: 'Ext.data.Store',
    config: {
        model: 'HungerApp.model.MainActvityFeed',
        proxy:{
   			type:'ajax',
			autoLoad: true,
			url : applink + 'api/activity_feeds',
			extraParams:{
				'auth_token' : ''
			},
			actionMethods: {
				create : false,
				read   : 'GET',
				update : false,
				destroy: false
			},
			reader:{
				rootProperty:'activity_feeds'
			}
		},
		sorters: [
			{
				property : "created_at",
				direction: "DESC"
			}
		]
    }
});
