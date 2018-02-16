angular.module('patternfly.datepicker').component('pfBootstrapDatepicker', {
  bindings: {},
  templateUrl: 'datepicker/datepicker.html',
  controller: function () {
    'use strict';

    var ctrl = this;
    ctrl.$onInit = function () {
      ctrl.dt = new Date();
      ctrl.format = "dd-MMMM-yyyy";
      ctrl.showButtonBar = false;
      ctrl.dateOptions = {
        showWeeks : false
      };
      ctrl.open = function() {
        ctrl.isOpen = true;
      };
      ctrl.isOpen = false;
    };
  }
});
