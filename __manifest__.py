{
    "name": "General Ledger Search Memory",
    "version": "1.0",
    "summary": "Persist search query in General Ledger report",
    "author": "PT Lintang Utama Infotek",
    "license": "LGPL-3",
    "depends": ["account_reports"],
    "assets": {
        "web.assets_backend": [
            "dpm_gl/static/src/js/general_ledger_search_cache.js",
        ],
    },
    "installable": True,
    "application": False,
}
