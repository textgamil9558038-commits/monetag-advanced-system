// Configuration File for Monetag Rotation System
const CONFIG = {
    // Monetag Settings
    monetag: {
        zoneId: '9924417',
        sdkType: 'show_9924417',
        scriptUrl: '//libtl.com/sdk.js'
    },

    // Rotation Settings
    rotation: {
        defaultInterval: 5 * 60 * 1000, // 5 minutes
        minInterval: 1 * 60 * 1000,     // 1 minute
        maxInterval: 60 * 60 * 1000     // 60 minutes
    },

    // IP Simulation Settings
    ipSimulation: {
        ranges: [
            '192.168.{x}.{y}',
            '10.0.{x}.{y}',
            '172.16.{x}.{y}',
            '203.0.{x}.{y}',
            '45.76.{x}.{y}'
        ],
        countries: ['US', 'UK', 'CA', 'AU', 'DE', 'FR', 'JP', 'SG']
    },

    // Device Settings
    devices: {
        desktop: {
            name: 'Desktop',
            icons: ['💻', '🖥️', '👨‍💻'],
            screenResolutions: ['1920x1080', '1366x768', '1536x864', '1440x900']
        },
        mobile: {
            name: 'Mobile',
            icons: ['📱', '🤳', '📲'],
            screenResolutions: ['375x812', '414x896', '360x780', '390x844']
        },
        tablet: {
            name: 'Tablet',
            icons: ['📟', '💾', '📺'],
            screenResolutions: ['768x1024', '810x1080', '800x1280', '834x1194']
        }
    },

    // User Agents Database
    userAgents: {
        desktop: [
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15',
            'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:90.0) Gecko/20100101 Firefox/90.0'
        ],
        mobile: [
            'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1',
            'Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36',
            'Mozilla/5.0 (Android 11; Mobile; rv:68.0) Gecko/68.0 Firefox/68.0',
            'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/91.0.4472.80 Mobile/15E148 Safari/604.1'
        ],
        tablet: [
            'Mozilla/5.0 (iPad; CPU OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1',
            'Mozilla/5.0 (Linux; Android 10; SM-T870) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Safari/537.36',
            'Mozilla/5.0 (iPad; CPU OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1'
        ]
    },

    // Proxy Servers (Example - Replace with actual proxies)
    proxies: [
        'https://proxy-server-1.com:8080',
        'https://proxy-server-2.com:8080',
        'https://proxy-server-3.com:8080',
        'https://proxy-server-4.com:8080',
        'https://proxy-server-5.com:8080'
    ],

    // System Settings
    system: {
        autoStart: true,
        enableLogging: true,
        maxLogEntries: 1000,
        refreshOnRotate: true
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
