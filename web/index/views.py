# -*- coding: utf-8 -*-
# Create your views here.
from django.views.generic import TemplateView
from django.conf import settings

class index(TemplateView):
    template_name = 'index.html'
    def get_context_data(self, **kwargs):
        return dict(WEBSOCKET = settings.WEBSOCKET)
