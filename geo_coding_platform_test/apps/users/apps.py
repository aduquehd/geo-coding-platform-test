from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class UsersConfig(AppConfig):
    name = "geo_coding_platform_test.apps.users"
    verbose_name = _("Users")

    def ready(self):
        try:
            import geo_coding_platform_test.apps.users.signals  # noqa F401
        except ImportError:
            pass
