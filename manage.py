import os
import sys

from django.core.management import execute_from_command_line  # noqa

if __name__ == "__main__":
    os.environ.setdefault("DJANGO_SETTINGS_MODULE",
                          "flocx_ui.test.settings")
    execute_from_command_line(sys.argv)
