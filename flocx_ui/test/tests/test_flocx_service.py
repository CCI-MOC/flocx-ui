import json
from unittest import mock

from openstack_dashboard.test import helpers as test
from openstack_dashboard.api.rest.utils import AjaxError

from flocx_ui.api import flocx_market
from flocx_ui.api import flocx_provider
from flocx_ui.test.tests.helpers import get_test_data, MockResponse

mock_request = test.TestCase.mock_rest_request()
mock_request.user.token.id = 'auth_token'

class ServiceTests(test.TestCase):
    @mock.patch('flocx_ui.api.flocx_market.get')
    def test_get_offers(self, mock_get):
        testData = get_test_data('offer_list')

        mock_response = MockResponse()
        string_data = json.dumps(testData)
        mock_response.content = string_data

        mock_get.return_value = mock_response

        output = flocx_market.offer_list(mock_request)
        self.assertEqual(output, testData)

    @mock.patch('flocx_ui.api.flocx_provider.post')
    def test_create_offer(self, mock_post):
        testOffer = get_test_data('provider_offer')
        testOfferBytes = str.encode(json.dumps(testOffer))

        mock_response = MockResponse()
        string_data = json.dumps(testOffer)
        mock_response.status_code = 201
        mock_response.content = string_data

        mock_post.return_value = mock_response

        output = flocx_provider.offer_create(mock_request, testOfferBytes)
        self.assertEqual(output, testOffer)

    def test_create_invalid_offer(self):
        testOffer = get_test_data('invalid_offer')
        testOfferBytes = str.encode(json.dumps(testOffer))

        try:
            flocx_provider.offer_create(mock_request, testOfferBytes)
            self.fail() # Above code should fail
        except AjaxError as err:
            status_code, msg = err.http_status, str(err)
            self.assertEqual(status_code, 400)
            self.assertEqual(msg, 'Invalid or insufficient input parameters. Cannot create offer.')

    @mock.patch('flocx_ui.api.flocx_market.get')
    def test_get_offer(self, mock_get):
        testOffer = get_test_data('offer')
        testId = 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee' # Some random uuid

        mock_response = MockResponse()
        string_data = json.dumps(testOffer)
        mock_response.status_code = 200
        mock_response.content = string_data

        mock_get.return_value = mock_response

        output = flocx_market.offer_get(mock_request, testId)
        self.assertEqual(output, testOffer)

    def test_get_offer_invalid_id(self):
        invalid_offer_id = 'invalid_offer'
        try:
            flocx_market.offer_get(mock_request, invalid_offer_id)
            self.fail() # Above code should fail
        except AjaxError as err:
            status_code, msg = err.http_status, str(err)
            self.assertEqual(status_code, 400)
            self.assertEqual(msg, 'Invalid Offer id.')

    @mock.patch('flocx_ui.api.flocx_market.get')
    def test_get_contracts(self, mock_get):
        testData = get_test_data('contract_list')

        mock_response = MockResponse()
        string_data = json.dumps(testData)
        mock_response.content = string_data

        mock_get.return_value = mock_response

        output = flocx_market.contract_list(mock_request)
        self.assertEqual(output, testData)
