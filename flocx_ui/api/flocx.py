import os

import requests
from requests.compat import urljoin
from openstack_dashboard.api.rest.utils import AjaxError

from dotenv import load_dotenv
load_dotenv(override=True)


DEFAULT_API_HOST = 'http://localhost'
DEFAULT_API_PORT = '8080'

HOST = os.getenv('DEFAULT_API_HOST', DEFAULT_API_HOST)
PORT = os.getenv('DEFAULT_API_PORT', DEFAULT_API_PORT)
BASE_URL = HOST + ':' + PORT

def get(path):
    """An alias for requests.get with the BASE_URL

    :param path: A url path
    :return: A request for a given path
    """
    return requests.get(urljoin(BASE_URL, path))

def handle_error(service_func):
    """A decorator for service functions to handle Request exceptions elegantly

    :param service_func: The function to be wrapped
    :raises AjaxError: An AjaxError will be thrown and will automatically
        report it to the openstack_dashboard api (see flocx_rest_api.py > rest_utils)
    :return: The decorated function
    """
    def try_and_except():
        try:
            return service_func()
        except requests.exceptions.RequestException as e:
            print(e)
            raise AjaxError(500, 'Internal Server Error')

    return try_and_except

@handle_error
def offer_list():
    """Retrieve a list of offers

    :param request: HTTP request
    :return A list of offers
    """

    r = get('/offer')
    data = r.json()
    return data
