Ext.define('HungerApp.model.UserChallenge', {
    extend: 'Ext.data.Model',
    
    config: {
		identifier: 'uuid',
        fields: [
            {name: 'title', type: 'string'},
            {name: 'description', type: 'string'},
            {name: 'is_published', type: 'auto'},
			{name: 'challenge_id', type: 'string'}
        ],
/*		autoLoad:true,
        autoSync:true,
        proxy:{
   			type:'ajax',
			url : applink+'api/challenges',
        }*/
    }
});
