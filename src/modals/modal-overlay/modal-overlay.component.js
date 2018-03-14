angular.module('patternfly.modals')
  .component('pfModalOverlay', {
    bindings: {
      modalId: '=',
      titleId: "=?",
      hideCloseIcon: "<?",
      backdropClose: "<?",
      modalTitle: "=",
      modalBodyTemplate: "=",
      modalBodyScope: "=?",
      actionButtons: "<",
      close: "&onClose",
      isOpen: '<?'
    },
    templateUrl: 'modals/modal-overlay/modal-overlay.html',
    controller: function ( $uibModal ) {
      'use strict';

      var ctrl = this;

      ctrl.open = function () {
        $uibModal.open({
          component: 'pfModalOverlayContent',
          //templateUrl: 'modals/modal-overlay/modal-overlay.html',
          //controller: 'pfModalInstanceCtrl',
          //controllerAs: 'ctrl',
          //bindToController: true,
          backdrop: ctrl.backdropClose ? true : 'static',
          resolve: {
            modalId: function () {
              return ctrl.modalId;
            },
            titleId: function () {
              return ctrl.titleId || "modalTitle";
            },
            hideCloseIcon: function () {
              return ctrl.hideCloseIcon;
            },
            modalTitle: function () {
              return ctrl.modalTitle;
            },
            modalBodyTemplate : function () {
              return ctrl.modalBodyTemplate;
            },
            modalBodyScope : function () {
              return ctrl.modalBodyScope;
            },
            actionButtons: function () {
              return ctrl.actionButtons;
            }
          }
        })
          .result.then(function (modalBodyScope) {
            ctrl.close(modalBodyScope); // closed
          },
          function () {
            ctrl.close(); // dismissed
          }
        );
      };

      ctrl.$onInit = function () {
        if (ctrl.isOpen === undefined) {
          ctrl.isOpen = false;
        }
      };

      ctrl.$onChanges = function (changesObj) {
        if (changesObj.isOpen && changesObj.isOpen.currentValue === true) {
          ctrl.open();
        }
      };
    }
  });

angular.module('patternfly.modals').controller('pfModalInstanceCtrl',
  function ($uibModalInstance,
            modalId,
            titleId,
            hideCloseIcon,
            modalTitle,
            modalBodyTemplate,
            modalBodyScope,
            actionButtons) {
    'use strict';
    var ctrl = this;

    ctrl.modalId = modalId;
    ctrl.titleId = titleId || "modalTitle";
    ctrl.modalTitle = modalTitle;
    ctrl.hideCloseIcon = hideCloseIcon || false;
    ctrl.modalBodyTemplate = modalBodyTemplate;
    ctrl.modalBodyScope = modalBodyScope;
    ctrl.actionButtons = actionButtons;

    ctrl.ok = function (modalBodyScope) {
      $uibModalInstance.close(modalBodyScope);
    };

    ctrl.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  });

angular.module('patternfly.modals').component('pfModalOverlayContent', {
  templateUrl: 'modal-overlay-template.html',
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  },
  controller: function () {
    'use strict';
    var ctrl = this;

    ctrl.$onInit = function () {
      ctrl.modalId = ctrl.resolve.modalId;
      ctrl.titleId = ctrl.resolve.titleId || "modalTitle";
      ctrl.modalTitle = ctrl.resolve.modalTitle;
      ctrl.hideCloseIcon = ctrl.resolve.hideCloseIcon || false;
      ctrl.modalBodyTemplate = ctrl.resolve.modalBodyTemplate;
      ctrl.modalBodyScope = ctrl.resolve.modalBodyScope;
      ctrl.actionButtons = ctrl.resolve.actionButtons;

      ctrl.ok = function (actionFn) {
        if (typeof actionFn === "function") {
          actionFn(ctrl.modalBodyScope);
        }
        ctrl.close(ctrl.modalBodyScope);
      };

      ctrl.cancel = function (actionFn) {
        if (typeof actionFn === "function") {
          actionFn();
        }
        ctrl.dismiss({$value: 'cancel'});
      };
    };

  }
});
