Ext.define('HungerApp.store.PlayerList', {
    extend: 'Ext.data.Store',
    
    config: {
		fields:[
			'id',
			'fullname'
		],
        proxy:{
   			type:'ajax',
			url : applink+'api/users/player_user_list',
			actionMethods: {
				create : false,
				read   : 'GET',
				update : false,
				destroy: false
			},
			reader:{
				rootProperty:'player_users',
			},
		},
	}
});
