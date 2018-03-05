/**
 * @ngdoc directive
 * @name patternfly.modals.componenet:pfModalOverlay
 *
 * @param {function} ng-click The on click even handler which invokes the Angular UI $uibModal service. the $uibModal
 * service only has one method open(options).
 * See the {@link https://angular-ui.github.io/bootstrap/#modal Angular UI modal} documentation for how to configure the modal.
 * At a minimum the Angular Patternfly implementation requires two options passed to $uibModal's open method:
 * <ul>
 *     <li>component: 'pfModalOverlay'</li>
 *     <li>resolve: {...}</li>
 * </ul>
 * The resolve contains all the members that will be resolved and passed to the controller as locals. Each member is
 * a function that returns the desired values. The pfModalOverlay controller expects the following members to render the modal:
 * <ul>
 *   <li>modalId - string  id of the modal</li>
 *   <li>modalTitle - string modal title displayed in its header</li>
 *   <li>titleId (optional) - string id of the title of the modal. Customizable so multiple modals can have unique ids.
 * Set to 'modalTitle' by default</li>
 *   <li>hideCloseIcon (optional) - boolean hide-close-icon Hides the 'x' close button, default is false</li>
 *   <li>modalBody - html string to display in the modal</li>
 *   <li>actionButtons - Array of button objects. Each button object can have the following properties:
 *      <ul style='list-style-type: none'>
 *        <li>.label      - the text to display on the button
 *        <li>.class      - (optional) classes to add to the button
 *        <li>.disabled   - (optional) boolean true if the button should be disabled by default
 *        <li>.close      - (optional) boolean true if the button should close the modal
 *        <li>.click      - (optional) user defined function to call when the button is clicked
 *      </ul>
 *   </li>
 * </ul>
 *
 * @description
 * The Modal Overlay pattern provides a way to quickly load and display important information to the user without navigating
 * away from the current page. It utilizes the {@link http://getbootstrap.com/docs/4.0/components/modal/ Bootstrap Modal}
 * and Patternfly styling. Use cases for Modal Overlays can vary a great deal, but some examples include the following:
 * <ul>
 * <li>To remind or prompt users
 * <li>To load dialogs that require user input before advancing
 * <li>To load tasks which require a user’s full attention, such as stepping through a wizard flow
 * <li>To present important information or warnings
 * </ul>
 *
 * @example
 <example module="patternfly.modals">

 <file name="index.html">
 <div ng-controller="DemoModalOverlayCtrl">
    <button class="btn btn-default" ng-click="open()">Launch first demo modal</button>
    <a role=button ng-click="open2()">Launch second demo modal</a>
 </div>
 </file>

 <file name="script.js">
 angular.module('patternfly.modals').controller('DemoModalOverlayCtrl', function( $scope, $uibModal, $log ) {
      $scope.modalId = "demoModal1";
      $scope.modalTitle = "First Demo Title";
      $scope.modalBody = '<form class="form-horizontal">' +
          '<div class="form-group">' +
            '<label class="col-sm-3 control-label" for="textInput">Field One</label>' +
            '<div class="col-sm-9"><input type="text" id="textInput" class="form-control"/></div>' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="col-sm-3 control-label" for="textInput2">Field Two</label>' +
            '<div class="col-sm-9"><input type="text" id="textInput2" class="form-control"/></div>' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="col-sm-3 control-label" for="textInput3">Field Three</label>' +
            '<div class="col-sm-9"><input type="text" id="textInput3" class="form-control"/></div>' +
          '</div>' +
         '</form>';
      $scope.actionButtons = [
          {
            label: "Cancel",
            close: true
          },
          {
            label: "Okay",
            class: "btn-primary customClass"
          }];

      $scope.open = function () {
        var modalInstance = $uibModal.open({
          component: 'pfModalOverlay',
          resolve : {
            modalId : function() {
              return $scope.modalId;
            },
            modalTitle : function () {
              return $scope.modalTitle;
            },
            modalBody : function() {
              return $scope.modalBody;
            },
            actionButtons : function() {
              return $scope.actionButtons;
            }
          }
        });

        modalInstance.result.then(function (returned){
          $log.info(returned);
        });
      };

      $scope.open2 = function () {
        var modalInstance = $uibModal.open({
          component: 'pfModalOverlay',
          resolve : {
            modalId : function() {
              return "demoModal2";
            },
            titleId : function() {
              return "demoTitle";
            },
            hideCloseIcon : function () {
              return true;
            },
            modalTitle : function () {
              return "Second Demo Title";
            },
            modalBody : function() {
              return '<div class="row">' +
                    '<div class="col-md-6">Donec consequat dignissim neque, sed suscipit quam egestas in. Fusce bibendum ' +
                      'laoreet lectus commodo interdum. Vestibulum odio ipsum, tristique et ante vel, iaculis placerat nulla. ' +
                      'Suspendisse iaculis urna feugiat lorem semper, ut iaculis risus tempus.</div>' +
                    '<div class="col-md-6">Donec consequat dignissim neque, sed suscipit quam egestas in. Fusce bibendum ' +
                      'laoreet lectus commodo interdum. Vestibulum odio ipsum, tristique et ante vel, iaculis placerat nulla. ' +
                      'Suspendisse iaculis urna feugiat lorem semper, ut iaculis risus tempus. ' +
                    '</div>';
            },
            actionButtons : function() {
              return [{
                        label: "Cancel",
                        close: true
                      },
                      {
                        label: "Test",
                        disabled: true
                      },
                      {
                        label: "OK",
                        class: "btn-primary"
                      }
                    ];
            }
          }
        });

        modalInstance.result.then(function (returned){
          $log.info(returned);
        });
      };
   });
 </file>

 </example>
 */
