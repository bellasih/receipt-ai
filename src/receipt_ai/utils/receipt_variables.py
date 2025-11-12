create_table_var = """
CREATE TABLE IF NOT EXISTS receipt_ai.receipt_info_tb (
   id VARCHAR(255) not NULL,
   vendor_name VARCHAR(255) not NULL,
   vendor_address VARCHAR(255) not NULL,
   items_info VARCHAR(255) not NULL,
   issued_date TIMESTAMP not NULL,
   subtotal FLOAT not NULL,
   tax_rate FLOAT not NULL,
   additional_cost VARCHAR(255) not NULL,
   final_cost FLOAT not NULL,
   currency VARCHAR(255) not NULL,
   created_at TIMESTAMP not NULL DEFAULT NOW(),
   updated_at TIMESTAMP not NULL DEFAULT NOW(),
      
   primary key (id)
);
"""