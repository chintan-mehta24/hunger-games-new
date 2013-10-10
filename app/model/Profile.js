Ext.define('HungerApp.model.Profile', {
    extend: 'Ext.data.Model',
    
    config: {
		identifier: 'uuid',
        fields: [
            {name: 'name', type: 'string'},
            {name: 'email', type: 'string'},
            {name: 'sex', type: 'string'},
            {name: 'title', type: 'stirng'},
            {name: 'company', type: 'string'},
            {name: 'bio', type: 'string'},
            {name: 'last_name', type: 'string'},
			{name: 'company_title', type: 'string'},
            {name: 'avatar_url', type: 'string'},
			{name: 'status', type: 'string'},
            {name: 'skills', type: 'auto'},
            {name: 'auth_token', type: 'string'},
            {name: 'user_id', type: 'string'},
			{name: 'md_id', type: 'string'},
			{name: 'country', type: 'string'}
			
        ],
/*		autoLoad:true,
        autoSync:true,
        proxy:{
        	type: 'localstorage',
        	id: 'idStoreProfile'
        }
*/
    }
});
