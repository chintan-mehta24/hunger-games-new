Ext.define("HungerApp.view.ImageViewer",{
	extend:"Ext.Container",
	config:{
		doubleTapScale:1,
		maxScale:4,
		loadingMask:true,
		previewSrc:false,
		resizeOnLoad:true,
		imageSrc:false,
		initOnActivate:false,
		cls:"imageBox",
		scrollable:"both",
		style: 'background:black',
		zIndex: 8,
		html:"<figure><img></figure>"
	},
	xtype:"imageviewer",
	initialize:function(){
		if(this.initOnActivate){
			this.addListener("activate",
							this.initViewer,
							this,
							{	delay:10,single:true}
			);
		}
		else{
			this.addListener("painted",
							this.initViewer,
							this,
							{delay:10,single:true}
			);
			
		}
	},
	initViewer:function(){
		var a=this.getScrollable().getScroller();
		a.setDisabled(true);
		if(this.getLoadingMask()){
			this.setMasked({
					xtype:"loadmask",
			});
		}
		this.figEl=this.element.down("figure");
		this.imgEl=this.figEl.down("img");
		this.figEl.setStyle({
				overflow:"hidden",
				display:"block",
				margin:0,
				});
		this.imgEl.setStyle({
					"-webkit-user-drag":"none",
					"-webkit-transform-origin":"0 0",
					visibility:"hidden"
		});
		if(this.getPreviewSrc()){
			this.element.setStyle({
				backgroundImage:"url("+this.getPreviewSrc()+")",
				backgroundPosition:"center center",
				backgroundRepeat:"no-repeat",
				webkitBackgroundSize:"contain"});
		}
		this.on("load",this.onImageLoad,this);
		this.imgEl.addListener({
				scope:this,
				doubletap:this.onDoubleTap,
				tap:this.onTap,
				pinchstart:this.onImagePinchStart,
				pinch:this.onImagePinch,
				pinchend:this.onImagePinchEnd
		});
		if(this.getImageSrc()){
			this.loadImage(this.getImageSrc())
		}
		this.addListener('resize',this.resize,this);
	},
	
	loadImage:function(a){
		if(this.imgEl){
			this.imgEl.dom.src=a;
			this.imgEl.dom.onload=Ext.Function.bind(this.onLoad,this,this.imgEl,0)
		}
	},
	onTap:function(b,a){
	},
	onLoad:function(a,b){
		this.fireEvent("load",this,a,b)
	},
	onImageLoad:function(a){
		this.viewportWidth = this.viewportWidth || this.getWidth() || this.element.dom.clientWidth;
		this.viewportHeight = this.viewportHeight || this.getHeight() || this.element.dom.clientHeight;
		this.imgWidth=this.imgEl.dom.clientWidth;
		this.imgHeight=this.imgEl.dom.clientHeight;
		if(this.getResizeOnLoad()){
			this.scale=this.baseScale=Math.min(this.viewportWidth/this.imgWidth,this.viewportHeight/this.imgHeight);
			this.setMaxScale(this.scale*4)
		}
		else{
			this.scale=this.baseScale=1
		}

		this.translateX=this.translateBaseX=(this.viewportWidth-this.baseScale*this.imgWidth)/2;
		this.translateY=this.translateBaseY=(this.viewportHeight-this.baseScale*this.imgHeight)/2;
		this.applyTransform();
		this.adjustScroller();
		this.imgEl.setStyle({
			visibility:"visible"
		});
		if(this.getPreviewSrc()){
			this.element.setStyle({
				backgroundImage:"none"
			})
		}
		if(this.getLoadingMask()){
			this.setMasked(false)
		}
		this.fireEvent("imageLoaded",this)
	},
	onImagePinchStart:function(b){
		var a=this.getScrollable().getScroller();
		a.stopAnimation();
		a.setDisabled(true);
		this.startScale=this.scale;
		this.originViewportX=(b.touches[0].pageX+b.touches[1].pageX)/2-this.element.getX();
		this.originViewportY=(b.touches[0].pageY+b.touches[1].pageY)/2-this.element.getY();
		this.originScaledImgX=this.originViewportX+a.position.x-this.translateX;
		this.originScaledImgY=this.originViewportY+a.position.y-this.translateY;
		this.originFullImgX=this.originScaledImgX/this.scale;
		this.originFullImgY=this.originScaledImgY/this.scale;
		this.translateX+=(-1*((this.imgWidth*(1-this.scale))*(this.originFullImgX/this.imgWidth)));
		this.translateY+=(-1*((this.imgHeight*(1-this.scale))*(this.originFullImgY/this.imgHeight)));
		this.setOrigin(this.originFullImgX,this.originFullImgY);
		this.applyTransform()
	},
	onImagePinch:function(a){
		this.scale=Ext.Number.constrain(a.scale*this.startScale,this.baseScale-2,this.getMaxScale());
		this.applyTransform()
	},
	onImagePinchEnd:function(a){
		if(this.scale==this.baseScale){
			this.setTranslation(this.translateBaseX,this.translateBaseY)
		}else{
			if(this.scale<this.baseScale&&this.getResizeOnLoad()){
				this.resetZoom();	
				return
			}
			this.originReScaledImgX=this.originScaledImgX*(this.scale/this.startScale);
			this.originReScaledImgY=this.originScaledImgY*(this.scale/this.startScale);
			this.setTranslation(this.originViewportX-this.originReScaledImgX,this.originViewportY-this.originReScaledImgY)
		}
		this.setOrigin(0,0);
		this.applyTransform();
		this.adjustScroller()
	},
	onZoomIn:function(){
		var b=this.scale;
		if(b<this.getMaxScale()){
			b=this.scale+0.05
		}
		if(b>=this.getMaxScale()){
			b=this.getMaxScale()
		}
		var a={pageX:0,pageY:0};
		a.pageX=this.viewportWidth/2;
		a.pageY=this.viewportHeight/2;
		this.zoomImage(a,b)
	},
	onZoomOut:function(){
		var b=this.scale;
		if(b>this.baseScale){
			b=this.scale-0.05
		}
		if(b<=this.baseScale){
			b=this.baseScale
		}
		var a={pageX:0,pageY:0};
		a.pageX=this.viewportWidth/2;
		a.pageY=this.viewportHeight/2;
		this.zoomImage(a,b)
	},
	zoomImage:function(g,b,l){
		var d=this.getScrollable().getScroller();
		var e=this;
		var c=this.scale,f=b,k=g?(g.pageX-this.element.getX()):0,i=g?(g.pageY-this.element.getY()):0,a=k+d.position.x-this.translateX,m=i+d.position.y-this.translateY,j=a*(f/c),h=m*(f/c);
		this.scale=f;
		setTimeout(function(){
			e.setTranslation(k-j,i-h);
			e.applyTransform();
			e.adjustScroller();
			Ext.repaint()
		},50);
	},
	onDoubleTap:function(f,k){
		var d=this;
		var c=this.getScrollable().getScroller();
		if(!this.getDoubleTapScale()){
			return false
		}
		if(this.scale>this.baseScale){
			this.scale=this.baseScale;
			this.setTranslation(this.translateBaseX,this.translateBaseY);
			this.applyTransform();
			this.adjustScroller();
			Ext.repaint()
		}
		else{
			var b=this.scale,e=this.baseScale*4,j=f?(f.pageX-this.element.getX()):0,h=f?(f.pageY-this.element.getY()):0,a=j+c.position.x-this.translateX,l=h+c.position.y-this.translateY,i=a*(e/b),g=l*(e/b);
			this.scale=e;
			setTimeout(function(){
				d.setTranslation(j-i,h-g);
				d.applyTransform();
				d.adjustScroller();
				Ext.repaint()
			},50)
		}
	},
	setOrigin:function(a,b){
		this.imgEl.dom.style.webkitTransformOrigin=a+"px "+b+"px"
	},
	setTranslation:function(b,a){
		this.translateX=b;
		this.translateY=a;
		this.scrollX=this.scrollY=0;
		if(this.translateX<0){
			this.scrollX=this.translateX;
			this.translateX=0
		}
		if(this.translateY<0){
			this.scrollY=this.translateY;
			this.translateY=0
		}
	},
	resetZoom:function(){
		this.scale=this.baseScale;
		this.setTranslation(this.translateBaseX,this.translateBaseY);
		this.setOrigin(0,0);
		this.applyTransform();
		this.adjustScroller()
	},
	resize:function(){
//		this.viewportWidth=this.parent.element.getWidth()||this.viewportWidth||this.getWidth();
//		this.viewportHeight=this.parent.element.getHeight()||this.viewportHeight||this.getHeight();
		this.viewportWidth=this.element.dom.clientWidth;
		this.viewportHeight=this.element.dom.clientHeight;
		
		this.imgWidth=this.imgEl.dom.width;
		this.imgHeight=this.imgEl.dom.height;
		if(this.getResizeOnLoad()){
			this.scale=this.baseScale=Math.min(this.viewportWidth/this.imgWidth,this.viewportHeight/this.imgHeight);
			this.setMaxScale(this.scale*4)
		}else{
			this.scale=this.baseScale=1
		}
		this.translateX=this.translateBaseX=(this.viewportWidth-this.baseScale*this.imgWidth)/2;
		this.translateY=this.translateBaseY=(this.viewportHeight-this.baseScale*this.imgHeight)/2;
		this.applyTransform();
		this.adjustScroller()
	},
	applyTransform:function(){
		var 	c=Ext.Number.toFixed(this.translateX,5),
				b=Ext.Number.toFixed(this.translateY,5),
				a=Ext.Number.toFixed(this.scale,8);
		if(Ext.os.is.Android){
			this.imgEl.dom.style.webkitTransform="matrix("+a+",0,0,"+a+","+c+","+b+")"
		}else{
			this.imgEl.dom.style.webkitTransform="translate3d("+c+"px, "+b+"px, 0) scale3d("+a+","+a+",1)"
		}
	},
	adjustScroller:function(){
		var b=this.getScrollable().getScroller();
		if(this.scale==this.baseScale){
			b.setDisabled(true)
		}else{
			b.setDisabled(false)
		}
		var d=Math.max(this.imgWidth*this.scale,this.viewportWidth);
		var c=Math.max(this.imgHeight*this.scale,this.viewportHeight);
		this.figEl.setStyle({
			width:d+"px",
			height:c+"px"
		});
		b.refresh();
		var a=0;
		if(this.scrollX){
			a=this.scrollX
		}
		var e=0;
		if(this.scrollY){
			e=this.scrollY
		}
		b.scrollTo(a*-1,e*-1)
	}
});

