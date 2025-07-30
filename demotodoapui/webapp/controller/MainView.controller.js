sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterOperator"
], function (Controller, JSONModel, Filter, FilterOperator) {
  "use strict";

  return Controller.extend("demotodoapui.controller.MainView", {
    onInit: function () {
      // Mock data
      var oData = {
        sales: [
          { date: "2023-10-01", flavor: "Vanilla", quantity: 50, revenue: 150, profit: 50 },
          { date: "2023-10-02", flavor: "Chocolate", quantity: 70, revenue: 210, profit: 70 },
          { date: "2023-10-03", flavor: "Strawberry", quantity: 30, revenue: 90, profit: 30 }
        ]
      };

      // Create JSON model
      var oModel = new JSONModel(oData);
      this.getView().setModel(oModel, "salesModel");

      // Calculate summary
      this._calculateSummary();
    },

    onFilter: function (oEvent) {
      var sQuery = oEvent.getParameter("newValue");
      var oTable = this.byId("salesTable");
      var oBinding = oTable.getBinding("items");

      var aFilters = [];
      if (sQuery) {
        aFilters.push(new Filter("flavor", FilterOperator.Contains, sQuery));
        aFilters.push(new Filter("date", FilterOperator.Contains, sQuery));
      }

      oBinding.filter(aFilters.length > 0 ? new Filter(aFilters, false) : []);
      this._calculateSummary();
    },

    onResetFilters: function () {
      var oTable = this.byId("salesTable");
      var oBinding = oTable.getBinding("items");
      oBinding.filter([]);
      this.byId("filterInput").setValue("");
      this._calculateSummary();
    },

    _calculateSummary: function () {
      var oModel = this.getView().getModel("salesModel");
      var aSales = oModel.getProperty("/sales");

      var iTotalSales = 0;
      var iTotalRevenue = 0;
      var iTotalProfit = 0;

      aSales.forEach(function (oSale) {
        iTotalSales += oSale.quantity;
        iTotalRevenue += oSale.revenue;
        iTotalProfit += oSale.profit;
      });

      this.byId("totalSales").setText(iTotalSales);
      this.byId("totalRevenue").setText(iTotalRevenue);
      this.byId("totalProfit").setText(iTotalProfit);
    }
  });
});