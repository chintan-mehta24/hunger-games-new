Ext.define('HungerApp.view.EditProfile', {
	extend: 'Ext.form.Panel',
	xtype: 'EditProfile',
	config: {
		defaults:{
			labelWidth: 'auto'
		},
		items : [
		/*	{
				docked: 'top',
				ui: 'plain',
				xtype: 'titlebar',
				title: 'Register User',
				items:[{
					xtype: 'button',
					ui: 'back',
					text: 'Back',
					itemId: 'btnRegistrationBack'
				}]
			},*/
			{
				xtype : 'label',
				cls: 'welcomeMsgCls',
				html  : 'Welcome message'
			},
			{
				xtype: 'textfield',
				label: 'First Name:',
				labelAlign: 'top',
				name: 'name',
				autoCapitalize : true,
				placeHolder : 'First Name'
			},
			{
				xtype: 'textfield',
				label: 'Last Name:',
				labelAlign: 'top',
				name: 'last_name',
				autoCapitalize : true,
				placeHolder : 'Last Name'
			},
		/*	{
				xtype: 'textfield',
				label: 'Email Address:',
				labelAlign: 'top',
				name: 'email',
				autoCapitalize : false,
				placeHolder : 'Email Address'
			},*/
			{
				xtype: 'textfield',
				label: 'Title:',
				labelAlign: 'top',
				name: 'title',
				placeHolder : 'Title',
				autoCapitalize : false
			},
			{
				xtype : 'label',
				html  : 'Sex',
				cls   : 'formExtraLableCls',
			},
			{
				xtype : 'container',
				layout : 'hbox',
				defaults:{
					labelWidth: 'auto',
					labelAlign: 'right'
				},
				items: [
					{
						xtype: 'radiofield',
						name : 'sex',
						flex: 1,
						value: 'Male',
						label: 'Male:',
						itemId: 'checkBoxMale',
						//checked: true
					},
					{
						xtype: 'radiofield',
						name : 'sex',
						flex: 1,
						value: 'Female',
						itemId: 'checkBoxFemale',
						label: 'Female:'
					}
				]
			},
			{
				xtype  : 'selectfield',
				label: 'District:',
				labelAlign: 'top',
				name: 'company',
				placeHolder : 'District',
				itemId : 'destrict',
				options: [
					{text: 'Solera Corportate',  value: 'Solera Corportate'},
					{text: 'Audatex', value: 'Audatex'},
					{text: 'ABZ',  value: 'ABZ'},
					{text: 'AudaExplore',  value: 'AudaExplore'},
					{text: 'AUTOonline', value: 'AUTOonline'},
					{text: 'Hollander',  value: 'Hollander'},
					{text: 'HPI',  value: 'HPI'},
					{text: 'Informex', value: 'Informex'},
					{text: 'Inpart',  value: 'Inpart'},
					{text: 'Market Scan', value: 'Market Scan'},
					{text: 'Sidexa',  value: 'Sidexa'}
				],
				//userPicker : false,
				//labelWidth	: 'initial',
				autoSelect : false,
				displayField:'text'				
			},
			{
				xtype: 'textfield',
				label: 'Country:',
				labelAlign: 'top',
				name: 'country',
				placeHolder : 'Country',
				autoCapitalize : false
			},
			{
				xtype: 'textareafield',
				label: 'Short Bio:',
				labelAlign: 'top',
				name: 'bio',
				placeHolder : 'Short Bio',
				autoCapitalize : false
			},
			{
				xtype : 'label',
				html  : 'Skill Sets:',
				cls   : 'formExtraLableCls',
				itemId: 'skillLabel'
			},
			{
				xtype: 'dataview',
				name: 'skills',
				itemId: 'skillSet',
				cls: 'skillDataviewCls',
				itemTpl: '{name}',
				itemCls: 'checkableCls',
				inline: true,
				scrollable: null,
				allowDeselect: true,
				mode: "MULTI",
				store: 'Skills'
			},
			/*	{
				xtype: 'passwordfield',
				label: 'Password:',
				name: 'password',
				placeHolder : 'Password',
				labelAlign: 'top'
			},
			{
				xtype: 'passwordfield',
				label: 'Confirm Password:',
				name: 'password_confirmation',
				placeHolder : 'Confirm Password',
				labelAlign: 'top'
			},
			
			{
				xtype: 'hiddenfield',
                name: 'status',
                value: 'spectator'
			},*/
			{
				xtype: 'hiddenfield',
                name: 'auth_token'
			},
			{
				xtype: 'hiddenfield',
                name: 'user_id'
			},
			{
				xtype : 'button',
				text  : 'Save',
				itemId : 'btnSpectatorSubmitForm',
				cls   : 'submitBtnCls'
			}
		],
		listeners : [{
			delegate: '#btnRegistrationBack',
			event: 'tap',
			fn: 'backFromRegistration'
		},{
			delegate: '#btnSpectatorSubmitForm',
			event: 'tap',
			fn: 'nextToAvatarSelection'
		}]
	},
	backFromRegistration: function(){
		var homeview = Ext.Viewport.down('homeview');
		homeview.animateActiveItem('#panelHomeLogin',{type:'slide',direction: 'right'});
	},
	nextToAvatarSelection: function(){
	
		var homeview = Ext.Viewport.down('homeview');
		var thisPage = homeview.down('#idEditProfile').getValues();
		console.log(thisPage);

		var homeController=HungerApp.app.getController('Home');
		
        if(thisPage.name==''){
			Ext.Msg.alert('','First name cannot be blank.');
			return;
        }
        else if(thisPage.last_name==''){
            Ext.Msg.alert('','Last name cannot be blank.');
			return;
        }
        else if(thisPage.email==''){
            Ext.Msg.alert('','Email address cannot be blank.');
			return;
        }
        else if(thisPage.title==''){
            Ext.Msg.alert('','Title cannot be blank.');
			return;
        }
        else if(thisPage.company=='' || thisPage.company==null){
            Ext.Msg.alert('','District cannot be blank.');
			return;
        }
        else if(thisPage.country==''){
            Ext.Msg.alert('','Country cannot be blank.');
			return;
        }
        else if(thisPage.bio==''){
            Ext.Msg.alert('','Short Bio cannot be blank.');
			return;
        }
        else if(thisPage.password==''){
            Ext.Msg.alert('','Password cannot be blank.');
			return;
        }
        else if(thisPage.password_confirmation==''){
            Ext.Msg.alert('','Confirm password cannot be blank.');
			return;
        }
        else if(thisPage.password!=thisPage.password_confirmation){
            Ext.Msg.alert('','Password and confirm password does not match.');
			return;
        }
		var dataview = this.down('dataview[name=skills]'),
			selection = dataview.getSelection(),
			skills_Id = [];
		Ext.each(selection,function(record){
			skills_Id.push(record.get('id'))
		});
		thisPage.skills = skills_Id.join();
		homeController.doEditProfile(thisPage,this);
	}
});