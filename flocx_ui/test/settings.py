# Default to Horizons test settings to avoid any missing keys
# pylint: disable=wildcard-import,unused-wildcard-import
from horizon.test.settings import *
from openstack_dashboard.test.settings import *
# pylint: enable=wildcard-import,unused-wildcard-import

# Update the dashboards with flocx_ui
import openstack_dashboard.enabled
from openstack_dashboard.utils import settings
import flocx_ui.enabled

# pop these keys to avoid log warnings about deprecation
# update_dashboards will populate them anyway
HORIZON_CONFIG.pop('dashboards', None)
HORIZON_CONFIG.pop('default_dashboard', None)


settings.update_dashboards(
    [
        flocx_ui.enabled,
        openstack_dashboard.enabled,
    ],
    HORIZON_CONFIG,
    INSTALLED_APPS
)

ROOT_URLCONF = 'flocx_ui.test.urls'

# Ensure any duplicate apps are removed after the update_dashboards call
INSTALLED_APPS = list(set(INSTALLED_APPS))
