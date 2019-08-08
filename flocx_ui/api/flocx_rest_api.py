# pylint: disable=R0201

from django.views import generic

from openstack_dashboard.api.rest import urls

from openstack_dashboard.api.rest import utils as rest_utils

from flocx_ui.api import flocx_market
from flocx_ui.api import flocx_provider
from flocx_ui.api.schema import UUID_REGEX

@urls.register
class Offers(generic.View):

    url_regex = r'flocx/offer/$'

    @rest_utils.ajax()
    def get(self, request):
        """Get the list of offers
        :param request: HTTP request
        :return: List of offers
        """
        offers = flocx_market.offer_list(request)
        return offers

    @rest_utils.ajax(data_required=True)
    def post(self, request):
        """Create an offer

        :param request: The request passed from the ajax decorator
        :return: The created offer
        """
        offer_data = request.body
        offer = flocx_provider.offer_create(request, offer_data)
        return offer

class Offer(generic.View):

    url_regex = r'flocx/offer/(?P<offer_id>{})$'.format(UUID_REGEX)

    @rest_utils.ajax()
    def get(self, request, offer_id):
        """Show details on a particular offer

        :param offer_id: Offer uuid
        :return: The offer details
        """
        offer = flocx_market.offer_get(request, offer_id)
        return offer

@urls.register
class Bids(generic.View):

    url_regex = r'flocx/bid/$'

    @rest_utils.ajax()
    def get(self, request):
        """Get the list of bids

        :param request: HTTP request
        :return: List of bids
        """
        bids = flocx_market.bid_list(request)
        return bids

@urls.register
class Contracts(generic.View):

    url_regex = r'flocx/contract/$'

    @rest_utils.ajax()
    def get(self, request):
        """Get the list of contracts

        :param request: HTTP request
        :return: List of contracts
        """
        offers = flocx_market.contract_list(request)
        return offers
