Ext.namespace('com.zz91.sms.gateway');

var GATEWAY=new function(){
	this.GATEWAY_GRID="gatewaygrid";
	this.GATEWAY_FORM="gatewayform";
	this.GATEWAY_WIN="gatewaywin"
}
com.zz91.sms.gateway.Field=[
	{name:"id",mapping:"id"},
	{name:"titles",mapping:"titles"},
	{name:"enabled",mapping:"enabled"},
	{name:"serialNo",mapping:"serialNo"},
	{name:"serialPas",mapping:"serialPas"},
	{name:"apiJar",mapping:"apiJar"},
	{name:"docs",mapping:"docs"}
];

com.zz91.sms.gateway.Grid = Ext.extend(Ext.grid.GridPanel,{
	constructor:function(config){
		config = config||{};
		Ext.apply(this,config);
		
		var _store = new Ext.data.JsonStore({
				remoteSort:true,
				fields:com.zz91.sms.gateway.Field,
				url:Context.ROOT +  "/gateway/query.htm",
				autoLoad:true
		});
		
		var grid = this;
		var _sm=new Ext.grid.CheckboxSelectionModel({});
		
		var _cm=new Ext.grid.ColumnModel( 
				[ _sm,{
			header : "网关名称",
			sortable : false,
			dataIndex : "titles"
		},{
			header :"状态",
			sortable : false,
			dataIndex:"enabled",
			renderer : function(value, metadata, record, rowIndex,colIndex, store) {
				if(value==0){
					return "未启用";
				}
				if(value==1){
					return "已启用";
				}
			}
		},{
			header:"序列号",
			sortable:false,
			dataIndex:"serialNo"
		},{
			header : "密码",
			sortable : false,
			dataIndex : "serialPas"
		},{
			header : "网关接口",
			sortable : false,
			dataIndex : "apiJar"
		},{
			header:"开发文档",
			sortable:false,
			dataIndex:"docs"
		}
		]);
		
		var c={
			loadMask:MESSAGE.loadmask,
			iconCls:"icon-grid",
			store:_store,
			sm:_sm,
			cm:_cm,
			tbar:this.mytoolbar,
			bbar: com.zz91.utils.pageNav(_store)
		};
		
		com.zz91.sms.gateway.Grid.superclass.constructor.call(this,c);
	},
	mytoolbar:[
	{
		text : '新增',
		iconCls : 'add16',
		handler : function(btn){
			com.zz91.sms.gateway.addGate();
	}
	},'-',{
		text : '修改',
		iconCls : 'edit16',
		handler : function(btn){
		var row = Ext.getCmp(GATEWAY.GATEWAY_GRID).getSelectionModel().getSelected();
		if(row!=null){
			com.zz91.sms.gateway.updateGate(row.get("id"));
		}
	}
	},'-',{
		text : '删除',
		iconCls : 'delete16',
		handler : function(btn){		
		var row = Ext.getCmp(GATEWAY.GATEWAY_GRID).getSelectionModel().getSelections();		
			if (row.length > 0) {
				Ext.MessageBox.confirm(Context.MSG_TITLE, '是否要删除选中的 ' + row.length + '条记录?', function(_btn){
					if (_btn != "yes")
						return;
					for (var i = 0, len = row.length; i < len; i++) {
						Ext.Ajax.request({
							url:Context.ROOT +  "/gateway/delete.htm",
							params:{"id":row[i].get("id")},
							success:function(response,opt){
								var obj = Ext.decode(response.responseText);
								if(obj.success){
									com.zz91.utils.Msg("","删除记录成功");
									Ext.getCmp(GATEWAY.GATEWAY_GRID).getStore().reload();
								}else{
									Ext.MessageBox.show({
										title:MESSAGE.title,
										msg : MESSAGE.saveFailure,
										buttons:Ext.MessageBox.OK,
										icon:Ext.MessageBox.ERROR
									});
								}
							},
							failure:function(response,opt){
								Ext.MessageBox.show({
									title:MESSAGE.title,
									msg : MESSAGE.submitFailure,
									buttons:Ext.MessageBox.OK,
									icon:Ext.MessageBox.ERROR
								});
							}
						});
					}
				});
			}
		}
	},'-',{
		text :'启用',
		iconCls :'edit16',
		handler : function(btn){		
		var row = Ext.getCmp(GATEWAY.GATEWAY_GRID).getSelectionModel().getSelections();
			if (row.length > 0) {
				Ext.MessageBox.confirm(Context.MSG_TITLE, '是否要启用选中的信息?', function(_btn){
					if (_btn != "yes")
						return;
					for (var i = 0, len = row.length; i < len; i++) {
						Ext.Ajax.request({
							url:Context.ROOT +  "/gateway/enabledGate.htm",
							params:{"id":row[i].get("id")},
							success:function(response,opt){
								var obj = Ext.decode(response.responseText);
								if(obj.success){
									com.zz91.utils.Msg("","启用成功");
									Ext.getCmp(GATEWAY.GATEWAY_GRID).getStore().reload();
								}else{
									Ext.MessageBox.show({
										title:MESSAGE.title,
										msg : MESSAGE.saveFailure,
										buttons:Ext.MessageBox.OK,
										icon:Ext.MessageBox.ERROR
									});
								}
							},
							failure:function(response,opt){
								Ext.MessageBox.show({
									title:MESSAGE.title,
									msg : MESSAGE.submitFailure,
									buttons:Ext.MessageBox.OK,
									icon:Ext.MessageBox.ERROR
								});
							}
						});
					}
				});
			}
		}
	},'-',{
		text : '关闭',
		iconCls : 'edit16',
		handler : function(btn){		
		var row = Ext.getCmp(GATEWAY.GATEWAY_GRID).getSelectionModel().getSelections();
			if (row.length > 0) {
				Ext.MessageBox.confirm(Context.MSG_TITLE, '是否要关闭选中的信息?', function(_btn){
					if (_btn != "yes")
						return;
					for (var i = 0, len = row.length; i < len; i++) {
						Ext.Ajax.request({
							url:Context.ROOT +  "/gateway/disenabledGate.htm",
							params:{"id":row[i].get("id")},
							success:function(response,opt){
								var obj = Ext.decode(response.responseText);
								if(obj.success){
									com.zz91.utils.Msg("","关闭成功");
									Ext.getCmp(GATEWAY.GATEWAY_GRID).getStore().reload();
								}else{
									Ext.MessageBox.show({
										title:MESSAGE.title,
										msg : MESSAGE.saveFailure,
										buttons:Ext.MessageBox.OK,
										icon:Ext.MessageBox.ERROR
									});
								}
							},
							failure:function(response,opt){
								Ext.MessageBox.show({
									title:MESSAGE.title,
									msg : MESSAGE.submitFailure,
									buttons:Ext.MessageBox.OK,
									icon:Ext.MessageBox.ERROR
								});
							}
						});
					}
				});
			}
		}
	},'-',{
		text : '余额',
		iconCls : 'edit16'
	},'-',{
		text : '测试网关',
		iconCls : 'edit16',
	},"->",{
		xtype:"combo",
		itemCls:"required",
		name:"categoryCombo",
		mode:"local",
		emptyText:"选择发送状态",
		triggerAction:"all",
		forceSelection: true,
		displayField:'name',
		valueField:'value',
		autoSelect:true,
		store:new Ext.data.JsonStore({
			fields : ['name', 'value'],
			data   : [
				{name:'未启用',value:'0'},
				{name:'已启用',value:'1'}
			]
		}),
	}]
});
com.zz91.sms.gateway.Form = Ext.extend(Ext.form.FormPanel,{
	constructor:function(config){
		config = config||{};
		Ext.apply(this,config);
		
		var c={
			region:"center",
			layout:"form",
			bodyStyle:'padding:5px 0 0',
			frame:true,
			labelAlign : "right",
			labelWidth : 80,
			defaults:{
				anchor:"100%",
				xtype:"textfield",
				labelSeparator:""
			},
			items:[{
				xtype : "hidden",
				name : "id",
				dataIndex : "id"
			},{
				fieldLabel : "网关code",
				allowBlank : false,
				itemCls :"required",
				name : "code"
			}, {
				fieldLabel : "网关名称",
				allowBlank : false,
				itemCls :"required",
				name : "titles",
			},{
				fieldLabel : "序列号",
				allowBlank : false,
				itemCls :"required",
				name : "serialNo"
			},{
				fieldLabel : "状态",
				allowBlank : false,
				itemCls :"required",
				name : "enabled"
			},{
				fieldLabel : "密码",
				allowBlank : false,
				itemCls :"required",
				name : "serialPas"
			},{
				fieldLabel : "网关接口",
				allowBlank : false,
				itemCls :"required",
				name : "apiJar"
			},{
				xtype:"textarea",
				fieldLabel:"接收文档",
				name:"docs",
				itemCls:"required",
				allowBlank:false
			}],
			buttons:[{
				text:"确定",
				scope:this,
				handler:function(btn){
					var url=this.saveUrl;
					if (this.getForm().isValid()) {
						this.getForm().submit({
							url : url,
							method : "post",
							type:"json",
							success : function(_form,_action){
								com.zz91.utils.Msg("","信息已保存");
								Ext.getCmp(GATEWAY.GATEWAY_GRID).getStore().reload();
								Ext.getCmp(GATEWAY.GATEWAY_WIN).close();
								var cp = _action.result.data.split("|");
							},
							failure : function(_form,_action){
								Ext.MessageBox.show({
									title:MESSAGE.title,
									msg : MESSAGE.saveFailure,
									buttons:Ext.MessageBox.OK,
									icon:Ext.MessageBox.ERROR
								});
							}
						});
					} else {
						Ext.MessageBox.show({
							title:MESSAGE.title,
							msg : MESSAGE.submitFailure,
							buttons:Ext.MessageBox.OK,
							icon:Ext.MessageBox.ERROR
						});
					}
					
				}
			},{
				text:"关闭",
				handler:function(btn){
					Ext.getCmp(GATEWAY.GATEWAY_WIN).close();
				}
			}]
		};
		
		com.zz91.sms.gateway.Form.superclass.constructor.call(this,c);
	},
	saveUrl:Context.ROOT+ "/gateway/add.htm",
	loadOneRecord:function(id){
		var reader=[
			{name:"id",mapping:"id"},
			{name:"code",mapping:"code"},
			{name:"titles",mapping:"titles"},
			{name:"enabled",mapping:"enabled"},
			{name:"serialNo",mapping:"serialNo"},
			{name:"serialPas",mapping:"serialPas"},
			{name:"apiJar",mapping:"apiJar"},
			{name:"docs",mapping:"docs"}
			];
		
		var form = this;
		var _store = new Ext.data.JsonStore({
			fields : reader,
			url : Context.ROOT+ "/gateway/queryOne.htm",
			baseParams:{"id":id},
			autoLoad : true,
			listeners : {
				"datachanged" : function() {
					var record = _store.getAt(0);
					if (record != null) {
						form.getForm().loadRecord(record);
					}
				}
			}
		});
	},
});

com.zz91.sms.gateway.addGate = function(){
	var form = new com.zz91.sms.gateway.Form({
		id:GATEWAY.GATEWAY_FORM,
		saveUrl:Context.ROOT+ "/gateway/add.htm",
		region:"center"
	});
	
	
	var win = new Ext.Window({
			id:GATEWAY.GATEWAY_WIN ,
			title:"添加模板信息",
			width:700,
			autoHeight:true,
			modal:true,
			items:[form]
	});
	win.show();
}

com.zz91.sms.gateway.updateGate = function(id){
	var form = new com.zz91.sms.gateway.Form({
		id:GATEWAY.GATEWAY_FORM,
		saveUrl:Context.ROOT+ "/gateway/update.htm",
		region:"center"
	});
	
	form.loadOneRecord(id);
	
	var win = new Ext.Window({
			id:GATEWAY.GATEWAY_WIN,
			title:"修改模板信息",
			width:700,
			autoHeight:true,
			modal:true,
			items:[form]
	});
	win.show();
}

