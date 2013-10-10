Ext.define('HungerApp.model.MDList', {
    extend: 'Ext.data.Model',
    
    config: {
		identifier: 'uuid',
        fields: [
            {name: 'fullname', type: 'string'},
  			{name: 'mdid', type: 'string'}
        ],
    }
});
