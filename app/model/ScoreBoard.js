Ext.define('HungerApp.model.ScoreBoard', {
    extend: 'Ext.data.Model',
    
    config: {
		identifier: 'uuid',
        fields: [
            {name: 'status', type: 'string'},
            {name: 'avatar_url', type: 'string'},
            {name: 'points', type: 'string'},
            {name: 'user_id', type: 'stirng'},
            {name: 'username', type: 'string'}
        ],
    }
});
