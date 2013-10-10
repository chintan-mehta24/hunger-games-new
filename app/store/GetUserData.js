Ext.define('HungerApp.store.GetUserData', {
    extend: 'Ext.data.Store',
    
    config: {
        model: 'HungerApp.model.GetUserData',
        //autoLoad:true,
        //autoSync:true,
       /* proxy:{
   			type:'ajax',
			url : applink+'api/users/get_profile',
			actionMethods: {
				create : 'POST',
				read   : false,
				update : false,
				destroy: false
			},
			reader:{
				rootProperty:'users',
			},
		},*/
	}
});
