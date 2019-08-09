import os
import json
import requests

from requests.compat import urljoin
from openstack_dashboard.api.rest.utils import AjaxError
from dotenv import load_dotenv
from schema import SchemaError

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

def validate_data_with(*validators):
    """A decorator to convert and validate JSON data from incoming requests.
       This decorator should be used to convert byte data coming in from a
       REST API endpoint as well as validate each data arg against a given
       validator.

    :raises AjaxError: If one of the validators doesn't pass with the given data
    :return: The decorated function that will receive the data in JSON format
             instead of byte data
    """
    def decorator(func):
        """The actual decorator function that decorates the inputted function

        :param func: The function that is going to be decorated
        :raises AjaxError: If one of the validators doesn't pass with the given data
        :return: A wrapped function that calls the inputted func when called
        """
        def _wrapped(*possible_byte_data, **_kwargs):
            """The function that takes the place of the original function and houses
               all of the conversion and validation logic

            :raises AjaxError: If one of the validators doesn't pass with the given data
            :return: A call to the original function with JSON args instead of byte data
            """
            func_args = []
            for validator, datum in zip(validators, possible_byte_data):
                if validator is not None: # Don't try to parse as JSON if the validator is None

                    # Attempt to decode bytes
                    try:
                        datum = json.loads(datum.decode('UTF-8'))
                    except (AttributeError, ValueError):
                        pass

                    # Attempt validators
                    try:
                        validator(datum)
                        func_args.append(datum)
                    except SchemaError as err:
                        raise AjaxError(400, str(err))
                else:
                    # Add the datum as-is to the func args
                    func_args.append(datum)
            return func(*func_args, **_kwargs)
        return _wrapped
    return decorator
