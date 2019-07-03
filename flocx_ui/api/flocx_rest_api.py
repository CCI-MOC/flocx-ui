# pylint: disable=R0201

from django.views import generic

from openstack_dashboard.api.rest import urls

from openstack_dashboard.api.rest import utils as rest_utils

from flocx_ui.api import flocx


@urls.register
class Offer(generic.View):

    url_regex = r'flocx/offer/$'

    @rest_utils.ajax()
    def get(self, *_):
        """Get the list of offers.
        :param request: HTTP request.
        :return: List of offers.
        """
        offers = flocx.offer_list()
        return offers
