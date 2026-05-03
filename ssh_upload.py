import paramiko
import sys

def upload_file(host, username, password, local_path, remote_path):
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    try:
        client.connect(host, username=username, password=password, timeout=10)
        sftp = client.open_sftp()
        sftp.put(local_path, remote_path)
        sftp.close()
        print(f"Uploaded {local_path} to {remote_path}")
    except Exception as e:
        print(f"Error: {e}")
    finally:
        client.close()

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python ssh_upload.py <local_path> <remote_path>")
        sys.exit(1)
    
    local_path = sys.argv[1]
    remote_path = sys.argv[2]
    upload_file('180.93.36.237', 'root', 'DHT@#2344@$', local_path, remote_path)
