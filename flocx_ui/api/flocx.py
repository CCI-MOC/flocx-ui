import os

import requests
from requests.compat import urljoin

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
    def try_and_except():
        try:
            return service_func()
        except requests.exceptions.RequestException as e:
            print(e)
            # TODO: handle errors

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
