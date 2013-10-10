Ext.define('HungerApp.model.UserChallenge', {
    extend: 'Ext.data.Model',
    
    config: {
		identifier: 'uuid',
        fields: [
            {name: 'title', type: 'string'},
            {name: 'description', type: 'string'},
            {name: 'is_published', type: 'auto'},
			{name: 'video_challenge',type: 'auto'},
			{name: 'create_at',type: 'auto'},
			{name: 'posted',type: 'auto'},
			{name: 'challenge_id', type: 'string'}
        ]
    }
});
