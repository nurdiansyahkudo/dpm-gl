// static/src/js/general_ledger_search_cache.js
odoo.define('dpm_gl.general_ledger_search_cache', function (require) {
  "use strict";

  const { patch } = require('web.utils');
  let ReportWidget;

  try {
      ReportWidget = require('@account_reports/components/report_widget/report_widget').ReportWidget;
  } catch (e) {
      console.warn('ReportWidget not found.');
      return;
  }

  if (!ReportWidget) {
      console.warn('ReportWidget undefined.');
      return;
  }

  patch(ReportWidget.prototype, 'general_ledger_search_cache', {
      setup() {
          this._super(...arguments);

          try {
              if (this.reportModel?.report_name === 'General Ledger') {
                  const cachedSearch = sessionStorage.getItem('general_ledger_search');
                  if (cachedSearch) {
                      this.reportModel.search_query = cachedSearch;

                      // 🔁 Delay inject until DOM is ready
                      setTimeout(() => {
                          const searchInput = document.querySelector('.o_account_report_search_input');
                          if (searchInput) {
                              searchInput.value = cachedSearch;
                          }
                      }, 300); // May adjust based on rendering speed
                  }
              }
          } catch (e) {
              console.error('Failed to restore search input:', e);
          }
      },

      async _onSearchBarInput(event) {
          await this._super(event);
          try {
              if (this.reportModel?.report_name === 'General Ledger') {
                  sessionStorage.setItem('general_ledger_search', event.target.value);
              }
          } catch (e) {
              console.error('Search cache failed:', e);
          }
      },
  });
});
