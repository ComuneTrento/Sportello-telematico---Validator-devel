import pkg_resources


from .views import (
    index, module, module_websocket_handler, module_html, module_prepare_download,
    folder_prepare_download, home, download, edit_module, generic_rest
)
from .templating import get_validator_path, get_stu3_validator_path


def get_static_path():
    return pkg_resources.resource_filename("validator_devel", "static")


def setup_routes(app):

    # Validator handler.
    app.router.add_static('/module/validator/', path=get_validator_path(), name='validator')
    app.router.add_static('/module/stu3/validator/', path=get_stu3_validator_path(), name='stu3_validator')
    app.router.add_static('/test/', path='/Users/mattiarossi/Develop/globo/test', name='test')

    app.router.add_get('/ws', module_websocket_handler)
    app.router.add_get('/module/{module_key}/download', module_prepare_download)
    app.router.add_get('/module/{module_key}/edit', edit_module)
    app.router.add_get('/module/{module_key}', module_html)
    app.router.add_get('/module', module)

    app.router.add_get('/folder/{folder}/download', folder_prepare_download)
    app.router.add_get('/download/{uuid}', download)

    # STU3 Rest mockup.
    app.router.add_get('/rest/session/token', generic_rest)
    app.router.add_get('/user/stu_profile', generic_rest)
    app.router.add_get('/stu_data_validation_cadastre/settings', generic_rest)
    app.router.add_get('/stu_data_validation_street_map/settings', generic_rest)
    app.router.add_get('/admin/structure/modulo/1', generic_rest)

    # Frontend handler.
    app.router.add_static('/', path=get_static_path(), name='static', show_index=True)
