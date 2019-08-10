(function() {
  'use strict';

  angular
    .module('horizon.dashboard.project.flocx')
    .controller('NodeListController', NodeListController);

  NodeListController.$inject = [
    '$q',
    '$filter',
    'horizon.app.core.openstack-service-api.flocx',
    'horizon.app.core.openstack-service-api.ironic',
    'horizon.dashboard.project.flocx.create-offer.service'
  ];

  function NodeListController($q, $filter, flocx, ironic, createOfferService) {
    var ctrl = this;

    ctrl.createOffer = createOffer;
    ctrl.offers = [];
    ctrl.nodes = [];
    ctrl.merged = [];

    var utcToLocal = $filter('utcToLocal');

    init();

    /**
     * @description Open a modal that guides a user through creating an offer
     * @param {*} node The node data to be used as default values in the modal
     *
     * @returns {void}
     */
    function createOffer (node) {
      // Open the modal
      createOfferService.createOffer(node)
        .then(init); // Refresh the nodes and offers
    }

    function init () {
      var offersPromise = retrieveOffers();
      var nodesPromise = retrieveNodes();

      var promises = [offersPromise, nodesPromise];
      $q.all(promises).then(mergeOffersAndNodes);
    }

    /**
     * @description Get the list of offers from flocx-market
     *
     * @returns {promise} That resolves after the offers are fetched
     */
    function retrieveOffers () {
      return flocx.getOffers().then(onGetOffers);
    }

    function onGetOffers (offers) {
      ctrl.offers = offers;
    }

    /**
     * @description Get the list of nodes from the ironic-client
     *
     * @returns {promise} That resolves after the nodes are fetched
     */
    function retrieveNodes() {
      // Get the list of nodes form the ironic-client
      return ironic.getNodes().then(onGetNodes);
    }

    function onGetNodes (nodes) {
      ctrl.nodes = nodes;
    }

    /**
     * @description Merges offers and nodes into a shared structure that can be displayed
     *
     * @returns {void}
     */
    function mergeOffersAndNodes () {
      var merged = {};

      ctrl.nodes.forEach(function (node) {
        var convertedNode = convertNode(node);
        merged[node.uuid] = convertedNode;
      });

      ctrl.offers.forEach(function (offer) {
        var convertedOffer = convertOffer(offer);
        merged[convertedOffer.uuid] = convertedOffer;
      });

      ctrl.merged = Object.values(merged);
    }

    /**
     * @description Rounds a number to a multiple
     * @param {number} num The number to be rounded
     * @param {number} multiple The multiple that the number should be rounded tp
     *
     * @returns {number} The closest multiple to the number
     */
    function roundTo (num, multiple) {
      return Math.round(num / multiple) * multiple;
    }

    /**
     * @description Converts a node object into a shared data structure to be displayed
     * @param {object} node The given node
     *
     * @returns {object} The transformed object
     */
    function convertNode (node) {
      var cpus, memory, disk;

      if (node.properties) {
        if (node.properties.cpus) {
          cpus = node.properties.cpus;
        }
        if (node.properties.memory_mb) {
          var memoryGigbaytes = roundTo(+node.properties.memory_mb / 1000, 0.5);
          memory = memoryGigbaytes + ' GB';
        }
        if (node.properties.local_gb) {
          disk = node.properties.local_gb + ' GB';
        }
      }

      return {
        type: 'node',
        name: node.uuid,
        uuid: node.uuid,
        status: 'Not offered',
        cpus: cpus || '?',
        ram: memory || '?',
        disk: disk || '?',
        expires: 'N/A',
        properties: node.properties
      };
    }

    /**
     * @description Converts an offer object into a shared data structure to be displayed
     * @param {object} offer The given offer
     *
     * @returns {object} The transformed object
     */
    function convertOffer (offer) { // eslint-disable-line complexity
      var status, cpus, memory, disk, expires;

      if (offer.status) {
        status = offer.status.charAt(0).toUpperCase() + offer.status.slice(1);
      }
      if (offer.end_time) {
        expires = utcToLocal(offer.end_time, 'short');
      }

      if (offer.server_config && offer.server_config.properties) {
        var properties = offer.server_config.properties;
        if (properties.cpu_physical_count) {
          cpus = properties.cpu_physical_count;
        }
        if (properties.memory_gb) {
          memory = properties.memory_gb + ' GB';
        }
        var disks = properties.disks;
        if (disks && disks.length > 0) {
          disk = disks.reduce(function (sum, disk) {
            if (disk.size_gb) {
              sum += disk.size_gb;
              return sum;
            }
            return 0;
          }, 0);
          disk += ' GB';
        }
      }

      return {
        type: 'offer',
        name: offer.server_id,
        uuid: offer.server_id,
        status: status || '?',
        cpus: cpus || '?',
        ram: memory || '?',
        disk: disk || '?',
        expires: expires || '?'
      };
    }
  }
}());
