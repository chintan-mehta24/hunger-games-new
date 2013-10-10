Ext.define('HungerApp.view.PlayerRegistration', {
	extend: 'Ext.form.Panel',
	xtype: 'PlayerRegistration',
	id   : 'idPlayerRegistration',
	config: {
		defaults:{
			labelWidth: 'auto'
		},
		items : [
			{
				docked: 'top',
				xtype: 'titlebar',
				title: 'Player Registration',
				cls: 'topBarLoginCls',
				items:[{
					xtype: 'button',
					ui: 'plain',
					icon: 'resources/images/left_arrow.png',
					text: 'Back',
					itemId: 'btnPlayerRegistrationBack'
				},{
					xtype: 'button',
					ui: 'plain',
					iconMask : true,
					iconCls : 'video',
					align : 'right',
					//icon: 'resources/images/left_arrow.png',
					text: 'Video',
					itemId: 'btnVideo'
				}]
			},
			{
				xtype : 'label',
				html  : 'Wellcome Message',
				cls: 'welcomeMsgCls'
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
			{
				xtype: 'textfield',
				label: 'Email Address:',
				labelAlign: 'top',
				name: 'email',
				autoCapitalize : false,
				placeHolder : 'Email Address'
			},
		/*	{
				xtype  : 'selectfield',
				label: 'Title:',
				labelAlign: 'top',
				name: 'title',
				placeHolder : 'Title',
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
			},*/
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
						checked: true
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
/* 			{
				xtype: 'textfield',
				label: 'Company Title:',
				labelAlign: 'top',
				name: 'company_title',
				autoCapitalize : false,
				placeHolder : 'Company Title'
			}, */
			{
				xtype  : 'selectfield',
				label: 'MD/Sponsor:',
				labelAlign: 'top',
				name: 'md_id',
				placeHolder : 'MD/Sponsor',
				store : 'MDList',
			/*	options: [
					{text: 'MD - 1',  value: 'Solera Corportate'},
					{text: 'MD - 2', value: 'Audatex'},
					{text: 'MD - 3',  value: 'ABZ'},
					{text: 'MD - 4',  value: 'AudaExplore'},
					{text: 'MD - 5', value: 'AUTOonline'},
					{text: 'MD - 6',  value: 'Hollander'},
					{text: 'MD - 7',  value: 'HPI'}
				],*/
				autoSelect : false,
				displayField:'fullname',
				valueField : 'mdid'
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
				xtype : 'label',
				html  : 'Choose Skillsets',
				cls   : 'formExtraLableCls'
			},
			{
				xtype: 'dataview',
				name: 'skills',
				cls: 'skillDataviewCls',
				itemTpl: '{name}',
				itemCls: 'checkableCls',
				inline: true,
				scrollable: null,
				allowDeselect: true,
				mode: "MULTI",
				store: 'Skills'
			},
			{
				xtype: 'hiddenfield',
                name: 'status',
                value: 'player'
			},
			{
				xtype : 'button',
				text  : 'Register',
				itemId: 'btnPlayerSubmitForm',
				cls   : 'submitBtnCls'
			}
		],
		listeners : [{
			delegate: '#btnPlayerRegistrationBack',
			event: 'tap',
			fn: 'backFromPlayerRegistration'
		},{
			delegate: '#btnPlayerSubmitForm',
			event: 'tap',
			fn: 'nextToAvatarSelection'
		},{
			delegate: '#btnVideo',
			event: 'tap',
			fn: 'playVideo'
		}]
	},
	backFromPlayerRegistration: function(){
		var homeview = Ext.Viewport.down('homeview');
		homeview.animateActiveItem('#panelHomeLogin',{type:'slide',direction: 'right'});
	},
	nextToAvatarSelection: function(){
	
		var homeview = Ext.Viewport.down('homeview');
		var values = homeview.down('#formPanelPlayerRegistration').getValues();
		
		var homeController=HungerApp.app.getController('Home');
        if(values.name==''){
			Ext.Msg.alert('','First name cannot be blank.');
			return;
        }
        else if(values.last_name==''){
            Ext.Msg.alert('','Last name cannot be blank.');
			return;
        }
        else if(values.email==''){
            Ext.Msg.alert('','Email address cannot be blank.');
			return;
        }
        else if(values.title==''){
            Ext.Msg.alert('','Title cannot be blank.');
			return;
        }
        else if(values.company=='' || values.company==null){
            Ext.Msg.alert('','District cannot be blank.');
			return;
        }
        else if(values.country==''){
            Ext.Msg.alert('','Country cannot be blank.');
			return;
        }
        else if(values.bio==''){
            Ext.Msg.alert('','Short Bio cannot be blank.');
			return;
        }
        else if(values.password==''){
            Ext.Msg.alert('','Password cannot be blank.');
			return;
        }
        else if(values.password_confirmation==''){
            Ext.Msg.alert('','Confirm password cannot be blank.');
			return;
        }
        else if(values.password != values.password_confirmation){
            Ext.Msg.alert('','Password and confirm password does not match.');
			return;
        }
		var dataview = this.down('dataview[name=skills]'),
			selection = dataview.getSelection(),
			skills_Id = [];
		Ext.each(selection,function(record){
			skills_Id.push(record.get('id'))
		});
		Ext.apply(values,{
			send_mail_to_md : "true"
		});
		console.log(values);
		homeController.doPlayerRegistration(values,this,skills_Id.join());
	},

	playVideo: function(){
		var homeController=HungerApp.app.getController('Home');
		homeController.getVideo(this);
	},

});
