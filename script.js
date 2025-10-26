class StresserPanel {
    constructor() {
        this.isAttacking = false;
        this.attackInterval = null;
        this.init();
    }

    init() {
        this.updateOnlineCount();
        this.bindEvents();
        setInterval(() => this.updateOnlineCount(), 5000);
    }

    bindEvents() {
        document.getElementById('attackForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.startAttack();
        });
    }

    updateOnlineCount() {
        const count = Math.floor(Math.random() * 500) + 150;
        document.getElementById('onlineCount').textContent = count;
    }

    startAttack() {
        if (this.isAttacking) return;

        const target = document.getElementById('target').value;
        const port = document.getElementById('port').value;
        const duration = document.getElementById('duration').value;
        const method = document.getElementById('method').value;

        this.isAttacking = true;
        this.updateStatus(`🚀 Атака запущена на ${target}:${port} (${method})`, 'started');

        let timeLeft = duration;
        const progressBar = document.getElementById('progress');

        this.attackInterval = setInterval(() => {
            timeLeft--;
            const progress = ((duration - timeLeft) / duration) * 100;
            progressBar.style.width = progress + '%';

            this.updateStatus(`⚡ Атака в процессе... Осталось: ${timeLeft}сек`, 'running');

            if (timeLeft <= 0) {
                this.stopAttack();
                this.updateStatus('✅ Атака завершена', 'completed');
            }
        }, 1000);

        this.addLog(`Запущена атака ${method} на ${target}:${port} на ${duration} секунд`);
    }

    stopAttack() {
        this.isAttacking = false;
        clearInterval(this.attackInterval);
        document.getElementById('progress').style.width = '0%';
    }

    updateStatus(message, type) {
        const statusEl = document.getElementById('attackStatus');
        statusEl.textContent = message;
        
        statusEl.className = '';
        if (type === 'started') statusEl.classList.add('status-started');
        if (type === 'running') statusEl.classList.add('status-running');
        if (type === 'completed') statusEl.classList.add('status-completed');
    }

    addLog(message) {
        const logEl = document.getElementById('log');
        const timestamp = new Date().toLocaleTimeString();
        const logEntry = document.createElement('div');
        logEntry.className = 'log-entry';
        logEntry.innerHTML = `<strong>[${timestamp}]</strong> ${message}`;
        logEl.appendChild(logEntry);
        logEl.scrollTop = logEl.scrollHeight;
    }
}

// Инициализация панели
document.addEventListener('DOMContentLoaded', () => {
    new StresserPanel();
});