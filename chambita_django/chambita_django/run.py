import subprocess
import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "chambita_django.settings")

subprocess.Popen(["python", "manage.py", "runserver"])
subprocess.Popen(["python", "scheduler.py"])
