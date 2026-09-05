import paramiko
import sys

sys.stdout.reconfigure(encoding='utf-8')

local_file = r'd:\webtmdt\src\proxy.ts'
remote_file = '/var/www/webtmdt/src/proxy.ts'

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())

try:
    print(f"Connecting to VPS 180.93.36.237...")
    client.connect('180.93.36.237', username='root', password='DHT@#2344@$', timeout=15)
    
    # Upload proxy.ts
    sftp = client.open_sftp()
    print(f"Uploading {local_file} -> {remote_file}...")
    sftp.put(local_file, remote_file)
    sftp.close()
    print("Upload successful!")
    
    # Check if app is using next build or tsx/next dev on VPS
    cmd = "cd /var/www/webtmdt && npm run build && pm2 reload webtmdt 2>&1 || pm2 restart webtmdt 2>&1"
    print(f"Executing build & PM2 reload on VPS...")
    stdin, stdout, stderr = client.exec_command(cmd)
    
    out = stdout.read().decode('utf-8', errors='replace')
    err = stderr.read().decode('utf-8', errors='replace')
    
    if out:
        print("STDOUT:\n" + out)
    if err:
        print("STDERR:\n" + err)
        
    client.close()
    print("Deploy finished successfully!")
except Exception as e:
    print(f"ERROR: {e}")
