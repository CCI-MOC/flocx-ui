from django.conf.urls import url

from flocx_ui.content.flocx import views

urlpatterns = [
  url(r'^$', views.IndexView.as_view(), name='index')
]
