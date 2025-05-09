/** @odoo-module **/

import { AccountReportSearchBar } from "@account_reports/components/account_report/search_bar/search_bar";
import { patch } from "@web/core/utils/patch";
import { onMounted, useRef, useState } from "@odoo/owl";

patch(AccountReportSearchBar.prototype, {
    setup() {
        this._super(...arguments);
        this.searchText = useRef("search_bar_input");
        this.controller = useState(this.env.controller);

        onMounted(() => {
            const lastQuery = this.controller.options?.filter_search_bar;
            if (lastQuery) {
                this.searchText.el.value = lastQuery;
                this.search();
            }
        });
    },

    search() {
        const query = this.searchText.el.value.trim().toLowerCase();
        const linesIDsMatched = [];

        for (const line of this.controller.lines) {
            if (line.visible) {
                let lineName = line.name.trim().toLowerCase();
                let match = lineName.includes(query);
                if (match) linesIDsMatched.push(line.id);
            }
        }

        if (query.length && linesIDsMatched.length) {
            this.controller.lines_searched = linesIDsMatched;
            this.controller.updateOption("filter_search_bar", query);
        } else {
            delete this.controller.lines_searched;
            this.controller.deleteOption("filter_search_bar");
        }
    },
});
