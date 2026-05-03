import paramiko
import sys

def download_file(host, username, password, remote_path, local_path):
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    try:
        client.connect(host, username=username, password=password, timeout=10)
        sftp = client.open_sftp()
        sftp.get(remote_path, local_path)
        sftp.close()
        print(f"Downloaded {remote_path} to {local_path}")
    except Exception as e:
        print(f"Error: {e}")
    finally:
        client.close()

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python ssh_download.py <remote_path> <local_path>")
        sys.exit(1)
    
    remote_path = sys.argv[1]
    local_path = sys.argv[2]
    download_file('180.93.36.237', 'root', 'DHT@#2344@$', remote_path, local_path)
