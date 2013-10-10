Ext.define('HungerApp.store.MDList', {
    extend: 'Ext.data.Store',
    
    config: {
        model: 'HungerApp.model.MDList',
		autoLoad:true,
        autoSync:false,
        proxy:{
   			type:'ajax',
			url : applink+'api/users/md_user_type_list',
			actionMethods: {
				create : false,
				read   : 'GET',
				update : false,
				destroy: false
			},
			reader:{
				rootProperty:'md_users',
			},
		},
	}
});
