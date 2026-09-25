import re

from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.views.static import serve
from django.contrib.staticfiles.views import serve as staticfiles_serve

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('core.urls')),
]

urlpatterns += [
    re_path(
        r'^%s(?P<path>.*)$' % re.escape(settings.MEDIA_URL.lstrip('/')),
        serve,
        {'document_root': settings.MEDIA_ROOT},
    ),
    re_path(
        r'^%s(?P<path>.*)$' % re.escape(settings.STATIC_URL.lstrip('/')),
        staticfiles_serve,
        {'insecure': True},
    ),
]

handler404 = 'core.views.custom_404'
