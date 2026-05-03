import paramiko
import sys
sys.stdout.reconfigure(encoding='utf-8')

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect('180.93.36.237', username='root', password='DHT@#2344@$', timeout=15)

commands = [
    'pm2 list 2>&1',
    'pm2 describe 0 2>&1 | head -30',
    'find /root -name "middleware.*" -not -path "*/node_modules/*" 2>/dev/null | head -10',
    'find /var/www -name "middleware.*" -not -path "*/node_modules/*" 2>/dev/null | head -10',
    'find /home -name "middleware.*" -not -path "*/node_modules/*" 2>/dev/null | head -10',
    'tail -30 /var/log/nginx/error.log 2>&1',
    'tail -30 /var/log/nginx/access.log 2>&1',
]
for cmd in commands:
    print(f'\n=== {cmd} ===')
    stdin, stdout, stderr = ssh.exec_command(cmd)
    out = stdout.read().decode('utf-8', errors='replace')
    err = stderr.read().decode('utf-8', errors='replace')
    if out:
        print(out)
    if err:
        print(f'STDERR: {err}')
ssh.close()
