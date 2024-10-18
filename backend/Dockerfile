FROM python:3.13.0-bookworm

WORKDIR /usr/src/app

COPY . .
COPY .env.production .env

RUN pip install -r requirements.txt

EXPOSE 9000

ENV DJANGO_ENV=production

CMD ["python", "manage.py", "runserver", "0.0.0.0:9000", "--noreload"]
