Ext.define('HungerApp.store.SearchUser', {
    extend: 'Ext.data.Store',
    
    config: {
        model: 'HungerApp.model.Profile',
        //autoLoad:true,
        //autoSync:true,
        proxy:{
   			type:'ajax',
			url : applink+'api/users/search',
			actionMethods: {
				create : 'POST',
				read   : false,
				update : false,
				destroy: false
			},
			reader:{
				rootProperty:'users',
			},
		},
	}
});
