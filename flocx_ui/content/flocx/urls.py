from django.conf.urls import url

import flocx_ui.api.flocx_rest_api
from flocx_ui.content.flocx import views

urlpatterns = [
  url(r'^$', views.IndexView.as_view(), name='index')
]
