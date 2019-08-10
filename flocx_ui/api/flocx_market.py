from flocx_ui.api import schema
from flocx_ui.api.utils import generic_market_request as generic_request
from flocx_ui.api.utils import validate_data_with

def get(path, **kwargs):
    """An alias for generic_request with the type set to 'GET'

    :param path: A url path
    :param **kwargs: The keyword arguments to be passed to the request function
    :return: A request for the given path
    """
    return generic_request('GET', path, **kwargs)

def post(path, **kwargs):
    """An alias for generic_request with the type set to 'POST'

    :param path: A url path
    :param **kwargs: The keyword arguments to be passed to the request function
    :return: A request for the given path
    """
    return generic_request('POST', path, **kwargs)

def offer_list(request):
    """Retrieve a list of offers

    :param request: HTTP request
    :return A list of offers
    """

    response = get('/offer', token=request.user.token.id)
    data = response.json()
    return data

@validate_data_with(None, schema.validate_uuid)
def offer_get(request, offer_id):
    """Get an offer

    :param request: HTTP request
    :param offer_id: The offer id used to get the offer details
    :return: The offer associated with the offer_id
    """
    response = get('/offer/{}'.format(offer_id), token=request.user.token.id)
    data = response.json()
    return data

def bid_list(request):
    """Retrieve a list of bids

    :param request: HTTP request
    :return: A list of bids
    """
    response = get('/bid', token=request.user.token.id)
    data = response.json()
    return data

@validate_data_with(None, schema.validate_bid)
def bid_create(request, bid):
    """Create a bid

    :param request: HTTP Request
    :param bid: The bid to be created
    :return: The bid that was created
    """
    response = post('/bid', json=bid, token=request.user.token.id)
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
