from flocx_ui.api import schema
from flocx_ui.api.utils import generic_provider_request as generic_request
from flocx_ui.api.utils import validate_data_with

def post(path, **kwargs):
    """An alias for generic_request with the type set to 'POST'

    :param path: A url path
    :param **kwargs: The keyword arguments to be passed to the request function
    :return: A request for the given path
    """
    return generic_request('POST', path, **kwargs)

@validate_data_with(None, schema.validate_provider_offer)
def offer_create(request, offer):
    """Create an offer

    :param request: HTTP request
    :param offer: The offer to be created
    :return: The offer that was created
    """
    response = post('/v1/offers', json=offer, token=request.user.token.id)
    data = response.json()
    return data
