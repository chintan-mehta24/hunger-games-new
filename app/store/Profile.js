Ext.define('HungerApp.store.Profile', {
    extend: 'Ext.data.Store',
    
    config: {
        model: 'HungerApp.model.Profile',
        autoLoad:true,
        autoSync:true,
        proxy:{
        		type: 'localstorage',
        		id: 'idStoreProfile'
        }
    }
});
