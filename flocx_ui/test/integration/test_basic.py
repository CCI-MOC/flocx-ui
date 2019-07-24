from openstack_dashboard.test.integration_tests import helpers


class TestFlocxDashboardInstalled(helpers.AdminTestCase):
    def test_flocx_page_opened(self):
        """
        This test verifies that the flocx-ui page is displayed on horizon
        """
        flocx_page = (
            self.home_pg)
        title = 'Flocx - OpenStack Dashboard'
        self.assertEqual(flocx_page.page_title, title)
