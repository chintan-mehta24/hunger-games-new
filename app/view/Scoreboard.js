Ext.define('HungerApp.view.Scoreboard', {
	extend: 'Ext.dataview.DataView',
	xtype: 'scoreboard',
	config: {
		cls : 'scoreboardListCls',
		itemCls : 'scoreboardListItem',
		itemTpl: 	'<div class="thumb" style="background-image:url({avatar_url});"></div>'+
					'<div class="badge" style="background-image:url(resources/images/{status}.png);"></div>'+
					'<div class="detail">{username}</div>'+
					//'<div>{type}</div>'+
					//'<div>Games: {gamesNum}</div>'+
					'<div class="points">'+
						'<div>{points}</div>'+
						'<div>POINTS</div>'+
					'</div>',
		emptyText: 'No items',
		store : 'ScoreBoard'
	}
});