Ext.define('HungerApp.store.MiniChallenge', {
    extend: 'Ext.data.Store',
    
    config: {
        model: 'HungerApp.model.MiniChallenge',
        proxy:{
   			type:'ajax',
			url : applink+'api/mini_challenges',
			reader:{
				rootProperty:'mini_challenges',
			}
		}
    }
});
