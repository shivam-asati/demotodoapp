sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "sap/m/MessageToast"
], function (Controller, JSONModel, MessageToast) {
  "use strict";

  return Controller.extend("demotodoappui.controller.MainView", {

    onInit: function () {
      // Mock Data for Sales Orders
      var oData = {
        SalesOrders: [
          {
            OrderID: "SO001",
            CustomerName: "John Doe",
            OrderDate: "2023-10-01",
            TotalAmount: "$500",
            OrderStatus: "Completed"
          },
          {
            OrderID: "SO002",
            CustomerName: "Jane Smith",
            OrderDate: "2023-10-05",
            TotalAmount: "$300",
            OrderStatus: "Pending"
          },
          {
            OrderID: "SO003",
            CustomerName: "Michael Brown",
            OrderDate: "2023-10-10",
            TotalAmount: "$700",
            OrderStatus: "Cancelled"
          }
        ]
      };

      // Create JSON Model and set to View
      var oModel = new JSONModel(oData);
      this.getView().setModel(oModel, "salesOrderModel");
    },

    onSearch: function (oEvent) {
      // Get the search query
      var sQuery = oEvent.getParameter("query");
      var oTable = this.getView().byId("salesOrderTable");
      var oBinding = oTable.getBinding("items");

      // Apply filters if query exists
      if (sQuery) {
        var oFilter = new sap.ui.model.Filter(
          "CustomerName",
          sap.ui.model.FilterOperator.Contains,
          sQuery
        );
        oBinding.filter([oFilter]);
      } else {
        oBinding.filter([]); // Clear filters
      }
    },

    onFilter: function () {
      MessageToast.show("Filter functionality not implemented yet.");
    },

    onSort: function () {
      MessageToast.show("Sort functionality not implemented yet.");
    }

  });
});