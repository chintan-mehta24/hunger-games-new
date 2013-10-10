Ext.define("HungerApp.view.Fileup", {
   extend: "Ext.Button",
   xtype: "fileupload",
   requires: ["Ext.MessageBox", "Ext.device.Notification"],
   template: [{
      tag: "span",
      reference: "badgeElement",
      hidden: true
   }, {
      tag: "span",
      className: Ext.baseCSSPrefix + "button-icon",
      reference: "iconElement",
//      hidden: true
   }, {
      tag: "span",
      reference: "textElement",
      hidden: true
   }, {
      tag: "div",
      className: Ext.baseCSSPrefix + "loading-spinner",
      reference: "loadingElement",
      hidden: true,
      children: [{
         tag: "span",
         className: Ext.baseCSSPrefix + "loading-top"
      }, {
         tag: "span",
         className: Ext.baseCSSPrefix + "loading-right"
      }, {
         tag: "span",
         className: Ext.baseCSSPrefix + "loading-bottom"
      }, {
         tag: "span",
         className: Ext.baseCSSPrefix + "loading-left"
      }]
   }, {
      tag: "form",
      reference: "formElement",
      hidden: false,
      children: [{
         tag: "input",
         reference: "fileElement",
         type: "file",
         name: "userfile",
         tabindex: -1,
		 accept:"image/*",
//capture=camera"
         hidden: false,
         style: "opacity:0;position:absolute;top:-3px;right:-3px;bottom:-3px;left:-3px;z-index:16777270;"
      }]
   }],
   defaultStates: {
      browse: {
         text: "Browse",
         cls: Ext.baseCSSPrefix + "fileup",
         ui: "filebrowse"
      },
      ready: {
         text: "Upload",
         cls: Ext.baseCSSPrefix + "fileup-ready",
         ui: "fileready"
      },
      uploading: {
         text: "Uploading",
         cls: Ext.baseCSSPrefix + "fileup-uploading",
         ui: "fileupload",
         loading: true
      }
   },
   currentState: null,
   config: {
      cls: Ext.baseCSSPrefix + "fileup",
      badgeCls: Ext.baseCSSPrefix + "fileup-badge",
      name: "user[avatar]",
      autoUpload: true,
      states: true,
      loadAsDataUrl: true,
      url: ""
   },
   applyStates: function (a) {
      var b = this;
      if (a) {
         if (Ext.isObject(a)) {
            return Ext.merge({}, b.defaultStates, a)
         } else {
            return b.defaultStates
         }
      } else {
         return b.defaultStates
      }
   },
   initialize: function () {
      var a = this;
      a.callParent();
      a.fileElement.dom.onchange = function () {
         a.onChanged.apply(a, arguments)
      };
      a.on({
         scope: a,
         buffer: 250,
         tap: a.onButtonTap
      });
      //a.changeState("browse")
   },
   onButtonTap: function () {
      var b = this;
      // switch (b.currentState) {
      // case "ready":
         // b.changeState("uploading");
         var a = b.fileElement.dom.files[0];
         // if (!b.getLoadAsDataUrl()) {
            // b.fireEvent("uploadstart", a);
            // b.doUpload(a)
         // } else {
            b.doLoad(a)
         // }
         // break
      // }
   },
    onChanged: function (b) {
      var a = this;
      if (b.target.files.length > 0) {
         a.fireAction("ready", [b.target.files[0]], function () {
            //a.changeState("ready")
			a.doLoad(b.target.files[0])
         }, a)
      } else {
         Ext.device.Notification.show({	
            title: "Error",
            message: "File selected but not accessible",
            buttons: Ext.MessageBox.OK,
            callback: function () {
//               a.changeState("browse")
            }
         })
      }
   }, 
/*    changeState: function (c) {
      var b = this;
      var a = b.getStates();
      // if (Ext.isDefined(a[c])) {
         if (a[c].text) {
            b.setText(a[c].text)
         } else {
            b.setText("")
         }
         if (a[c].cls) {
            b.setCls(a[c].cls)
         } else {
            b.setCls("")
         }
         if (a[c].ui) {
            b.setUi(a[c].ui)
         } else {
            b.setUi("normal")
         }
         if (a[c].loading) {
            b.loadingElement.show()
         } else {
            b.loadingElement.hide()
         }
         if (a[c].loading) {
            Ext.Viewport.setMasked({xtype: 'loadmask'});
         } else {
            Ext.Viewport.setMasked(null);
         } 
         switch (c) {
         case "browse":
            b.currentState = "browse";
            b.reset();
            break;
         case "ready":
            b.currentState = "ready";
            b.fileElement.hide();
            if (b.getAutoUpload()) {
               b.onButtonTap()
            }
            break;
         case "uploading":
            b.currentState = "uploading";
            break
         }
      // } else {}
   }, */
   doLoad: function (b) {
		  var c = this;
		  var a = new FileReader();
		  a.onerror = function (f) {
			 var d;
			 switch (f.target.error.code) {
			 case f.target.error.NOT_FOUND_ERR:
				d = "File Not Found";
				break;
			 case f.target.error.NOT_READABLE_ERR:
				d = "File is not readable";
				break;
			 case f.target.error.ABORT_ERR:
				break;
			 default:
				d = "Can not read file"
			 }
			 c.fireEvent("loadfailure", d, this, f)
		  };
		  a.onload = function (d) {
			console.log(d);
			 c.fireEvent("loadsuccess", this.result, this, d);
			 //c.changeState("browse")
		  };
          a.readAsDataURL(b)
   },
   doUpload: function (b,extraParams) {
      var d = this;
      var a = new XMLHttpRequest();
      if (a.upload && a.upload.addEventListener) {
         a.upload.onprogress = function (g) {
            if (g.lengthComputable) {
               var f = (g.loaded / g.total) * 100;
               d.setBadgeText(f.toFixed(0) + "%")
            }
         };
         a.onreadystatechange = function (g) {
            if (this.readyState == 4) {
               if (this.status == 200) {
                  var f = Ext.decode(this.responseText, true);
					if (f && f.errors) {
						d.fireEvent("failure", f.message, f, this, g)
					} else {
						d.fireEvent("success", f, this, g)
					}
               } else {
                  d.fireEvent("failure", this.status + " " + this.statusText, f, this, g)
               }
               // d.changeState("browse")
            }
         };
         a.upload.onerror = function (f) {
            d.fireEvent("failure", this.status + " " + this.statusText, {}, this, f)
         }
      }
      var c = new FormData();
	  for(key in extraParams){
		c.append(key, extraParams[key]);
	  }
      c.append(d.getName(), b);
      a.open("POST", d.getUrl());
      a.send(c)
   },
   reset: function () {
      var a = this;
      a.setBadgeText(null);
      a.formElement.dom.reset();
      a.fileElement.show()
   }
});
