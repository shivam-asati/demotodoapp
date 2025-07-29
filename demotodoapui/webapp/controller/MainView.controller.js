sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
  "use strict";

  return Controller.extend("demotodoappui.controller.MainView", {

    onInit: function () {
      // Initialize JSON model with mocked data
      var oData = {
        tasks: [
          { title: "Buy groceries", completed: false },
          { title: "Pay bills", completed: true }
        ]
      };
      var oModel = new JSONModel(oData);
      this.getView().setModel(oModel, "tasks");
    },

    onAddTask: function () {
      var oInput = this.getView().byId("taskInput");
      var sValue = oInput.getValue();
      if (!sValue) {
        sap.m.MessageToast.show("Please enter a task.");
        return;
      }

      var oModel = this.getView().getModel("tasks");
      var aTasks = oModel.getProperty("/tasks");
      aTasks.push({ title: sValue, completed: false });
      oModel.setProperty("/tasks", aTasks);
      oInput.setValue("");
    },

    onCompleteTask: function (oEvent) {
      var oContext = oEvent.getSource().getBindingContext("tasks");
      var oModel = this.getView().getModel("tasks");
      var oTask = oContext.getObject();
      oTask.completed = true;
      oModel.refresh();
    },

    onDeleteTask: function (oEvent) {
      var oContext = oEvent.getSource().getBindingContext("tasks");
      var oModel = this.getView().getModel("tasks");
      var aTasks = oModel.getProperty("/tasks");
      var iIndex = aTasks.indexOf(oContext.getObject());
      if (iIndex !== -1) {
        aTasks.splice(iIndex, 1);
        oModel.setProperty("/tasks", aTasks);
      }
    }

  });
});