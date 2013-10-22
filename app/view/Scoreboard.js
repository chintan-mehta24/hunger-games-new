Ext.define('HungerApp.view.Scoreboard', {
	extend: 'Ext.dataview.DataView',
	xtype: 'scoreboard',
	config: {
		cls : 'scoreboardListCls',
		itemCls : 'scoreboardListItem',
		itemTpl: new Ext.XTemplate('<div class="scorecard-user">'+
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
					'<div class="social">{login_point:this.add(values)}</div>'+
					'<div class="support">{support_point}</div>'+
					'<div class="challenges">{challenges_point}</div>'+
					//'<div class="challenge">{minichallenge_point}</div>'+
					'<div class="comments">{feed_comment_point}</div>'+
				'</div>',{
					add:function(v1,v2){
						return v1 + v2.minichallenge_point + v2.social_media_point;
					}
				}),
		emptyText: 'No items',
		store : 'ScoreBoard'
	}
});