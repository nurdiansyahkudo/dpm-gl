// static/src/js/general_ledger_search_cache.js
odoo.define('dpm_gl.general_ledger_search_cache', function (require) {
  "use strict";

  const { patch } = require('web.utils');
  const { ReportWidget } = require('@account_reports/components/report_widget/report_widget');

  patch(ReportWidget.prototype, 'general_ledger_search_cache', {
      setup() {
          this._super(...arguments);
          const cachedSearch = sessionStorage.getItem('general_ledger_search');
          if (cachedSearch && this.reportModel.report_name === 'General Ledger') {
              this.reportModel.search_query = cachedSearch;
          }
      },

      async _onSearchBarInput(event) {
          await this._super(event);
          if (this.reportModel.report_name === 'General Ledger') {
              sessionStorage.setItem('general_ledger_search', event.target.value);
          }
      },
  });
});
