import horizon

from openstack_dashboard.test import helpers as test
from flocx_ui.content.flocx import panel as f_panel


class RegistrationTests(test.PluginTestCase): # pylint: disable=too-many-ancestors
    def test_registered(self):
        dashboard = horizon.get_dashboard('project')
        panel = dashboard.get_panel('flocx')

        self.assertEqual(panel.__class__, f_panel.Flocx)
