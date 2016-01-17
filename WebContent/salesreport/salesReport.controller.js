sap.ui.controller(
				"salesreport.salesReport",
				{

					onInit : function() {
						this.loadYearlySales();

					},

					loadYearlySales : function() {

						this.oModel = new sap.ui.model.json.JSONModel({
							'countrySales' : [ {
								"name" : "Country 1",
								"country_data" : {
									"net_sales" : "84M",
									"yearly_distribution" : [ {
										"quarter" : "Q1",
										"sales" : "20M"
									}, {
										"quarter" : "Q2",
										"sales" : "30M"
									}, {
										"quarter" : "Q3",
										"sales" : "18M"
									}, {
										"quarter" : "Q4",
										"sales" : "16M"
									} ],
									"best_sellers" : [ {
										"name" : "Product A",
										"units" : "76000",
										"total" : "5M"
									}, {
										"name" : "Product B",
										"units" : "13000",
										"total" : "2M"
									}, {
										"name" : "Product C",
										"units" : "12300",
										"total" : "15M"
									}, {
										"name" : "Product D",
										"units" : "9800",
										"total" : "3M"
									}, {
										"name" : "Product F",
										"units" : "7100",
										"total" : "3M"
									} ]
								}
							}, {
								"name" : "Country 2",
								"country_data" : {
									"net_sales" : "7M",
									"yearly_distribution" : [ {
										"quarter" : "Q1",
										"sales" : "20M"
									}, {
										"quarter" : "Q2",
										"sales" : "21M"
									}, {
										"quarter" : "Q3",
										"sales" : "12M"
									}, {
										"quarter" : "Q4",
										"sales" : "16M"
									} ],
									"best_sellers" : [ {
										"name" : "Product A",
										"units" : "76000",
										"total" : "5M"
									}, {
										"name" : "Product B",
										"units" : "76000",
										"total" : "5M"
									}, {
										"name" : "Product C",
										"units" : "76000",
										"total" : "5M"
									}, {
										"name" : "Product D",
										"units" : "76000",
										"total" : "5M"
									}, {
										"name" : "Product F",
										"units" : "76000",
										"total" : "5M"
									} ]
								}
							}, {
								"name" : "Country 3",
								"country_data" : {
									"net_sales" : "84M",
									"yearly_distribution" : [ {
										"quarter" : "Q1",
										"sales" : "20M"
									}, {
										"quarter" : "Q2",
										"sales" : "30M"
									}, {
										"quarter" : "Q3",
										"sales" : "18M"
									}, {
										"quarter" : "Q4",
										"sales" : "16M"
									} ],
									"best_sellers" : [ {
										"name" : "Product A",
										"units" : "76000",
										"total" : "5M"
									}, {
										"name" : "Product B",
										"units" : "76000",
										"total" : "5M"
									}, {
										"name" : "Product C",
										"units" : "76000",
										"total" : "5M"
									}, {
										"name" : "Product D",
										"units" : "76000",
										"total" : "5M"
									}, {
										"name" : "Product F",
										"units" : "76000",
										"total" : "5M"
									} ]
								}
							} ]
						});

	// Set dummy values for three combobox
						var year = [ "2013", "2014" ];
						var yearRange = [];
						var subcategory = [ "Subcategory1", "Subcategory2" ];
						var subcategoryRange = [];
						var category = [ "category1", "category2" ];
						var categoryRange = [];
						for ( var i = 0; i < year.length; i++) {
							yearRange.push({
								"year" : year[i]
							});

						}
						for ( var j = 0; j < subcategory.length; j++) {
							subcategoryRange.push({
								"subcategory" : subcategory[j]
							});
						}
						for ( var k = 0; k < category.length; k++) {
							categoryRange.push({
								"category" : category[k]
							});
						}

						this.oModel.setProperty("/year", yearRange);
						this.oModel.setProperty("/subcategory",	subcategoryRange);
						this.oModel.setProperty("/category", categoryRange);

						sap.ui.getCore().setModel(this.oModel, "salesReport");
					},

					//
					handleCountrySales : function(oEvent) {
						salesReport = sap.ui.getCore().getModel('salesReport')
								.getData().countrySales;
						for ( var i = 0; i < salesReport.length; i++) {
							var sField = salesReport[i];
							if (oEvent.oSource.mProperties.text.indexOf(sField.name) > -1) {
								this._showCountrySalesChart(sField.country_data.yearly_distribution, sField.name);
								this._showBestSell(sField.country_data.best_sellers);
								break;
							}
						}

					},

					onExit : function() {
						if (this._oPopover) {
							this._oPopover.destroy();
						}
					},

					handleFilterPress : function(oEvent) {
						this._createPopover(oEvent);
					},

					_createPopover: function(oEvent) {
						if (!this._oPopover) {
							this._oPopover = new sap.m.ResponsivePopover();
							this._oPopover.setPlacement(sap.m.PlacementType.Left);
							var oVLayout = this._createPopoverContent();
							this._oPopover.addContent(oVLayout);
							this.getView().addDependent(this._oPopover);
						}
						this._oPopover.openBy(oEvent.getSource());

					},

					_createPopoverContent: function() {
						var oVLayout = new sap.ui.layout.VerticalLayout();
						var yearList = new sap.ui.core.ListItem({
							key: "{year}",
							text: "{year}"
						});

						var yearSelect = new sap.m.Select({
							items: {
								path: "/year",
								template: yearList
							}
						});

						yearSelect.setModel(this.oModel);

						var categoryList = new sap.ui.core.ListItem({
							key: "{category}",
							text: "{category}"
						});

						var categorySelect = new sap.m.Select({
							items: {
								path: "/category",
								template: categoryList
							}
						});

						categorySelect.setModel(this.oModel);

						var subCategoryList = new sap.ui.core.ListItem({
							key: "{subcategory}",
							text: "{subcategory}"
						});

						var subCategorySelect = new sap.m.Select({
							items: {
								path: "/subcategory",
								template: subCategoryList
							}
						});
						subCategorySelect.setModel(this.oModel);

						oVLayout.addContent(yearSelect);
						oVLayout.addContent(categorySelect);
						oVLayout.addContent(subCategorySelect);

						return oVLayout;
					},

					_showBestSell : function(bestSellers) {
//						var bestSell = new sap.ui.model.json.JSONModel({
//							"bestSeller" : bestSellers
//						});
//						this.getView().setModel(bestSell, "oModel2");
						this.oModel.setProperty("/yearlyBestSeller", bestSellers);
					},

					_showCountrySalesChart : function(yearlyDistribution, country) {
						if (window.innerWidth > 450){
							var oVizFrame =  this.getView().byId("vizColumn");
						} else {
							var oVizFrame =  this.getView().byId("vizColumn2");
						}

						var yearlyDistribution = yearlyDistribution.map(function(obj) {
									obj.sales = obj.sales.replace(/\D/g, "");
									return obj;
								});
						var oDataset = new sap.viz.ui5.data.FlattenedDataset({
							dimensions : [ {
								name : 'quarter',
								value : "{quarter}"
							} ],
							measures : [ {
								name : 'sales',
								value : '{sales}'
							} ],
							data : {
								path : "/yearly_distribution"
							}
						});



						oVizFrame.setDataset(oDataset);

						var oModel2 = new sap.ui.model.json.JSONModel({
							"yearly_distribution" : yearlyDistribution
						});

						oVizFrame.setModel(oModel2);
						var feedPrimaryValues = new sap.viz.ui5.controls.common.feeds.FeedItem(
								{
									'uid' : "primaryValues",
									'type' : "Measure",
									'values' : [ "sales" ]
								}), feedSecondaryValues = new sap.viz.ui5.controls.common.feeds.FeedItem(
								{
									'uid' : "axisLabels",
									'type' : "Dimension",
									'values' : [ new sap.viz.ui5.controls.common.feeds.AnalysisObject(
											{
												'uid' : "quarter",
												'type' : "Dimension",
												'name' : "quarter"
											}) ]
								});

						oVizFrame.addFeed(feedPrimaryValues);
						oVizFrame.addFeed(feedSecondaryValues);
						var sText = "Net Sales for " + country + " 2014";
						oVizFrame.setVizProperties({
							plotArea : {
								dataLabel : {
									visible : true,
									formatString : "##M"
								}
							},
							title : {
								text : sText,
								alignment : "left"
							},
							legend : {
								visible : false
							}
						});

					},

				});