Ext.define('HungerApp.store.Skills', {
    extend: 'Ext.data.Store',
    config: {
        fields: [
            {name: 'name', type: 'string'},
            {name: 'id', type: 'auto'}
        ],
		autoLoad:true,
        proxy:{
   			type: 'ajax',
			url : applink+'api/skills',
/* 			actionMethods: {
				create : 'POST',
				read   : false,
				update : false,
				destroy: false
			}, */
			reader:{
				rootProperty:'skills',
			}
		},
    }
});
