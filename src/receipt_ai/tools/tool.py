from receipt_ai.databases.sqldb import MySqlDB

from google.genai import types
import inspect

class ReceiptTools():
    def __init__(self):
        pass

    def get_data_from_query(self, query, is_select):
        sqldb = MySqlDB()

        if is_select:
            result = sqldb.select(query)
        else:
            result = sqldb.insert(query)
        
        return result

    def format_passing(self, func):
        signature = inspect.signature(func)
        properties_dict = {}
        required_params_list = []

        for name, parameter in signature.parameters.items():
            params_property_dict = {name: {"type": parameter.annotation.__name__}}
            properties_dict.update(params_property_dict)

            if (parameter.default is inspect._empty):
                required_params_list.append(name)

        return {
            "name": func.__name__,
            "description": func.__docs__,
            "parameters": {
                "type": func.__annotations__["return"].__name__,
                "properties": properties_dict,
                "required": required_params_list,
            },
        }