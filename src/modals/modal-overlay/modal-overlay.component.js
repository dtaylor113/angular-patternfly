angular.module('patternfly.modals')
  .component('pfModalOverlay', {
    bindings: {
      modalId: '=',
      titleId: "=?",
      hideCloseIcon: "<?",
      backdropClose: "<?",
      modalTitle: "=",
      isForm: "<?",
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

      // The ui-bootstrap modal only supports either template or templateUrl as a way to specify the content.
      // When the content is retrieved, it is compiled and linked against the provided scope by the $uibModal service.
      // Unfortunately, there is no way to provide transclusion there.
      //
      // The solution below embeds a placeholder directive (i.e., pfModalOverlayTransclude) to append the transcluded DOM.
      // The transcluded DOM is from a different location than the modal, so it needs to be handed over to the
      // placeholder directive. Thus, we're passing the actual DOM, not the parsed HTML.

      ctrl.open = function () {
        $uibModal.open({
          component: 'pfModalOverlayContent',
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
            modalBodyTemplate: function() {
              return ctrl.modalBodyTemplate;
            },
            modalBodyScope: function() {
              return ctrl.modalBodyScope;
            },
            actionButtons: function () {
              return ctrl.actionButtons;
            },
            isForm: function() {
              return ctrl.isForm;
            }
          }
        })
          .result.then(
          function () {
            ctrl.close(); // closed
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
      ctrl.isForm = ctrl.resolve.isForm;

      ctrl.ok = function (actionFn) {
        if (typeof actionFn === "function") {
          actionFn();
        }
        ctrl.close();
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
