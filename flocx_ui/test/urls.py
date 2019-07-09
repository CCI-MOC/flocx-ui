from django.conf.urls import include
from django.conf.urls import url
import openstack_dashboard.urls

import flocx_ui.api.flocx_rest_api #pylint: disable=unused-import

urlpatterns = [
    url(r'', include(openstack_dashboard.urls))
]
