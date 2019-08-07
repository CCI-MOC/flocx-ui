from django.conf.urls import url

import ironic_ui.api.ironic_rest_api #pylint: disable=unused-import, import-error

import flocx_ui.api.flocx_rest_api #pylint: disable=unused-import
from flocx_ui.content.flocx import views


urlpatterns = [
    url(r'^$', views.IndexView.as_view(), name='index')
]
