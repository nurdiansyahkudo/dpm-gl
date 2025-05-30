{
    "name": "General Ledger Search Bar",
    "version": "1.0",
    "summary": "Persist search query in General Ledger report",
    "author": "PT Lintang Utama Infotek",
    "license": "LGPL-3",
    "depends": ["account_reports"],
    'assets': {
        'web.assets_backend': [
            'dpm_gl/static/src/components/account_report/custom_search_bar.js',
        ],
    },
    "installable": True,
    "application": False,
}
