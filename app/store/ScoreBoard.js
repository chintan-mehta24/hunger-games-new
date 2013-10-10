Ext.define('HungerApp.store.ScoreBoard', {
    extend: 'Ext.data.Store',
    
    config: {
        model: 'HungerApp.model.ScoreBoard',
        proxy:{
   			type:'ajax',
			url : applink + 'api/users/scoreboard',
			extraParams:{
				'auth_token' : ''
			},
			reader:{
				rootProperty:'users'
			}
		},
		sorters: [
			{
				property : "points",
				direction: "DESC"
			},
			{
				property : "username",
				direction: "ASC"
			}
		]
	}
});
