Ext.define('HungerApp.model.GetUserData', {
    extend: 'Ext.data.Model',
    
    config: {
		identifier: 'uuid',
        fields: [
			{name: 'message', type: 'string'},
            {name: 'rc_type', type: 'string'},
            {name: 'created_at', type: 'string'},
            {name: 'avatar_url', type: 'stirng'},
            {name: 'user_first_name', type: 'string'},
            {name: 'endorsement_name', type: 'auto'},
            {name: 'endorsement_image', type: 'auto'}

/*            {name: 'name', type: 'string'},
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
			{name: 'recent_activities', type: 'auto'}
			*/
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
