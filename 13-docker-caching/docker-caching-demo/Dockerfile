#layer1 it should be rare to chages
FROM python:3.12-alpine
WORKDIR /app
#this is dependecy layer 3 this is since dependency it is rare to change 
COPY requirement.txt .
RUN pip install --no-cache-dir -r requirement.txt
#copy appplication code which is frequinltly chaged
COPY app.py .
#run app
CMD ["python", "app.py"]