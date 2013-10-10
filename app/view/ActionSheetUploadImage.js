/*
filePath function(){
	document.getElementById('fname').addEventListener('change', handleFileSelect, false);
}

handleFileSelect function(a){
	alert("45");
	console.log(a);
}
*/
Ext.define('HungerApp.view.ActionSheetUploadImage', {
	extend: 'Ext.form.Panel',
	xtype: 'ActionSheetUploadImage',
	config: {
		items: [
			
			{
				xtype : 'panel',
				//ui: 'main-ui-button',
				height: '2em',
				html : '<form> <input type="file" id="fname" onClick=browsed()> </form>',
				itemId: 'btn',
				//text  : 'Browse'
			},
			{
				xtype:'image',
				itemId: 'imagePreview',
				cls : 'imagePreviewPanelCls',
				flex  : 1,
				src : ''
			},
		]
	}
});

 function handleFileSelect(){
	console.log("0");
	token = "4128c2ca0c9e6d5545b2c609411d15ef2bd135d8";
 
	var control = document.getElementById('fname');
	console.log("1");
	var path = control.value;
	console.log("2");
	//var homeview = Ext.Viewport.down('homeview');
	//var thisView = homeview.down('#idActionSheetUploadImage');
	//thisView.down('#imagePreview').setSrc(path);
	
	var form = new FormData();
	console.log("3");
	//form.append("name", "Nicholas");
	//player_challenge[challenge_id] : challenge id that you reply - challenge
	//player_challenge[user_id] : current user’s id
	//player_challenge[date_submitted] : player challenge reply date
	//player_challenge[description]  :
	var player_challenge =  {
		challenge_id : '1',
		user_id : '1'
	};
	
	form.append("player_challenge", player_challenge);
	
	console.log(control.files[0]);
	console.log("4");
	form.append("avatar", control.files[0]);
	console.log("5");
	var xhr = new XMLHttpRequest();
	console.log("6");
	xhr.onload = function() {
		console.log("Upload complete.");
		alert("Done done done...");
	};
	console.log("7");
	xhr.open("post", applink+"api/player_challenges?auth_token="+token, true);
	console.log("8");
	xhr.send(form);
	console.log("9");
	
	//document.getElementById('files').addEventListener('change', handleFileSelect, false);
}

function browsed(){
	document.getElementById('fname').addEventListener('change', handleFileSelect, false);
}

		

		
