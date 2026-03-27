FROM python:3.12-alpine
WORKDIR /app
COPY . /app/

COPY requirement.txt .
RUN pip install --no-cache-dir -r requirement.txt
RUN apk add --no-cache curl unzip \
    && curl -L -o sample.zip https://github.com/DataCamp/data-science-projects/raw/main/sample.zip \
    && unzip sample.zip -d data \
    && rm sample.zip
CMD ["python","main.py"]