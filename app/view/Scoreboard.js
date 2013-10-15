Ext.define('HungerApp.view.Scoreboard', {
	extend: 'Ext.dataview.DataView',
	xtype: 'scoreboard',
	config: {
		cls : 'scoreboardListCls',
		itemCls : 'scoreboardListItem',
		itemTpl: '<div class="scorecard-user">'+
					'<div class="thumb" style="background-image:url({avatar_url});"></div>'+
					'<div class="badge" style="background-image:url(resources/images/{status}.png);"></div>'+
					'<div class="detail">{username}</div>'+
					//'<div>{type}</div>'+
					//'<div>Games: {gamesNum}</div>'+
					'<div class="points">'+
						'<div>{points}</div>'+
						'<div>POINTS</div>'+
					'</div>'+
				'</div>'+
				'<div class="scorecard-detail">'+
					'<div class="likes">{like_and_dislike_point}</div>'+
					'<div class="social">{login_point}</div>'+
					'<div class="support">{support_point}</div>'+
					'<div class="challenges">{challenges_point}</div>'+
					//'<div class="challenge">{challenges_point}</div>'+
					'<div class="comments">{minichallenge_point}</div>'+
				'</div>',
		emptyText: 'No items',
		store : 'ScoreBoard'
	}
});