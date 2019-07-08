from openstack_dashboard.test.integration_tests import helpers


class TestFlocxDashboardInstalled(helpers.AdminTestCase):
    def test_flocx_page_opened(self):
        flocx_page = (
            self.home_pg)
        title = 'Flocx - OpenStack Dashboard'
        self.assertEqual(flocx_page.page_title, title)
