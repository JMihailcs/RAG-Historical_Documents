FROM public.ecr.aws/lambda/python:3.12

COPY requirements.txt .

RUN pip install --upgrade pip wheel && \
    pip install --only-binary=:all: pyarrow pandas && \
    pip install --no-cache-dir -r requirements.txt

COPY lambda_function.py ${LAMBDA_TASK_ROOT}

COPY ./output ${LAMBDA_TASK_ROOT}/output
COPY ./settings.yaml ${LAMBDA_TASK_ROOT}/settings.yaml
COPY ./prompts ${LAMBDA_TASK_ROOT}/prompts

CMD [ "lambda_function.handler" ]
