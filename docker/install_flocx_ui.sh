# From https://docs.openstack.org/ironic-ui/latest/install/installation.html
. /etc/horizon/.tox/venv/bin/activate
cd /flocx-ui
cp /flocx-ui/flocx_ui/enabled/_31000_flocx-ui.py /etc/horizon/openstack_dashboard/local/enabled
pip install -r requirements.txt -e .