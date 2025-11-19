from receipt_ai.databases.sqldb import MySqlDB
from receipt_ai.models.ocr import OcrInference

from google.genai import types
import inspect

class ReceiptTools():
    def __init__(self):
        pass

    def get_ocr_inference(self, file_path:str) -> dict[str]:
        """
        Tools for getting inference result from ocr models with given file path to the
        corresponding image

        Args:
        - file_path: path to the corresponding image
        """
        return {"result": OcrInference().get_result(file_path)}


    def get_or_store_data_from_query(self, query: str, is_select: str) -> dict[str, str]:
        """
        Tools for getting data the correspond data based on given query

        Args:
        - query: MySQL query that shall be either `select` or `insert` type
        - is_select: 'True' if query type is `select` else 'False'

        Returns:
        A dictionary containing the set brightness and color temperature.
        """
        sqldb = MySqlDB()

        try:
            if is_select == "True":
                result = sqldb.select(query)
            else:
                if "receipt_ai" not in query:
                    query = query.replace('receipt_info_tb','receipt_ai.receipt_info_tb')

                result = sqldb.insert(query)
            status="success"
        except Exception as e:
            status="fail"

        print('$$', status)
        
        return {'status':status, "result":result}

    def format_passing(self, func):
        signature = inspect.signature(func)
        properties_dict = {}
        required_params_list = []

        cand_param_desc = func.__doc__.split('-')[1:]

        for i, (name, parameter) in enumerate(signature.parameters.items()):
            par_val_type = parameter.annotation.__name__
            params_property_dict = {name: {"type": "string" if par_val_type == "str" else par_val_type , "description": cand_param_desc[i]}}
            properties_dict.update(params_property_dict)

            if (parameter.default is inspect._empty):
                required_params_list.append(name)

        return {
            "name": func.__name__,
            "description": func.__doc__,
            "parameters": {
                "type": "object",
                "properties": properties_dict,
                "required": required_params_list,
            },
        }
    
    def get_all_existing_func_tools(self):
        return [self.format_passing(self.get_or_store_data_from_query),
                self.format_passing(self.get_ocr_inference)]
    
