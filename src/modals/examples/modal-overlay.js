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
 <div ng-controller="DemoModalOverlayCtrl">
    <button ng-click="open()" class="btn btn-default">Launch Modal Overlay</button>
    <pf-modal-overlay is-open="isOpen"
          on-close="onClose()"
          modal-id="modalId"
          modal-title="modalTitle"
          action-buttons="actionButtons"
          is-form="isForm">
       <ng-form name="demoForm" class="form-horizontal">
         <div class="form-group" ng-init="setForm(demoForm)">
           <label class="col-sm-3 control-label required-pf" for="textInput">Field One</label>
           <div class="col-sm-9">
              <input type="text" id="textInput" class="form-control" ng-model="inputs.first" ng-required="true"/>
           </div>
         </div>
         <div class="form-group">
           <label class="col-sm-3 control-label" for="textInput2">Field Two</label>
           <div class="col-sm-9">
              <input type="text" id="textInput2" class="form-control" ng-model="inputs.second"/>
           </div>
         </div>
         <div class="form-group">
           <label class="col-sm-3 control-label" for="textInput3">Field Three</label>
           <div class="col-sm-9">
              <input type="text" id="textInput3" class="form-control" ng-model="inputs.third"/>
           </div>
         </div>
       </ng-form>
    </pf-modal-overlay>

   <button ng-click="open2()" class="btn btn-default">Launch Second Modal Overlay</button>
   <pf-modal-overlay is-open="isOpen2"
         on-close="onClose2()"
         modal-id="modalId2"
         modal-title="modalTitle2"
         hide-close-icon="hideCloseIcon2"
         backdrop-close="backdropClose"
         title-id="titleId2"
         action-buttons="actionButtons2">
       <div class="row">
          <div class="col-md-12">Donec consequat dignissim neque, sed suscipit quam egestas in. Fusce bibendum laoreet lectus commodo interdum. Vestibulum odio ipsum, tristique et ante vel, iaculis placerat nulla. Suspendisse iaculis urna feugiat lorem semper, ut iaculis risus tempus.</div>
       </div>
    </pf-modal-overlay>
   <div>
      <label class="actions-label">Actions: </label>
   </div>
   <div>
      <textarea rows="3">{{actionsText}}</textarea>
   </div>
 </div>
 </file>

 <file name="script.js">
 angular.module('patternfly.modals').controller('DemoModalOverlayCtrl', function( $scope ) {

      // first example
      $scope.inputs = {
        first: "",
        second: "test",
        third: ""
      };
      $scope.actionsText = "";
      $scope.setForm = function(form) {
        $scope.demoForm = form;
      }

      $scope.isForm = true;
      $scope.open = function () {
          $scope.isOpen = true;
       };
      $scope.onClose = function() {
          $scope.isOpen = false;
       };

      $scope.modalId = "demoModal1";
      $scope.modalTitle = "First Demo Title";
      $scope.actionButtons = [
          {
            label: "Cancel",
            isCancel: true,
            actionFn: function() {
              $scope.actionsText = "Cancel clicked\n" + $scope.actionsText;
            }
          },
          {
            label: "Save",
            class: "btn-primary custom-class",
            actionFn: function() {
                $scope.actionsText = "Save clicked" +
                    "\nFirst Field: " + $scope.inputs.first +
                    "\nSecond Field: " + $scope.inputs.second +
                    "\nThird Field: " + $scope.inputs.third +
                    "\n" + $scope.actionsText;
            }
          }];

      // second example
      $scope.open2 = function () {
          $scope.isOpen2 = true;
       };
      $scope.onClose2 = function() {
          $scope.isOpen2 = false;
       };

      $scope.modalId2 = "demoModal2";
      $scope.modalTitle2 = "Second Demo Title";
      $scope.titleId2 = "demoTitle2";
      $scope.hideCloseIcon2 = true;
      $scope.backdropClose = true;
      $scope.actionButtons2 = [
          {
            label: "Cancel",
            isCancel: true,
            actionFn: function() {
              $scope.actionsText = "Second Cancel clicked\n" + $scope.actionsText;
            }
          },
          {
            label: "OK",
            class: "btn-primary",
            actionFn: function() {
              $scope.actionsText = "OK clicked\n" + $scope.actionsText;
            }
          }];
 });

 </file>
 </example>
 */
