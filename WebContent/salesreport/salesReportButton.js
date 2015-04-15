jQuery.sap.declare("salesreport.salesReportButton");

jQuery.sap.require("sap.m.Button");

sap.m.Button.extend("salesreport.salesReportButton", { metadata : {


	properties : {

		"AltText" : {type : "string", group : "Misc", defaultValue : null},

	}
}});
