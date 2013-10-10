Ext.define('HungerApp.model.MiniChallenge',{
    extend: 'Ext.data.Model',
    
    config: {
		identifier: 'uuid',
        fields: [
				"id",
				"title",
				"question",
				"user_id",
				"challenge_options"
        ]
    }
});
