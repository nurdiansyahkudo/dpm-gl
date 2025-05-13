/** @odoo-module **/

import { patch } from "@web/core/utils/patch";
import { onMounted } from "@odoo/owl";
import { AccountReportSearchBar } from "@account_reports/components/account_report/search_bar/search_bar";

patch(AccountReportSearchBar.prototype, {

    setup() {
        if (super.setup) {
            super.setup();
        }

        this.localStorageKey = "account_report_search_query";

        onMounted(() => {
            const storedQuery = localStorage.getItem(this.localStorageKey);
            if (storedQuery && this.searchText?.el) {
                this.searchText.el.value = storedQuery;
                this.search();
            }
        });
    },

    search() {
        const query = this.searchText.el.value.trim().toLowerCase();
        const linesIDsMatched = [];

        if (query.length) {
            for (const line of this.controller.lines) {
                const lineName = line.name.trim().toLowerCase();
                const match = lineName.includes(query);
                if (match) {
                    linesIDsMatched.push(line.id);
                }
            }
            this.controller.lines_searched = linesIDsMatched;
            this.controller.updateOption("filter_search_bar", query);
            localStorage.setItem(this.localStorageKey, query); // simpan query
        } else {
            delete this.controller.lines_searched;
            this.controller.deleteOption("filter_search_bar");
            localStorage.removeItem(this.localStorageKey); // hapus query
        }
    }
});
