import os
import json

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

def generic_request(method, path, **kwargs):
    """An alias for requests.request with the BASE_URL.

    :param path: A url path
    :param **kwargs: The keyword arguments defined below as well
        as any additional arguments to be passed to the
        requests.request call
    :return: A request for the given path

    :Keyword Arguments:
        * token:
            A token to be put into the X-Auth-Token header of the request
    """

    auth_token = kwargs.pop('token', None)
    if auth_token:
        headers = kwargs.pop('headers', {})
        headers['X-Auth-Token'] = auth_token
        kwargs['headers'] = headers

    return requests.request(method, urljoin(BASE_URL, path), **kwargs)

def get(path, **kwargs):
    """An alias for requests.get with the BASE_URL

    :param path: A url path
    :param **kwargs: The keyword arguments to be passedto the request function
    :return: A request for the given path
    """
    return generic_request('GET', path, **kwargs)

def post(path, **kwargs):
    """An alias for requests.post with the BASE_URL

    :param path: A url path
    :param **kwargs: The keyword arguments to be passedto the request function
    :return: A request for the given path
    """
    return generic_request('POST', urljoin(BASE_URL, path), **kwargs)

def offer_list(request):
    """Retrieve a list of offers

    :param request: HTTP request
    :return A list of offers
    """

    response = get('/offer', token=request.user.token.id)
    data = response.json()
    return data

def offer_create(request, offer_bytes):
    """Create an offer

    :param offer_bytes: The offer to be created
    :param request: HTTP request
    :raises AjaxError: If the offer param is invalid
    :return: The offer that was created
    """
    offer = json.loads(offer_bytes.decode('UTF-8'))
    if not schema.validate_offer(offer, return_boolean=True):
        raise AjaxError(400, 'Invalid or insufficient input parameters. Cannot create offer.')
    response = post('/offer', json=offer, token=request.user.token.id)
    data = response.json()
    return data

def offer_get(request, offer_id):
    """Get an offer

    :param offer_id: The offer id used to get the offer details
    :param request: HTTP request
    :raises AjaxError: If the offer_id is invalid
    :return: The offer associated with the offer_id
    """
    if not schema.validate_uuid(offer_id, return_boolean=True):
        raise AjaxError(400, 'Invalid Offer id.')
    response = get('/offer/%r', token=request.user.token.id)
    data = response.json()
    return data

def contract_list(request):
    """Retrieve a list of contracts

    :param request: HTTP request
    :return: A list of contracts
    """
    response = get('/contract', token=request.user.token.id)
    data = response.json()
    return data
