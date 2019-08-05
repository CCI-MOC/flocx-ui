# The name of the panel to be added to HORIZON_CONFIG. Required.
PANEL = 'flocx-ui'

# The name of the dashboard the PANEL associated with. Required.
PANEL_DASHBOARD = 'project'

# Python panel class of the PANEL to be added.
ADD_PANEL = 'flocx_ui.content.flocx.panel.Flocx'

# A list of applications to be prepended to INSTALLED_APPS
ADD_INSTALLED_APPS = ['flocx_ui', 'ironic_ui']

# A list of AngularJS modules to be loaded when Angular bootstraps.
ADD_ANGULAR_MODULES = ['horizon.dashboard.project.flocx', 'horizon.dashboard.admin.ironic']

# Automatically discover static resources in installed apps
AUTO_DISCOVER_STATIC_FILES = True

# A list of js files to be included in the compressed set of files
ADD_JS_FILES = []
