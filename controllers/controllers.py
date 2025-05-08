# -*- coding: utf-8 -*-
# from odoo import http


# class DpmGl(http.Controller):
#     @http.route('/dpm_gl/dpm_gl', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/dpm_gl/dpm_gl/objects', auth='public')
#     def list(self, **kw):
#         return http.request.render('dpm_gl.listing', {
#             'root': '/dpm_gl/dpm_gl',
#             'objects': http.request.env['dpm_gl.dpm_gl'].search([]),
#         })

#     @http.route('/dpm_gl/dpm_gl/objects/<model("dpm_gl.dpm_gl"):obj>', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('dpm_gl.object', {
#             'object': obj
#         })

