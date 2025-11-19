from receipt_ai.config.config import settings
from receipt_ai.databases.base import Dao

import mysql.connector
import pandas as pd


class MySqlDB(Dao):
    def __init__(self):
        self.connection = self.init_conn()
        self.cursor = self.connection.cursor()

    def init_conn(self):
        try:
            sql_conn = mysql.connector.connect(
                            host=settings.DB_HOST,
                            port=settings.DB_PORT,
                            user=settings.DB_USER,
                            password=settings.DB_PASSWORD
                        )
            return sql_conn
        except Exception as e:
            print(f'failed due to this errors occured: {e}')


    def insert(self, query):
        try:
            self.cursor.execute(query)
            self.connection.commit()
        except Exception as e:
            print(e)
            self.connection.rollback()

    def select(self, query):
        try:
            self.cursor.execute(query)
            data = self.cursor.fetchall()
            cols = []
            for elt in self.cursor.description:
                cols.append(elt[0])
            df = pd.DataFrame(data=data, columns=cols)

            return df.to_json()
        except Exception as e:
            print(f'failed due to this errors occured: {e}')