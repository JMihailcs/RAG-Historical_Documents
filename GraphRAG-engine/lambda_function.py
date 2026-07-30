import json
import sys
from pathlib import Path
from graphrag.cli.query import run_local_search


def handler(event, context):
    query_text = event.get("query", "What is GraphRAG?")
    root_dir = Path("/var/task")

    try:
        response, context_data = run_local_search(
            config_filepath=None,
            data_dir=None,
            root_dir=root_dir,
            community_level=2,
            response_type="Multiple Paragraphs",
            streaming=False,
            query=query_text,
            verbose=False,
        )
        return {"statusCode": 200, "body": json.dumps({"respuesta": response})}
    except Exception as e:
        return {"statusCode": 500, "body": json.dumps({"error": str(e)})}
