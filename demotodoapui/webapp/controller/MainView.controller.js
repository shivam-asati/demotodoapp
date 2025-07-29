sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "sap/m/MessageToast"
], function (Controller, JSONModel, MessageToast) {
  "use strict";

  return Controller.extend("demotodoappui.controller.MainView", {
    onInit: function () {
      // Initialize JSON Model with mocked data
      var oData = {
        tasks: []
      };
      var oModel = new JSONModel(oData);
      this.getView().setModel(oModel, "tasks");
    },

    onAddTask: function () {
      var oView = this.getView();
      var oModel = oView.getModel("tasks");
      var aTasks = oModel.getProperty("/tasks");
      var sNewTask = oView.byId("taskInput").getValue();

      if (!sNewTask.trim()) {
        MessageToast.show("Please enter a task.");
        return;
      }

      // Add new task to the model
      aTasks.push({
        title: sNewTask,
        completed: false
      });

      oModel.setProperty("/tasks", aTasks);
      oView.byId("taskInput").setValue(""); // Clear input field
    },

    onTaskCompleted: function (oEvent) {
      var oListItem = oEvent.getSource().getParent();
      var oContext = oListItem.getBindingContext("tasks");
      var bCompleted = oEvent.getParameter("selected");

      // Update task completion status
      oContext.getModel().setProperty(oContext.getPath() + "/completed", bCompleted);
    },

    onDeleteTask: function (oEvent) {
      var oView = this.getView();
      var oModel = oView.getModel("tasks");
      var aTasks = oModel.getProperty("/tasks");

      // Get the task to delete
      var oListItem = oEvent.getSource().getParent();
      var oContext = oListItem.getBindingContext("tasks");
      var iIndex = oContext.getPath().split("/").pop();

      // Remove task from the array
      aTasks.splice(iIndex, 1);
      oModel.setProperty("/tasks", aTasks);
    }
  });
});