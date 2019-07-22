import os

import requests
from requests.compat import urljoin
from openstack_dashboard.api.rest.utils import AjaxError

from dotenv import load_dotenv
from flocx_ui.api import schema

load_dotenv(override=True)

DEFAULT_API_HOST = 'http://localhost'
DEFAULT_API_PORT = '8081'

HOST = os.getenv('FLOCX_API_HOST', DEFAULT_API_HOST)
PORT = os.getenv('FLOCX_API_PORT', DEFAULT_API_PORT)
BASE_URL = HOST + ':' + PORT

def get(path):
    """An alias for requests.get with the BASE_URL

    :param path: A url path
    :return: A request for a given path
    """
    return requests.get(urljoin(BASE_URL, path))

def post(path, json=None):
    """An alias for requests.post with the BASE_URL

    :param path: A url path
    :return: A request for a given path
    """
    return requests.post(urljoin(BASE_URL, path), None, json)

def offer_list():
    """Retrieve a list of offers

    :param request: HTTP request
    :return A list of offers
    """

    r = get('/offer')
    data = r.json()
    return data

def offer_create(offer):
    """Create an offer

    :param offer: The offer to be created
    :raises AjaxError: If the offer param is invalid
    :return: The offer that was created
    """
    if not schema.validate_offer(offer, return_boolean=True):
        raise AjaxError(400, 'Invalid or insufficient input parameters. Cannot create offer.')
    r = post('/offer', offer)
    data = r.json()
    return data

def offer_get(offer_id):
    if not schema.validate_uuid(offer_id, return_boolean=True):
        raise AjaxError(400, 'Invalid Offer id.')
    r = get('/offer/%r')
    data = r.json()
    return data
