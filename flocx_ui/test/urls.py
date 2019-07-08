from django.conf.urls import include
from django.conf.urls import url
import openstack_dashboard.urls

urlpatterns = [
    url(r'', include(openstack_dashboard.urls))
]
