# Create your views here.
from django.views.generic import TemplateView
from django.http import HttpResponse
from django.template import  Context, loader


class index(TemplateView):
	template_name = 'index.html'
	
	def get_context_data(self, **kwargs):
		context = Context({ })

		return context
