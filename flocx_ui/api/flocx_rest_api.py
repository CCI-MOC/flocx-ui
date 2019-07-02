from django.views import generic

from flocx_ui.api import flocx

from openstack_dashboard.api.rest import urls

from openstack_dashboard.api.rest import utils as rest_utils

@urls.register
class Offer(generic.View):

    url_regex = r'flocx/offer/$'

    @rest_utils.ajax()
    def get(self, request):
        """Get the list of offers.
        :param request: HTTP request.
        :return: List of offers.
        """
        offers = flocx.offer_list(request)
        return offers