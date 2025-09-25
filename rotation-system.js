class RotationSystem {
    constructor() {
        this.config = CONFIG;
        this.rotationCount = 0;
        this.successCount = 0;
        this.rotationInterval = null;
        this.isRunning = false;
        this.startTime = Date.now();
        this.currentIdentity = {};
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadCurrentIdentity();
        this.updateDisplay();
        this.monitorSDK();
        
        this.log('🚀 Rotation System Initialized', 'success');
        
        if (this.config.system.autoStart) {
            setTimeout(() => this.start(), 2000);
        }
    }

    setupEventListeners() {
        // SDK monitoring
        setInterval(() => this.monitorSDK(), 3000);
        
        // Uptime counter
        setInterval(() => this.updateUptime(), 1000);
        
        // Error handling
        window.addEventListener('error', (e) => {
            this.log(`Error: ${e.message}`, 'error');
        });
    }

    loadCurrentIdentity() {
        this.currentIdentity = {
            ip: this.generateIP(),
            device: this.detectDevice(),
            userAgent: navigator.userAgent,
            country: this.getRandomCountry(),
            timestamp: Date.now()
        };
    }

    generateIP() {
        const range = this.config.ipSimulation.ranges[
            Math.floor(Math.random() * this.config.ipSimulation.ranges.length)
        ];
        
        return range
            .replace('{x}', Math.floor(Math.random() * 255))
            .replace('{y}', Math.floor(Math.random() * 255));
    }

    detectDevice() {
        const ua = navigator.userAgent.toLowerCase();
        if (/mobile|android|iphone/i.test(ua)) return 'mobile';
        if (/tablet|ipad/i.test(ua)) return 'tablet';
        return 'desktop';
    }

    getRandomCountry() {
        return this.config.ipSimulation.countries[
            Math.floor(Math.random() * this.config.ipSimulation.countries.length)
        ];
    }

    getRandomUserAgent(deviceType = null) {
        if (!deviceType) deviceType = this.currentIdentity.device;
        const agents = this.config.userAgents[deviceType];
        return agents[Math.floor(Math.random() * agents.length)];
    }

    rotateIdentity() {
        this.rotationCount++;
        
        const oldIP = this.currentIdentity.ip;
        const oldDevice = this.currentIdentity.device;
        
        // Generate new identity
        this.currentIdentity = {
            ip: this.generateIP(),
            device: ['desktop', 'mobile', 'tablet'][Math.floor(Math.random() * 3)],
            userAgent: this.getRandomUserAgent(),
            country: this.getRandomCountry(),
            timestamp: Date.now()
        };
        
        this.successCount++;
        
        // Update display
        this.updateDisplay();
        
        // Refresh SDK if enabled
        if (this.config.system.refreshOnRotate) {
            this.refreshSDK();
        }
        
        this.log(`🔄 Rotation #${this.rotationCount} | IP: ${oldIP} → ${this.currentIdentity.ip} | Device: ${oldDevice} → ${this.currentIdentity.device}`, 'info');
        
        return this.currentIdentity;
    }

    refreshSDK() {
        // Remove old SDK
        const oldScript = document.querySelector('script[src*="libtl.com"]');
        if (oldScript) {
            oldScript.remove();
        }
        
        // Create new SDK
        const newScript = document.createElement('script');
        newScript.src = this.config.monetag.scriptUrl;
        newScript.setAttribute('data-zone', this.config.monetag.zoneId);
        newScript.setAttribute('data-sdk', this.config.monetag.sdkType);
        newScript.async = true;
        
        document.head.appendChild(newScript);
        this.log('✅ Monetag SDK Refreshed', 'success');
    }

    monitorSDK() {
        const sdkStatus = typeof monetag !== 'undefined';
        const statusDot = document.getElementById('sdkStatusDot');
        const statusText = document.getElementById('sdkStatusText');
        
        if (sdkStatus) {
            statusDot.className = 'status-dot active';
            statusText.textContent = 'SDK Active';
            statusText.style.color = '#28a745';
            
            // Update ad status
            document.querySelectorAll('.ad-status').forEach(el => {
                el.textContent = '✅ Active';
                el.style.color = '#28a745';
            });
        } else {
            statusDot.className = 'status-dot';
            statusText.textContent = 'SDK Inactive';
            statusText.style.color = '#dc3545';
        }
        
        return sdkStatus;
    }

    start() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        const interval = this.config.rotation.defaultInterval;
        
        this.rotationInterval = setInterval(() => {
            this.rotateIdentity();
            this.updateNextRotation();
        }, interval);
        
        this.log('🟢 Rotation System Started', 'success');
        this.updateNextRotation();
    }

    stop() {
        if (!this.isRunning) return;
        
        this.isRunning = false;
        clearInterval(this.rotationInterval);
        this.log('🟡 Rotation System Stopped', 'warning');
    }

    rotateNow() {
        this.rotateIdentity();
        if (this.isRunning) {
            this.updateNextRotation();
        }
    }

    reset() {
        this.stop();
        this.rotationCount = 0;
        this.successCount = 0;
        this.startTime = Date.now();
        this.loadCurrentIdentity();
        this.updateDisplay();
        this.log('🔃 System Reset Complete', 'info');
    }

    updateInterval() {
        const newInterval = parseInt(document.getElementById('intervalInput').value) * 60 * 1000;
        
        if (newInterval >= this.config.rotation.minInterval && 
            newInterval <= this.config.rotation.maxInterval) {
            
            this.config.rotation.defaultInterval = newInterval;
            
            if (this.isRunning) {
                this.stop();
                this.start();
            }
            
            this.log(`⏰ Rotation interval updated to ${newInterval/60000} minutes`, 'info');
        }
    }

    updateDisplay() {
        document.getElementById('currentIP').textContent = this.currentIdentity.ip;
        document.getElementById('deviceType').textContent = this.currentIdentity.device.charAt(0).toUpperCase() + this.currentIdentity.device.slice(1);
        document.getElementById('rotationCount').textContent = this.rotationCount;
        
        const successRate = this.rotationCount > 0 ? 
            Math.round((this.successCount / this.rotationCount) * 100) : 100;
        document.getElementById('successRate').textContent = successRate + '%';
    }

    updateUptime() {
        const uptime = Math.floor((Date.now() - this.startTime) / 1000);
        const hours = Math.floor(uptime / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        const seconds = uptime % 60;
        
        document.getElementById('uptime').textContent = 
            `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    updateNextRotation() {
        if (!this.isRunning) {
            document.getElementById('nextRotation').textContent = '--:--';
            return;
        }
        
        const interval = this.config.rotation.defaultInterval;
        const nextRotationTime = interval / 1000;
        let timeLeft = nextRotationTime;
        
        const countdown = setInterval(() => {
            if (!this.isRunning) {
                clearInterval(countdown);
                return;
            }
            
            const minutes = Math.floor(timeLeft / 60);
            const seconds = Math.floor(timeLeft % 60);
            document.getElementById('nextRotation').textContent = 
                `${minutes}:${seconds.toString().padStart(2, '0')}`;
            
            timeLeft--;
            
            if (timeLeft < 0) {
                clearInterval(countdown);
            }
        }, 1000);
    }

    log(message, type = 'info') {
        if (!this.config.system.enableLogging) return;
        
        const logContainer = document.getElementById('logContainer');
        const timestamp = new Date().toLocaleTimeString();
        
        const logEntry = document.createElement('div');
        logEntry.className = `log-entry log-${type}`;
        logEntry.innerHTML = `<span class="log-time">[${timestamp}]</span> ${message}`;
        
        logContainer.appendChild(logEntry);
        
        // Limit log entries
        const entries = logContainer.getElementsByClassName('log-entry');
        if (entries.length > this.config.system.maxLogEntries) {
            entries[0].remove();
        }
        
        logContainer.scrollTop = logContainer.scrollHeight;
    }
}

// Utility functions
function clearLogs() {
    document.getElementById('logContainer').innerHTML = 
        '<div class="log-entry">🗑️ Logs cleared</div>';
}
