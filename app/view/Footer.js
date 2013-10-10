Ext.define('HungerApp.view.Footer', {
	extend:'Ext.Toolbar',
	xtype: 'footer',
	config:{
		ui: 'plain',
		cls: 'footerBarCls',
		title: false,
		layout:{
			type:'hbox',
			pack:'justify'
		},
		defaults:{
			xtype:'button',
			ui: 'plain'
		},
		items:[{
			itemId: 'btnFacebookShare',
			icon: 'resources/images/facebook.png'
		},{xtype:'spacer'},{
			itemId: 'btnTwitterShare',
			icon: 'resources/images/twitter.png'
		},{xtype:'spacer'},{
			itemId: 'btnLinkedShare',
			icon: 'resources/images/linked.png'
		}],
		listeners:[{
			delegate: '#btnFacebookShare',
			event: 'tap',
			fn: 'shareOnFacebook'
		},{
			delegate: '#btnTwitterShare',
			event: 'tap',
			fn: 'shareOnTwitter'
		},{
			delegate: '#btnLinkedShare',
			event: 'tap',
			fn: 'shareOnLined'
		}]
	},
	shareOnFacebook: function(){
		var URL = 	"https://www.facebook.com/dialog/feed?"+
					"app_id=" + "734460156570085" +
					"&display=popup" +
					"&caption=" + "Hunger%20Games" +
					"&link=" + encodeURIComponent("http://solerahungergames.com") +
					"&picture=" + encodeURIComponent("http://tinyurl.com/ms4ykpk") +
					"&redirect_uri=" + encodeURIComponent("http://solerahungergames.com") +
					"&description=" + encodeURIComponent("Hunger Solera Games Challenge");
		window.open(URL, "_blank");
	},
	shareOnTwitter: function(){
		var URL = "https://twitter.com/intent/tweet?"+
					"text=" + "Hunger%20Games" + 
					"&url=" + "http%3A%2F%2Fsolerahungergames.com";
		window.open(URL, "_blank");
	},
	shareOnLined: function(){
		var URL = "http://www.linkedin.com/shareArticle?"+
					"summary=Solera%20Hunger%20Games"+
					"&url="+encodeURIComponent("http://solerahungergames.com") +
					"&title=Hunger Games";//&mini=true";
		window.open(URL, "_blank");
	}
});
