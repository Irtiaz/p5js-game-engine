import os
import subprocess
import time
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

# Configuration
DIRECTORY = os.getcwd()
MAKE_SCRIPT = './make.sh'

class ChangeHandler(FileSystemEventHandler):
    def on_created(self, event):
        # Only respond to .js file creations
        if event.src_path.endswith('.js'):
            print(f"JavaScript file created: {event.src_path}. Running make.sh...")
            subprocess.run([MAKE_SCRIPT], check=True)

    def on_deleted(self, event):
        # Only respond to .js file deletions
        if event.src_path.endswith('.js'):
            print(f"JavaScript file deleted: {event.src_path}. Running make.sh...")
            subprocess.run([MAKE_SCRIPT], check=True)

def start_watcher():
    # Set up watchdog to monitor changes
    event_handler = ChangeHandler()
    observer = Observer()
    observer.schedule(event_handler, DIRECTORY, recursive=True)
    observer.start()
    
    print(f"Watching {DIRECTORY} for additions/removals of .js files...\n")
    
    try:
        # Keep the watcher running
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()

if __name__ == '__main__':
    # Run make.sh before starting the watcher for the first time
    print("Running make.sh before starting the watcher...")
    subprocess.run([MAKE_SCRIPT], check=True)

    # Start the file change watcher
    start_watcher()
