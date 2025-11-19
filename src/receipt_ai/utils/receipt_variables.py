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

extract_ocr_json_format_var = """
```json
{
   vendor_name: <detected_vendor_name>,
   vendor_address: <detected_vendor_address>,
   items_info: [
         {
            item_name: <detected_item_name_1>,
            item_cost: <detected_item_cost_1>,
            item_type: <item_type_1>
         },
         {
            item_name: <detected_item_name_2>,
            item_cost: <detected_item_cost_2>,
            item_type: <item_type_2>
         }
         ...
   ],
   issued_date: <detected_issued_date_with_time>,
   subtotal: <detected_total_cost_before_tax>,
   tax_rate: <detected_tax_rate>,
   additional_cost: [
         {
            add_cost: <detected_additional_cost>,
            type: <cost_type_such_as_tips_or_service>
         }
         ...
   ],
   final_cost: <detected_total_cost_after_tax_and_additional_cost>
}
```
"""