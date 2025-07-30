sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "sap/m/MessageToast"
], function (Controller, JSONModel, MessageToast) {
  "use strict";

  return Controller.extend("demotodoappui.controller.MainView", {
    onInit: function () {
      // Initialize the JSON model with mock data
      var oModel = new JSONModel({
        taskList: []
      });
      this.getView().setModel(oModel, "tasks");
    },

    onAddTask: function () {
      var oView = this.getView();
      var oModel = oView.getModel("tasks");
      var aTasks = oModel.getProperty("/taskList");
      var sNewTask = oView.byId("taskInput").getValue().trim();

      if (!sNewTask) {
        MessageToast.show("Task cannot be empty!");
        return;
      }

      aTasks.push({
        task: sNewTask,
        completed: false
      });

      oModel.setProperty("/taskList", aTasks);
      oView.byId("taskInput").setValue("");
    },

    onDeleteTask: function () {
      var oView = this.getView();
      var oModel = oView.getModel("tasks");
      var aTasks = oModel.getProperty("/taskList");

      var aRemainingTasks = aTasks.filter(function (oTask) {
        return !oTask.completed;
      });

      oModel.setProperty("/taskList", aRemainingTasks);
    },

    onTaskComplete: function (oEvent) {
      var oItem = oEvent.getSource().getBindingContext("tasks").getObject();
      oItem.completed = oEvent.getParameter("selected");
      this.getView().getModel("tasks").refresh();
    },

    onMarkAllCompleted: function () {
      var oModel = this.getView().getModel("tasks");
      var aTasks = oModel.getProperty("/taskList");

      aTasks.forEach(function (oTask) {
        oTask.completed = true;
      });

      oModel.refresh();
    }
  });
});