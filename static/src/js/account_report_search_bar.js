/** @odoo-module **/

import { AccountReportSearchBar } from "@account_reports/search_bar";
import { onMounted } from "@odoo/owl";

export class AccountReportSearchBarCustom extends AccountReportSearchBar {
    setup() {
        super.setup();

        onMounted(() => {
            // Restore from localStorage if available
            const savedSearch = localStorage.getItem("ledger_search_query");
            if (savedSearch && !this.props.initialQuery) {
                this.searchText.el.value = savedSearch;
                this.search();
            }
        });
    }

    search() {
        const query = this.searchText.el.value.trim().toLowerCase();
        localStorage.setItem("ledger_search_query", query);  // Save to localStorage

        const linesIDsMatched = [];
        for (const line of this.controller.lines) {
            if (line.visible) {
                const lineName = line.name.trim().toLowerCase();
                if (lineName.includes(query)) {
                    linesIDsMatched.push(line.id);
                }
            }
        }

        if (query.length && linesIDsMatched.length) {
            this.controller.lines_searched = linesIDsMatched;
            this.controller.updateOption("filter_search_bar", query);
        } else {
            delete this.controller.lines_searched;
            this.controller.deleteOption("filter_search_bar");
        }
    }
}
