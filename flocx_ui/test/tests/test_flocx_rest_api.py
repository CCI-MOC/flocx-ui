from unittest import mock

from openstack_dashboard.test import helpers as test

from flocx_ui.api.flocx_rest_api import Offer as OfferAPI
from flocx_ui.test.tests.helpers import get_test_data, RequestFactory

class RestApiTests(test.TestCase):
    @mock.patch('flocx_ui.api.flocx.offer_list')
    def test_get_offers(self, mock_offer_list):
        testData = get_test_data('offer_list_response')
        mock_offer_list.return_value = testData

        rf = RequestFactory()
        request = rf.get('/api/flocx/offer/')

        offerAPI = OfferAPI()
        response = offerAPI.get(request)
        self.assertEqual(response.json, testData)
