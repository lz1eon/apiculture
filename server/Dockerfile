FROM python:3.12.1
ENV PYTHONUNBUFFERED True

RUN pip install --upgrade pip
COPY requirements.txt .
RUN pip install --no-cache-dir -r  requirements.txt

ENV APP_HOME ./apiculture
WORKDIR $APP_HOME
COPY /app $APP_HOME/app

EXPOSE 8080
CMD ["uvicorn", "apiculture.api:app", "--host", "0.0.0.0", "--port", "8080"]