import os
import requests

from requests.compat import urljoin
from dotenv import load_dotenv

load_dotenv(override=True)

DEFAULT_HOST = 'http://localhost'
DEFAULT_MARKET_PORT = '8081'
DEFAULT_PROVIDER_PORT = '7777'

# Flocx Market URL
MARKET_HOST = os.getenv('FLOCX_MARKET_HOST', DEFAULT_HOST)
MARKET_PORT = os.getenv('FLOCX_MARKET_PORT', DEFAULT_MARKET_PORT)
MARKET_BASE_URL = MARKET_HOST + ':' + MARKET_PORT

# Flocx Provider URL
PROVIDER_HOST = os.getenv('FLOCX_PROVIDER_HOST', DEFAULT_HOST)
PROVIDER_PORT = os.getenv('FLOCX_PROVIDER_PORT', DEFAULT_PROVIDER_PORT)
PROVIDER_BASE_URL = PROVIDER_HOST + ':' + PROVIDER_PORT

def generic_request(method, url, **kwargs):
    """An alias for requests.request with handling of keystone authentication tokens.

    :param method: The HTTP method of the request
    :param url: The url to request
    :param **kwargs: The keyword arguments defined below as well
        as any additional arguments to be passed to the
        requests.request call
    :return: A request for the given url

    :Keyword Arguments:
        * token:
            A token to be put into the X-Auth-Token header of the request
    """

    auth_token = kwargs.pop('token', None)
    if auth_token:
        headers = kwargs.pop('headers', {})
        headers['X-Auth-Token'] = auth_token
        kwargs['headers'] = headers

    return requests.request(method, url, **kwargs)

def generic_market_request(method, path, **kwargs):
    """An alias for generic_request that handles the base url of the flocx-market

    :param method: The HTTP method of the request
    :param path: The path to be appended to the base url
    :param **kwargs: The keyword arguments defined below as well
        as any additional arguments to be passed to the
        requests.request call
    :return: A request for the given path

    :Keyword Arguments:
        * token:
            A token to be put into the X-Auth-Token header of the request
    """

    return generic_request(method, urljoin(MARKET_BASE_URL, path), **kwargs)

def generic_provider_request(method, path, **kwargs):
    """An alias for generic_request that handles the base url of the flocx-provider

    :param method: The HTTP method of the request
    :param path: The path to be appended to the base url
    :param **kwargs: The keyword arguments defined below as well
        as any additional arguments to be passed to the
        requests.request call
    :return: A request for the given path

    :Keyword Arguments:
        * token:
            A token to be put into the X-Auth-Token header of the request
    """

    return generic_request(method, urljoin(PROVIDER_BASE_URL, path), **kwargs)
