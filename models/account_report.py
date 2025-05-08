from odoo import models

class AccountReport(models.Model):
    _inherit = 'account.report'

    def _init_options_search_bar(self, options, previous_options=None):
        super()._init_options_search_bar(options, previous_options)

        if self.search_bar:
            if previous_options and 'search_keyword' in previous_options:
                options['search_keyword'] = previous_options['search_keyword']
