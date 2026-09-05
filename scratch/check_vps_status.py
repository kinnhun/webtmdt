import paramiko
import sys

sys.stdout.reconfigure(encoding='utf-8')

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())

try:
    ssh.connect('180.93.36.237', username='root', password='DHT@#2344@$', timeout=15)
    print("=== CONNECTED TO VPS 180.93.36.237 SUCCESSFULLY ===\n")
    
    commands = [
        ("UPTIME & LOAD AVERAGE", "uptime"),
        ("MEMORY USAGE", "free -h"),
        ("DISK USAGE", "df -h /"),
        ("PM2 PROCESS LIST", "pm2 list"),
        ("PM2 APP DETAILS", "pm2 describe webtmdt 2>&1 || pm2 describe 0 2>&1"),
        ("SYSTEMD SERVICES STATUS", "systemctl is-active nginx mongod"),
        ("LISTENING PORTS", "ss -tulpn | grep -E '3000|27017|80|443'"),
        ("RECENT PM2 LOGS", "pm2 logs --lines 15 --nostream 2>&1"),
        ("RECENT NGINX ERROR LOGS", "tail -n 15 /var/log/nginx/error.log 2>&1")
    ]
    
    for title, cmd in commands:
        print(f"--- [{title}] ---")
        stdin, stdout, stderr = ssh.exec_command(cmd)
        out = stdout.read().decode('utf-8', errors='replace').strip()
        err = stderr.read().decode('utf-8', errors='replace').strip()
        if out:
            print(out)
        if err and not out:
            print(f"STDERR: {err}")
        print()
        
    ssh.close()
except Exception as e:
    print(f"CONNECTION ERROR: {e}")
