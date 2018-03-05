describe('Component: pfModalOverlay', function () {
  var $scope;
  var $compile;
  var $uibModal;
  var modalInstance;

  // load the controller's module
  beforeEach(module(
    'patternfly.modals',
    'modals/modal-overlay/modal-overlay.html'
  ));

  beforeEach(inject(function (_$compile_, _$rootScope_, _$uibModal_) {
    $compile = _$compile_;
    $scope = _$rootScope_;
    $uibModal = _$uibModal_;
  }));

  var compileHtml = function (markup, scope) {
    var element = angular.element(markup);
    $compile(element)(scope);
    scope.$digest();
    return element;
  };

  var closeModal = function (scope) {
    modalInstance.close();

    // Although callbacks are executed properly, the modal is not removed in this
    // environment -- must remove it manually to mimic UI Bootstrap.
    var modal = $("#testModal");
    if (modal) {
      modal.remove();
    }
    var modalBackdrop = angular.element(document.querySelector('.modal-backdrop'));
    if (modalBackdrop) {
      modalBackdrop.remove();
    }

    scope.$digest();
  };

  beforeEach(function () {
    $scope.open = function () {
      modalInstance = $uibModal.open({
        animation: true,
        component: 'pfModalOverlay',
        resolve : {
          modalId : function() {
            return "testModal";
          },
          modalTitle : function () {
            return "Test Title";
          },
          modalBody : function() {
            return "<div>Test Html</div>";
          },
          actionButtons : function() {
            return [
              {
                label: "Cancel",
                close: true
              },
              {
                label: "Save",
                class: "btn-primary customClass"
              }];
          }
        }
      });
    };

    $scope.open2 = function () {
      modalInstance = $uibModal.open({
        animation: true,
        component: 'pfModalOverlay',
        resolve : {
          modalId : function() {
            return "testModal";
          },
          titleId : function() {
            return "testTitle";
          },
          hideCloseIcon : function () {
            return true;
          },
          modalTitle : function () {
            return "Test Title";
          },
          modalBody : function() {
            return '<div>Test Html</div>';
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
              label: "Save",
              class: "btn-primary"
            }];
          }
        }
      });
    };
  });

  it('should open the modal with button click', function () {
    var element = compileHtml('<button id="testButton" ng-click="open()">Test</button>', $scope),
      modal$;
    modal$ = $('#testModal');
    expect(modal$.length).toBe(0);
    eventFire(element[0], 'click');
    modal$ = $('#testModal');
    expect(modal$.length).toBe(1);
    closeModal($scope);
  });

  it('should set the id of the modal', function () {
    var element = compileHtml('<button id="testButton" ng-click="open()">Test</button>', $scope),
      modal$;
    eventFire(element[0], 'click');
    modal$ = $('#testModal');
    expect(modal$.length).toBe(1);
    closeModal($scope);
  });

  it('should open the about modal programmatically', function () {
    var modal$ = $('#testModal');
    expect(modal$.length).toBe(0);
    $scope.open();
    $scope.$digest();
    modal$ = $('#testModal');
    expect(modal$.length).toBe(1);
    closeModal($scope);
  });

  it('should set the title of the modal', function () {
    var element = compileHtml('<button id="testButton" ng-click="open()">Test</button>', $scope);
    eventFire(element[0], 'click');
    var title = $('.modal-header .modal-title').text();
    expect(title).toBe('Test Title');
    closeModal($scope);
  });

  it('should set the title id to "modalTitle" if none specified', function () {
    var element = compileHtml('<button id="testButton" ng-click="open()">Test</button>', $scope);
    eventFire(element[0], 'click');
    var title = $('#modalTitle');
    expect(title.length).toBe(1);
    closeModal($scope);
  });

  it('should set the title id when specified', function () {
    var element = compileHtml('<button id="testButton" ng-click="open2()">Test</button>', $scope);
    eventFire(element[0], 'click');
    var title = $('#testTitle');
    expect(title.length).toBe(1);
    closeModal($scope);
  });

  it('should show the "x" close icon by default', function () {
    var element = compileHtml('<button id="testButton" ng-click="open()">Test</button>', $scope);
    eventFire(element[0], 'click');
    var closeButton = $('button.close');
    expect(closeButton.length).toBe(1);
    closeModal($scope);
  });

  it('should close the modal when "x" close icon is clicked', function () {
    var element = compileHtml('<button id="testButton" ng-click="open()">Test</button>', $scope);
    eventFire(element[0], 'click');
    var modal$ = $('#testModal');
    expect(modal$.length).toBe(1);
    var closeButton = $('button.close')[0];
    eventFire(closeButton, 'click');
    $scope.$digest();
    modal$ = $('#testModal');
    expect(modal$.length).toBe(0);
  });

  it('should hide the close icon when hide-close-icon set to true', function () {
    var element = compileHtml('<button id="testButton" ng-click="open2()">Test</button>', $scope);
    eventFire(element[0], 'click');
    var closeButton = $('button.close');
    expect(closeButton.length).toBe(0);
    closeModal($scope);
  });

  it('should set the html in the body of the modal to <div>Test Html</div>', function () {
    var element = compileHtml('<button id="testButton" ng-click="open()">Test</button>', $scope);
    eventFire(element[0], 'click');
    var body = $('.modal-body').html();
    expect(body).toBe("<div>Test Html</div>");
    closeModal($scope);
  });

  it('should display 3 buttons', function() {
    var element = compileHtml('<button id="testButton" ng-click="open2()">Test</button>', $scope);
    eventFire(element[0], 'click');
    var buttons = $('button.btn');
    expect(buttons.length).toBe(3);
    closeModal($scope);
  });

  it('should display "Cancel" on the first button', function() {
    var element = compileHtml('<button id="testButton" ng-click="open2()">Test</button>', $scope);
    eventFire(element[0], 'click');
    var cancelButton = $('button.btn')[0];
    expect($(cancelButton).html()).toBe("Cancel");
    closeModal($scope);
  });

  it('should disable second button', function() {
    var element = compileHtml('<button id="testButton" ng-click="open2()">Test</button>', $scope);
    eventFire(element[0], 'click');

    var cancelButton = $('button.btn')[0];
    expect($(cancelButton).is(":disabled")).toBe(false);

    var disabledButton = $('button.btn')[1];
    expect($(disabledButton).is(":disabled")).toBe(true);
    closeModal($scope);
  });

  it('should apply btn-primary class to third button', function() {
    var element = compileHtml('<button id="testButton" ng-click="open2()">Test</button>', $scope);
    eventFire(element[0], 'click');

    var disabledButton = $('button.btn')[1];
    expect($(disabledButton).hasClass("btn-primary")).toBe(false);

    var thirdButton = $('button.btn')[2];
    expect($(thirdButton).hasClass("btn-primary")).toBe(true);
    closeModal($scope);
  });

  it('should dismiss modal when clicking "Cancel"', function() {
    var element = compileHtml('<button id="testButton" ng-click="open2()">Test</button>', $scope);
    eventFire(element[0], 'click');

    var firstButton$ = $($('button.btn')[0]);
    firstButton$.click();
    $scope.$digest();
    var modal$ = $('#testModal');
    expect(modal$.length).toBe(0);
  });

  it('should close modal when clicking "Ok"', function() {
    var element = compileHtml('<button id="testButton" ng-click="open2()">Test</button>', $scope);
    eventFire(element[0], 'click');

    var thirdButton$ = $($('button.btn')[2]);
    thirdButton$.click();
    $scope.$digest();
    var modal$ = $('#testModal');
    expect(modal$.length).toBe(0);
  });
});
