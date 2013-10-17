Ext.define('HungerApp.view.AvatarSelector', {
	extend: 'Ext.Panel',
	xtype: 'avatarSelector',
	config: {
		backForm: null,
		layout: 'vbox',
		padding: '1em',
		items : [
			{
				docked: 'top',
				xtype: 'titlebar',
				title: 'Upload Avatar',
				ui: 'plain',
				items:[{
					xtype: 'button',
					ui: 'back',
					text: 'Back',
					hidden : true,
					itemId: 'btnAvatarBack'
				}]
			},
			{
//				xtype : 'button',
				xtype : 'fileupload',
				ui: 'main-ui-button',
				autoLoad: true,
				height: '2em',
//				itemId: 'btnAvatarSelectMedia',
				itemId: 'btnAvatarSelectMediaFileTag',
				text  : 'Select avatar',
//				url : "http://hunger-game.herokuapp.com/api/users/edit_profile?auth_token=b66ffe6bd269f01ba80ccce67dc13ad034039048"
			},{
				xtype: 'image',
				itemId: 'imagePreview',
				cls : 'imagePreviewPanelCls',
				flex  : 1
				
			},
/* 			{
				xtype:'draw',
				engine: 'Ext.draw.engine.Canvas',
				//  xtype : 'image', 
				itemId: 'imagePreview',
				cls : 'imagePreviewPanelCls',
				flex  : 1
			}, */
			{
				xtype : 'button',
				text  : 'Save & Finish',
				itemId: 'btnUploadAvatar',
				cls   : 'submitBtnCls'
			}
		],
		listeners : [{
			delegate: '#btnAvatarBack',
			event: 'tap',
			fn: 'backToRegistration'
		},{
			delegate: '#btnAvatarSelectMedia',
			event: 'tap',
			fn: 'selectPictureFromGalley'
		},{
			delegate: '#btnUploadAvatar',
			event: 'tap',
			fn: 'doUploadAvatar'
		},{
			delegate: '#btnAvatarSelectMediaFileTag',
			event: 'loadsuccess',
			fn: 'onPictureSelect'
		},{
			delegate: '#btnAvatarSelectMediaFileTag',
			event: 'loadfailure',
			fn: function(a,b){
				console.log(a,b)
			}
		},{
			delegate: '#btnAvatarSelectMediaFileTag',
			event: 'success',
			fn: 'onAvatarUploadSuccess'
		},{
			delegate: '#btnAvatarSelectMediaFileTag',
			event: 'failure',
			fn: 'onAvatarUploadFailure'
		}]
	},
	initialize: function(){
/* 		var me = this,
			drawComponent = me.down('#imagePreview');
		drawComponent.on('dragstart',me.doDragStart,me,{element:'element'});
		drawComponent.on('drag',me.doDrag,me,{element:'element'});
		drawComponent.on('dragend',me.doDragEnd,me,{element:'element'}); */
	},
	backToRegistration: function(){
		var backform = this.getConfig('backForm'),
			homeview = Ext.Viewport.down('homeview');
		if(backform)
			homeview.animateActiveItem('#' + backform, {type:'slide',direction: 'right'});
		else
			homeview.animateActiveItem('#panelHomeLogin',{type:'slide',direction: 'right'});
		this.setConfig('backForm',null);
	},
	selectPictureFromGalley: function(){
		var me = this;
		Ext.Msg.show({
			title:"Avatar",
			message:'Select your avatar from',
			buttons:[
				{text:"Camera"},
				{text:"Gallery"}
			],
			scope: me,
			fn:function(btn){
				Ext.device.Camera.capture({
					success: this.onPictureSelect,
					quality: 75,
					scope: this,
					source: (btn == "Camera") ? 1 : 0,
					destination: 'file'
				});
			}
		});
	},
	onPictureSelect: function(image){
		console.log(image)
		var me = this,
			component = me.down('#imagePreview');
		component.setSrc(image);
/* 		var me = this,
			drawComponent = me.down('#imagePreview'),
			surface = drawComponent.getSurface('main');
		surface.removeAll();
		surface.clear();
		var img = new Image();
		img.onload = function(){
			var width = this.width,
				height = this.height;
			var cmpheight = drawComponent.element.getHeight(),
				cmpwidth = drawComponent.element.getWidth();
			var imageRatio = width / height,
				cmpRatio = cmpwidth / cmpheight;
			var w, h, x, y;
			if(imageRatio > cmpRatio){
				h = cmpheight;
				w = cmpheight * imageRatio;
				y = 0;
				x = (cmpwidth - w) /2;				
			}
			else{
				w = cmpwidth;
				h = cmpwidth / imageRatio;
				x = 0;
				y = (cmpheight - h) /2;
			}
			console.log(x,y)
 			surface.add({
				type: 'image',
				src : this.src,
				width : w,
				height : h,
				lockY: !y,
				lockX: !x,
				x: x ,
				y: y
			}); 
			surface.renderFrame();
		};
		img.src = image; */
	},
/* 	doDragStart:function(e,ths){
		console.log('yes')
		var me = this,
			drawComponent = me.down('#imagePreview'),
			surface = drawComponent.getSurface('main'),
			itmes = surface.getItems();
		if(itmes.length){
			var p0 = drawComponent.element.getXY(),
				point = [e.pageX - p0[0], e.pageY - p0[1]];
			console.log(point)
			ths.lastEventX = point[0];
			ths.lastEventY = point[1];
			ths.canDragSprite = true;
		}
	},
	doDrag: function(e,ths){
		if(ths.canDragSprite){
			var me = this,
				drawComponent = me.down('#imagePreview'),
				surface = drawComponent.getSurface('main'),
				sprite = surface.getItems().getAt(0);
			var	p0 = drawComponent.element.getXY(),
				point = [e.pageX - p0[0], e.pageY - p0[1]],
				dx = point[0] - ths.lastEventX;
				dy = point[1] - ths.lastEventY;
			if(sprite.config['lockX']){
				sprite.setAttributes({
					//translationX: dx,
					translationY: dy
				});
			}
			if(sprite.config['lockY']){
				sprite.setAttributes({
					translationX: dx,
					//translationY: dy
				});
			}
			surface.renderFrame();
		}
	},
	doDragEnd: function(e,ths){
		if(ths.canDragSprite){
			var me = this,
				drawComponent = me.down('#imagePreview'),
				surface = drawComponent.getSurface('main'),
				sprite = surface.getItems().getAt(0),
				attr = sprite.attr;
				console.log(attr.x, attr.y, attr.translationX, attr.translationY)
				sprite.setAttributes({
					x: attr.x + attr.translationX,
					y: attr.y + attr.translationY,
					translationX: 0,
					translationY: 0
				});
				if(sprite.config['lockX']){
					var y = sprite.attr.y;
					if( y > 0 )
						sprite.setAttributes({y:0});
					else {
						var cmpHeight = drawComponent.element.getHeight();
						var imgHeight = sprite.attr.height;
						var diff = cmpHeight - imgHeight;
						if(y < diff)
							sprite.setAttributes({y:diff});
					}
				}
				if(sprite.config['lockY']){
					var x = sprite.attr.x;
					if( x > 0 )
						sprite.setAttributes({x:0});
					else {
						var cmpWidth = drawComponent.element.getWidth();
						var imgWidth = sprite.attr.width;
						var diff = cmpWidth - imgWidth;
						if(x < diff)
							sprite.setAttributes({x:diff});
					}
				}
				surface.renderFrame();			
		}
		ths.canDragSprite = false;
	}, */
	doUploadAvatar:function(){
		var userProfile = Ext.getStore('Profile'),
			record = userProfile.getAt(0),
			auth_token = record.get('auth_token');
	
		var URL = applink + "api/users/edit_profile?auth_token=" + auth_token;//"b66ffe6bd269f01ba80ccce67dc13ad034039048"
		var fileUP = this.down('#btnAvatarSelectMediaFileTag');
		fileUP.setConfig({
			url: URL
		});
		var length = fileUP.fileElement.dom.files.length;
		if(length == 0){
			Ext.Msg.alert('Avatar','Select Avatar First');
			return;
		}
		fileUP.fileElement.dom.files.name = "user[avatar]"
		fileUP.doUpload(fileUP.fileElement.dom.files[0]);
		Ext.Viewport.setMasked({xtype:'loadmask'});
	},
	onAvatarUploadSuccess:function(response){
		var store = Ext.getStore('Profile');
//		store.clearData();
		var record = store.getAt(0);
		record.set('avatar_url',response.user.avatar_url);//add(response.user);
		Ext.Viewport.setMasked(false);
		this.getParent().animateActiveItem('#idListMainFeed',{type:'slide',direction:'left',duration:200});
		var homeview = Ext.Viewport.down('homeview');
		homeview.down('#mainNavigationTopbar').setHidden(false);
		var me = this,
			component = me.down('#imagePreview');
		component.setSrc(null);
	},
	onAvatarUploadFailure:function(a,b,c){
		Ext.Viewport.setMasked(false);
		console.log("NO",a);
	}
});
