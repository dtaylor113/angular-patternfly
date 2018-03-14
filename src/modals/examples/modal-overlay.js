/**
 * @ngdoc directive
 * @name patternfly.modals.componenet:pfModalOverlay
 * @element pfModalOverlay
 * @restrict E
 *
 * @description
 * The Modal Overlay pattern provides a way to quickly load and display important information to the user without navigating
 * away from the current page. It utilizes the {@link https://angular-ui.github.io/bootstrap/#modal Angular UI modal}
 * and Patternfly styling. Use cases for Modal Overlays can vary a great deal, but some examples include the following:
 * <ul>
 * <li>To remind or prompt users
 * <li>To load dialogs that require user input before advancing
 * <li>To load tasks which require a user’s full attention, such as stepping through a wizard flow
 * <li>To present important information or warnings
 * </ul>
 *
 * @param {boolean} isOpen Flag indicating that the modal should be opened
 * @param {function} onClose Function to call when the modal is closed
 * @param {string} modalId Id of the modal
 * @param {string} modalBodyPath The path to the html template to populate the modal body
 * @param {string} modalTitle The title of the modal displayed in the header
 * @param {string=} titleId Id of the title. "modalTitle" by default
 * @param {boolean=} hideCloseIcon Flag indicating that the modal should hide the 'x' close icon.
 * @param {boolean=} backdropClose Flag indicating that the modal should close if user clicks background. False by default
 * @param {array} actionButtons array of button objects. Each button can have the following properties:<br/>
 * <ul style='list-style-type: none'>
 * <li>.label        - the text to display on the button
 * <li>.class        - (optional) classes to add to the button
 * <li>.actionFn     - (optional) use defined function to call when the button is clicked
 * <li>.isDisabled   - (optional) boolean true if the button should be disabled by default
 * <li>.isCancel     - (optional) boolean true is the button should cancel and dismiss the modal
 * </ul>
 *
 * @example
 <example module="patternfly.modals">

 <file name="index.html">
 <div ng-controller="DemoModalOverlayCtrl" class="example-container">
    <button ng-click="openForm()" class="btn btn-default">Launch Modal Overlay w/ Form</button>
    <pf-modal-overlay is-open="isFormOpen"
        on-close="onClose()"
        modal-id="modalFormId"
        modal-body-template="modalFormTemplate"
        modal-body-scope="modalFormScope"
        modal-title="modalFormTitle"
        action-buttons="formActionButtons">
    </pf-modal-overlay>

    <button ng-click="openConfirm()" class="btn btn-default">Launch Confirm Overlay</button>
    <pf-modal-overlay is-open="isConfirmOpen"
        on-close="onClose()"
        modal-id="modalConfirmId"
        modal-body-template="modalConfirmTemplate"
        modal-title="modalConfirmTitle"
        action-buttons="confirmActionButtons">
    </pf-modal-overlay>

    <div class="col-md-12">
      <label class="actions-label">Actions: </label>
    </div>
    <div class="col-md-12">
      <textarea rows="10" class="col-md-12">{{actionsText}}</textarea>
    </div>
 </div>
 <script type="text/ng-template" id="demo-confirm.html">
   <div class="row">
     <div class="col-md-12">Are you really, really, reeaaally sure you want to continue?</div>
   </div>
 </script>
  </file>

 <file name="script.js">
 angular.module('patternfly.modals').controller('DemoModalOverlayCtrl', function( $scope, $log ) {

      // first example
      $scope.openForm = function () {
        $scope.isFormOpen = true;
      };
      $scope.openConfirm = function () {
        $scope.isConfirmOpen = true;
      };
      $scope.onClose = function(modalBodyScope) {
          $scope.isConfirmOpen = false;
          $scope.isFormOpen = false;
       };

      $scope.modalFormId = "formModal";
      $scope.modalFormTitle = "Form Modal Demo";
      $scope.modalFormTemplate = 'modals/examples/demo-form.html';
      $scope.modalFormScope = {
        isForm: true,
        fieldOneVal:   "field one value",
        fieldTwoVal:   "field two value",
        fieldThreeVal: "field three value"
      }

      $scope.modalConfirmId = "confirmModal";
      $scope.modalConfirmTitle = "Confirm Modal Demo";
      $scope.modalConfirmTemplate = 'demo-confirm.html';
      $scope.confirmActionButtons = [
        {
          label: "Cancel",
          isCancel: true
        },
        {
          label: "Ok",
          class: "btn-primary custom-class",
          actionFn: function() {
            $scope.actionsText = 'Ok clicked\n' + $scope.actionsText;
          }
        }
      ];

      $scope.actionsText = "";

      $scope.formActionButtons = [
        {
          label: "Cancel",
          isCancel: true
        },
        {
          label: "Save",
          class: "btn-primary custom-class",
          actionFn: function(modalBodyScope) {
            $scope.actionsText = 'Save clicked.  Form Values are: \n' + JSON.stringify(modalBodyScope, null, ' ') + '\n' + $scope.actionsText;
          }
        }
      ];
 });

 </file>
 </example>
 */
