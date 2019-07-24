import json
import os

from django.test import RequestFactory as DjangoRequestFactory
from horizon.utils.memoized import memoized
from openstack_dashboard.test import helpers as test

@memoized
def read_data_file():
    """Read the test data from test_data.json

    :return: The contents of the file as JSON
    """
    path = os.path.abspath('flocx_ui/test/tests/test_data.json')
    with open(path) as json_file:
        data = json.load(json_file)
        return data

def get_test_data(key):
    """Get the value at a given key in the test_data.json file

    :param key: The key that should be fetched
    :return: A JSON value
    """
    json_data = read_data_file()
    return json_data[key]

class MockResponse: # pylint: disable=too-few-public-methods
    """
    Class to mock the Response object returned by the requests python library

    Usage:

    response = MockResponse()
    response.content = '["json_content"]'

    This class is based on the requests.Response class
    """

    def __init__(self):
        self.content = None
        self.encoding = 'application/json'

    def json(self):
        """Get the JSON dict of the current content

        :raises JSONDecodeError: If the content is not valid JSON
        :return: self.content as JSON dict
        """
        return json.loads(self.content)

class RequestFactory:
    """
    Class to construct requests specifically for a horizon plugin

    Usage:

    rf = RequestFactory()
    request = rf.get('/path/')

    This class is based on the Django RequestFactory class
    """

    @staticmethod
    def generic(*args, **kwargs):
        """Handle constructing generic requests

        :return: The request
        """
        rf = DjangoRequestFactory()
        request = rf.generic(*args, HTTP_X_REQUESTED_WITH='XMLHttpRequest', **kwargs)
        request.user = test.user
        request.user.is_authenticated = True
        return request

    def get(self, *args, **kwargs):
        """Handle constructing get requests

        :return: The GET request
        """
        return self.generic('GET', *args, **kwargs)
