sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "sap/m/MessageToast"
], function (Controller, JSONModel, MessageToast) {
  "use strict";

  return Controller.extend("demotodoappui.controller.MainView", {
    onInit: function () {
      // Initialize JSON Model with mock data
      var oData = {
        tasks: []
      };
      var oModel = new JSONModel(oData);
      this.getView().setModel(oModel);
    },

    onAddTask: function () {
      var oView = this.getView();
      var oModel = oView.getModel();
      var aTasks = oModel.getProperty("/tasks");
      var sTaskName = oView.byId("taskInput").getValue();

      if (!sTaskName.trim()) {
        MessageToast.show("Task name cannot be empty.");
        return;
      }

      aTasks.push({
        name: sTaskName,
        completed: false
      });

      oModel.setProperty("/tasks", aTasks);
      oView.byId("taskInput").setValue("");
    },

    onTaskComplete: function (oEvent) {
      var oModel = this.getView().getModel();
      var oContext = oEvent.getSource().getBindingContext();
      var bCompleted = oEvent.getParameter("selected");

      oModel.setProperty(oContext.getPath() + "/completed", bCompleted);
    },

    onDeleteTask: function (oEvent) {
      var oModel = this.getView().getModel();
      var aTasks = oModel.getProperty("/tasks");
      var oContext = oEvent.getSource().getBindingContext();
      var iIndex = parseInt(oContext.getPath().split("/")[2], 10);

      aTasks.splice(iIndex, 1);
      oModel.setProperty("/tasks", aTasks);
    }
  });
});