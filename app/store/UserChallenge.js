Ext.define('HungerApp.store.UserChallenge', {
    extend: 'Ext.data.Store',
    
    config: {
        model: 'HungerApp.model.UserChallenge',
        // autoLoad:true,
        // autoSync:true,
        proxy:{
   			type:'ajax',
			url : applink+'api/challenges',
			actionMethods: {
				create : false,
				read   : 'GET',
				update : false,
				destroy: false
			},
			reader:{
				rootProperty:'challenges',
			},
		},
		sorters: [
			{
				property : "created_at",
				direction: "DESC"
			}
		]
    }
});
