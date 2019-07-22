# pylint: disable=R0201

from django.views import generic

from openstack_dashboard.api.rest import urls

from openstack_dashboard.api.rest import utils as rest_utils

from flocx_ui.api import flocx
from flocx_ui.api.schema import UUID_REGEX

@urls.register
class Offers(generic.View):

    url_regex = r'flocx/offer/$'

    @rest_utils.ajax()
    def get(self, *_):
        """Get the list of offers
        :param request: HTTP request
        :return: List of offers
        """
        offers = flocx.offer_list()
        return offers

    @rest_utils.ajax(data_required=True)
    def post(self, request):
        """Create an offer

        :param request: The request passed from the ajax decorator
        :return: The created offer
        """
        offer_data = request.body
        offer = flocx.offer_create(offer_data)
        return offer

class Offer(generic.View):

    url_regex = r'flocx/offer/(?P<offer_id>{})$'.format(UUID_REGEX)

    @rest_utils.ajax()
    def get(self, offer_id):
        """Show details on a particular offer

        :param offer_id: Offer uuid
        :return: The offer details
        """
        offer = flocx.offer_get(offer_id)
        return offer
