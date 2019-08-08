import json

from openstack_dashboard.api.rest.utils import AjaxError
from flocx_ui.api import schema
from flocx_ui.api.utils import generic_provider_request as generic_request

def post(path, **kwargs):
    """An alias for generic_request with the type set to 'POST'

    :param path: A url path
    :param **kwargs: The keyword arguments to be passed to the request function
    :return: A request for the given path
    """
    return generic_request('POST', path, **kwargs)

def offer_create(request, offer_bytes):
    """Create an offer

    :param offer_bytes: The offer to be created
    :param request: HTTP request
    :raises AjaxError: If the offer param is invalid
    :return: The offer that was created
    """
    offer = json.loads(offer_bytes.decode('UTF-8'))
    if not schema.validate_provider_offer(offer, return_boolean=True):
        raise AjaxError(400, 'Invalid or insufficient input parameters. Cannot create offer.')
    response = post('/v1/offers', json=offer, token=request.user.token.id)
    data = response.json()
    return data
