from openstack_dashboard.test.integration_tests.pages import basepage


class FlocxPage(basepage.BaseNavigationPage):
    def __init__(self, driver, conf):
        super(FlocxPage, self).__init__(driver, conf)
        self._page_title = "Flocx"