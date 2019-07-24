import json
from unittest import mock

from openstack_dashboard.test import helpers as test

from flocx_ui.api.flocx import * # pylint: disable=wildcard-import,unused-wildcard-import
from flocx_ui.test.tests.helpers import get_test_data, MockResponse

class RestApiTests(test.TestCase):
    @mock.patch('flocx_ui.api.flocx.get')
    def test_get_offers(self, mock_get):
        testData = get_test_data('offer_list_response')

        mock_response = MockResponse()
        string_data = json.dumps(testData)
        mock_response.content = string_data

        mock_get.return_value = mock_response

        output = offer_list()
        self.assertEqual(output, testData)
