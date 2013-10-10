Ext.define('HungerApp.view.Main', {
    extend: 'Ext.Panel',
    xtype: 'main',
    requires: [
		'Ext.TitleBar',
		'Ext.Img',
		'HungerApp.view.Home',
		'HungerApp.view.Footer'
    ],
    config: {
		layout: 'card',
		items:[{
			xtype: 'titlebar',
			docked: 'top',
			ui: 'plain',
			items:[{
				xtype: 'img',
				aling: 'left',
				height: '2em',
				width: '6em',
				src: 'resources/images/logo.png'
			}]
		},{
			xtype: 'img',
			height: '3em',
			src: 'resources/images/SLH Y LOGO.png',
			docked: 'top'
		},{
			xtype:'homeview'
		}]
    }
});
