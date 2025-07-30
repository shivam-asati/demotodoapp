sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "sap/m/MessageBox"
], function (Controller, JSONModel, MessageBox) {
  "use strict";

  return Controller.extend("demotodoapui.controller.MainView", {
    onInit: function () {
      // Mock Data
      var oData = {
        salesData: [
          { itemName: "Vanilla Ice Cream", quantitySold: 120, revenue: 240 },
          { itemName: "Chocolate Ice Cream", quantitySold: 150, revenue: 300 },
          { itemName: "Strawberry Ice Cream", quantitySold: 100, revenue: 200 }
        ],
        salesTrends: [
          { month: "January", revenue: 500 },
          { month: "February", revenue: 600 },
          { month: "March", revenue: 700 }
        ]
      };

      // Set JSON Model
      var oModel = new JSONModel(oData);
      this.getView().setModel(oModel);
    },

    onFilterApply: function () {
      var oView = this.getView();
      var oDateRange = oView.byId("dateRange").getDateValue();
      var sCategory = oView.byId("categorySelect").getSelectedKey();

      // Mock Filter Logic
      if (!oDateRange) {
        MessageBox.error("Please select a date range.");
        return;
      }

      MessageBox.success("Filters applied successfully.");
    }
  });
});