from django.conf.urls import patterns, include, url

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()
from index.views import index

urlpatterns = patterns('',
    url(r'^$', index.as_view()),
    url(r'^index/', index.as_view())

    # Examples:
    # url(r'^$', 'game.views.home', name='home'),
    # url(r'^game/', include('game.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),
)
