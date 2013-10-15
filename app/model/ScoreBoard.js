Ext.define('HungerApp.model.ScoreBoard', {
    extend: 'Ext.data.Model',
    
    config: {
		identifier: 'uuid',
        fields: [
            {name: 'status', type: 'string'},
            {name: 'avatar_url', type: 'string'},
            {name: 'points', type: 'number'},
            {name: 'user_id', type: 'stirng'},
            {name: 'username', type: 'string'},
            {name: 'like_and_dislike_point', type: 'number'},
            {name: 'login_point', type: 'number'},
            {name: 'support_point', type: 'number'},
            {name: 'challenges_point', type: 'number'},
            {name: 'minichallenge_point', type: 'number'}
        ],
    }
});
