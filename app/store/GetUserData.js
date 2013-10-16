Ext.define('HungerApp.store.GetUserData', {
    extend: 'Ext.data.Store',
    
    config: {
        model: 'HungerApp.model.GetUserData',
		// sorters: [{
			// property:'created_at',
			// direction: 'DESC'
		// }]
	}
});
