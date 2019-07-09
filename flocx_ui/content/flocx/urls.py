from django.conf.urls import url

import flocx_ui.api.flocx_rest_api #pylint: disable=unused-import
from flocx_ui.content.flocx import views

urlpatterns = [ #pylint: disable=C0103
    url(r'^$', views.IndexView.as_view(), name='index')
]
