import os

i = -1
all_files = sorted([f for f in os.listdir('.')])
for f in all_files:
  print (f)
  if not f.startswith('.') and "py" not in f:
    i += 1
    print (i)
    os.rename(f, str(i)+".something")

i = -1
all_files = sorted([f for f in os.listdir('.')])
for f in all_files:
  print (f)
  if not f.startswith('.') and "py" not in f:
    i += 1
    print (i)
    os.rename(f, str(i)+".png")


