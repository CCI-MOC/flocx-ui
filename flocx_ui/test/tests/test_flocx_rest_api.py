import json
from unittest import mock

from openstack_dashboard.test import helpers as test

from flocx_ui.api import flocx_rest_api as api
from flocx_ui.test.tests.helpers import get_test_data, RequestFactory

class RestApiTests(test.TestCase):
    """
    Rest API tests ensure that service endpionts call the correct
    flocx service methods and that validation of certain data from
    the endpoints are in fact validated and will error correctly.
    """
    @mock.patch('flocx_ui.api.flocx_market.offer_list')
    def test_get_offers(self, mock_offer_list):
        """
        Getting the /api/flocx/offer/ endpoint should return a
        list of offers from the flocx service method
        """
        testData = get_test_data('offer_list')
        mock_offer_list.return_value = testData

        rf = RequestFactory()
        request = rf.get('/api/flocx/offer/')

        offersAPI = api.Offers()
        response = offersAPI.get(request)
        self.assertEqual(response.json, testData)

    @mock.patch('flocx_ui.api.flocx_provider.offer_create')
    def test_create_offer(self, mock_offer_create):
        testData = get_test_data('provider_offer')
        mock_offer_create.return_value = testData

        rf = RequestFactory()
        request = rf.post('/api/flocx/offer/',
                          data=json.dumps(testData),
                          content_type='application/json')

        offersAPI = api.Offers()
        response = offersAPI.post(request)
        self.assertEqual(response.json, testData)

    @mock.patch('flocx_ui.api.flocx_market.offer_get')
    def test_get_offer(self, mock_offer_get):
        testData = get_test_data('offer')
        mock_offer_get.return_value = testData
        offer_id = 'uuid'

        rf = RequestFactory()
        request = rf.get('/api/flocx/offer/{}'.format(offer_id))

        offerAPI = api.Offer()
        response = offerAPI.get(request, offer_id)
        self.assertEqual(response.json, testData)

    @mock.patch('flocx_ui.api.flocx_market.bid_list')
    def test_get_bids(self, mock_bid_list):
        testData = get_test_data('bid_list')
        mock_bid_list.return_value = testData

        rf = RequestFactory()
        request = rf.get('/api/flocx/bid/')

        bidsAPI = api.Bids()
        response = bidsAPI.get(request)
        self.assertEqual(response.json, testData)

    @mock.patch('flocx_ui.api.flocx_market.contract_list')
    def test_get_contracts(self, mock_contract_list):
        testData = get_test_data('contract_list')
        mock_contract_list.return_value = testData

        rf = RequestFactory()
        request = rf.get('/api/flocx/contract/')

        contractsAPI = api.Contracts()
        response = contractsAPI.get(request)
        self.assertEqual(response.json, testData)
