angular.module('patternfly.modals').component('pfModalOverlay', {
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  },
  templateUrl: 'modals/modal-overlay/modal-overlay.html',
  controller: function ($sce) {
    'use strict';

    var ctrl = this;

    ctrl.$onInit = function () {
      ctrl.modalId = ctrl.resolve.modalId;
      ctrl.titleId = ctrl.resolve.titleId || "modalTitle";
      ctrl.modalTitle = ctrl.resolve.modalTitle;
      ctrl.hideCloseIcon = ctrl.resolve.hideCloseIcon || false;
      ctrl.modalBody = ctrl.resolve.modalBody;
      ctrl.actionButtons = ctrl.resolve.actionButtons;

      ctrl.trustAsHtml = function (html) {
        return $sce.trustAsHtml(html);
      };

      ctrl.ok = function () {
        ctrl.close({$value: "ok"});
      };

      ctrl.cancel = function () {
        ctrl.dismiss({$value: 'cancel'});
      };
    };

  }
});
