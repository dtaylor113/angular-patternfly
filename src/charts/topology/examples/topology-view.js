/**
 * @ngdoc directive
 * @name patternfly.charts.component:pfTopology
 * @restrict E
 *
 * @description
 *   Component for rendering a topology chart.  Individual nodes and relationships can be represented with this view.
 *
 *   In addition; searching, filtering and label visibility is also supported.<br/>
 *
 * @param {object} items items to display in the topology chart, each is represented as an individual node.  The keys of this object are used in the relations attribute. The items should have a item.kind attribute, as well as the usual item.metadata and so on.:<br/>
 * <ul style='list-style-type: none'>
 * <li>.name    - name of the item the node represents
 * <li>.status  - optional status of the node (can be used to differentiate the circle color)
 * <li>.kind    - the kind of node
 * </ul>
 *
 * @param {object} relations the object containing all of the node relationships:<br/>
 * <ul style='list-style-type: none'>
 * <li>.source   - the key of the source node
 * <li>.target  -  the key of the target node
 * </ul>
 *
 * @param {object} icons The different icons to be used in the node representations
 * @param {object} selection The item to be selected
 * @param {object} force Optional. A D3 force layout to use instead of creating one by default. The force layout size will be updated, and layout will be started as appropriate.
 * @param {object} nodes The node configuration for the various types of nodes<br/>
 * @param {string} searchText Search text which is watched for changes and highlights the nodes matching the search text
 * @param {object} kinds The different kinds of nodes represented in the topology chart
 * @param {function (vertices, added) } chartRendered The argument will be D3 selection of elements that correspond to items. Each item has its data set to one of the items. The default implementation of this event sets the title from Kubernetes metadata and tweaks the look of for certain statuses. Use event.preventDefault() to prevent this default behavior.
 * @param {boolean} itemSelected A function that is dispatched when an item is selected (along with the node data associated with the function
 * @param {boolean} showLabels A watched boolean that determines whether or not lables should be displayed beneath the nodes
 * @param {function (node) } tooltipFunction A passed in tooltip function which can be used to overwrite the default tooltip behavior
 *
 * @example
 <example module="patternfly.charts">
 <file name="index.html">
 <div ng-controller="TopologyCtrl" class="container-topology">
 <pf-topology items="data.items" relations="data.relations" kinds="kinds" icons="data.icons" nodes="nodes" item-selected="itemSelected(item)" search-text="searchText" show-labels="showLabels" tooltip-function="tooltip(node)">
 </pf-topology>

 <div class="controls">
 <label id="selected"></label>

 <label>Search:
 <input type="text" name="input" ng-model="searchText">
 </label>

 <label>Show labels:
 <input type="checkbox" ng-model="showLabels">
 </label>
 <input type="button" ng-click="removeKind()" value="Remove Kind" />
 </div>
 </div>
 </file>

 <file name="script.js">
 angular.module( 'patternfly.charts' ).controller( 'TopologyCtrl', function( $scope, $rootScope ) {
    var index = 0;
    var datasets = [];

    function sink(dataset) {
      datasets.push(dataset);
    }

    sink({
      "items": {
        "ContainerManager10r20": {
          "name": "ocp-master.example.com",
          "kind": "ContainerManager",
          "miq_id": 10000000000020,
          "status": "Valid",
          "display_kind": "OpenshiftEnterprise"
        },
        "ContainerNode10r14": {
          "name": "ocp-master.example.com",
          "kind": "ContainerNode",
          "miq_id": 10000000000014,
          "status": "Ready",
          "display_kind": "Node"
        },
        "ContainerGroup10r240": {
          "name": "docker-registry-2-vrguw",
          "kind": "ContainerGroup",
          "miq_id": 10000000000240,
          "status": "Running",
          "display_kind": "Pod"
        },
        "Container10r235": {
          "name": "registry",
          "kind": "Container",
          "miq_id": 10000000000235,
          "status": "Running",
          "display_kind": "Container"
        },
        "ContainerReplicator10r56": {
          "name": "docker-registry-2",
          "kind": "ContainerReplicator",
          "miq_id": 10000000000056,
          "status": "OK",
          "display_kind": "Replicator"
        },
        "ContainerService10r61": {
          "name": "docker-registry",
          "kind": "ContainerService",
          "miq_id": 10000000000061,
          "status": "Unknown",
          "display_kind": "Service"
        },
      },
      "relations": [
        {
          "source": "ContainerManager10r20",
          "target": "ContainerNode10r14"
        }, {
          "source": "ContainerNode10r14",
          "target": "ContainerGroup10r240"
        }, {
          "source": "ContainerGroup10r240",
          "target": "Container10r235"
        }, {
          "source": "ContainerGroup10r240",
          "target": "ContainerReplicator10r56"
        }, {
          "source": "ContainerGroup10r240",
          "target": "ContainerService10r61"
        }, {
          "source": "ContainerNode10r14",
          "target": "ContainerGroup10r241"
        }, {
          "source": "ContainerGroup10r241",
          "target": "Container10r236"
        }, {
          "source": "ContainerGroup10r241",
          "target": "ContainerReplicator10r57"
        }
      ],
      "icons": {
        "AvailabilityZone": {
          "type": "glyph",
          "icon": "",
          "fontfamily": "PatternFlyIcons-webfont"
        },
        "ContainerReplicator": {
          "type": "glyph",
          "icon": "",
          "fontfamily": "PatternFlyIcons-webfont"
        },
        "ContainerGroup": {
          "type": "glyph",
          "icon": "",
          "fontfamily": "FontAwesome"
        },
        "ContainerNode": {
          "type": "glyph",
          "icon": "",
          "fontfamily": "PatternFlyIcons-webfont"
        },
        "ContainerService": {
          "type": "glyph",
          "icon": "",
          "fontfamily": "PatternFlyIcons-webfont"
        },
        "ContainerRoute": {
          "type": "glyph",
          "icon": "",
          "fontfamily": "PatternFlyIcons-webfont"
        },
        "Container": {
          "type": "glyph",
          "icon": "",
          "fontfamily": "FontAwesome"
        },
        "Host": {
  				"type": "glyph",
	  			"icon": "",
			  	"fontfamily": "PatternFlyIcons-webfont"
		  	},
		  	"Vm": {
          "type": "glyph",
          "icon": "",
          "fontfamily": "PatternFlyIcons-webfont"
        },
        "ContainerManager": {
          "type": "glyph",
          "icon": "",
          "fontfamily": "PatternFlyIcons-webfont"
        }
			},
    });

    $rootScope.data = datasets[index];

    var nodeKinds = {
			"ContainerReplicator": true,
			"ContainerGroup": true,
			"Container": true,
			"ContainerNode": true,
			"ContainerService": true,
			"Host": true,
			"Vm": true,
			"ContainerRoute": true,
			"ContainerManager": true
		};

		$rootScope.kinds = nodeKinds;

		var icons = $rootScope.data.icons;
    $scope.nodes = {};
		for(var kind in nodeKinds) {
		  var icon = icons[kind];
		  $scope.nodes[kind] = {
		    "name": kind,
		    "enabled": nodeKinds[kind],
		    "radius": 16,
		    "textX": 0,
		    "textY": 5,
		    "height": 18,
		    "width": 18,
		    "icon": icon.icon,
		    "fontFamily": icon.fontfamily
		  };
		}

    // Individual values can also be set for specific icons
    $scope.nodes.ContainerService.textY = 9;
    $scope.nodes.ContainerService.textX = -1;

    $scope.itemSelected = function (item) {
      var text = "";
      if (item) {
        text = "Selected: " + item.name;
      }
      angular.element(document.getElementById("selected")).text(text);
    };

    $scope.removeKind = function () {
      if($rootScope.kinds.ContainerNode) {
        delete $rootScope.kinds.ContainerNode;
      }
    };

    $scope.tooltip = function (node) {
      var status = [
        'Name: ' + node.item.name,
        'Type: ' + node.item.kind,
        'Status: ' + node.item.status
      ];
      return status;
    }
 });
 </file>
 </example>
 */
