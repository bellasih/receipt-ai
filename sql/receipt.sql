CREATE DATABASE IF NOT EXISTS receipt_ai;
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


INSERT INTO receipt_ai.receipt_info_tb (
    id,
    vendor_name,
    vendor_address,
    items_info,
    issued_date,
    subtotal,
    tax_rate,
    additional_cost,
    final_cost,
    currency,
    created_at,
    updated_at
)
VALUES
(UUID(), 'Starbucks Coffee', '123 Market St, San Francisco, CA 94103',
 '[{"Caffe Latte": 4.75}, {"Croissant": 3.25}, {"Espresso": 2.75}]',
 '2025-10-12 08:45:00', 10.75, 0.085, '{"Tip": 1.50}', 12.67, 'USD', NOW(), NOW()),

(UUID(), 'Chipotle Mexican Grill', '2300 Mission St, San Francisco, CA 94110',
 '[{"Burrito Bowl": 9.25}, {"Chips & Guac": 3.75}, {"Soda": 2.25}]',
 '2025-09-22 13:15:00', 15.25, 0.085, '{"Tip": 2.00}', 18.51, 'USD', NOW(), NOW()),

(UUID(), 'Panera Bread', '500 El Camino Real, Palo Alto, CA 94301',
 '[{"Turkey Sandwich": 8.99}, {"Broccoli Cheddar Soup": 5.49}, {"Iced Tea": 2.25}]',
 '2025-11-01 12:05:00', 16.73, 0.09, '{"Tip": 1.75}', 19.99, 'USD', NOW(), NOW()),

(UUID(), 'In-N-Out Burger', '2100 South Blvd, San Jose, CA 95110',
 '[{"Double-Double": 5.15}, {"Fries": 2.25}, {"Chocolate Shake": 2.75}]',
 '2025-10-29 18:30:00', 10.15, 0.0825, '{"None": 0.00}', 10.99, 'USD', NOW(), NOW()),

(UUID(), 'The Cheesecake Factory', '99 Ocean Ave, Santa Monica, CA 90401',
 '[{"Chicken Madeira": 18.95}, {"Cheesecake Slice": 8.50}, {"Iced Tea": 3.25}]',
 '2025-11-03 19:45:00', 30.70, 0.09, '{"Tip": 5.00}', 38.47, 'USD', NOW(), NOW()),

(UUID(), 'Blue Bottle Coffee', '455 Valencia St, San Francisco, CA 94110',
 '[{"Cold Brew": 5.00}, {"Almond Croissant": 4.50}]',
 '2025-09-15 09:20:00', 9.50, 0.085, '{"Tip": 1.00}', 11.29, 'USD', NOW(), NOW()),

(UUID(), 'Olive Garden', '1200 Blossom Hill Rd, San Jose, CA 95123',
 '[{"Fettuccine Alfredo": 16.25}, {"Garlic Breadsticks": 4.00}, {"Soda": 3.00}]',
 '2025-08-10 18:50:00', 23.25, 0.085, '{"Tip": 4.00}', 29.13, 'USD', NOW(), NOW()),

(UUID(), 'Subway', '200 King St, San Francisco, CA 94107',
 '[{"Footlong Tuna Sub": 9.50}, {"Chips": 1.75}, {"Coke": 2.00}]',
 '2025-10-05 12:15:00', 13.25, 0.085, '{"None": 0.00}', 14.38, 'USD', NOW(), NOW()),

(UUID(), 'Shake Shack', '5th Ave & 23rd St, New York, NY 10010',
 '[{"ShackBurger": 6.79}, {"Crinkle Fries": 3.29}, {"Lemonade": 2.59}]',
 '2025-11-04 13:45:00', 12.67, 0.0875, '{"Tip": 1.50}', 15.29, 'USD', NOW(), NOW()),

(UUID(), 'Dutch Bros Coffee', '700 Main St, Sacramento, CA 95814',
 '[{"Caramelizer": 5.75}, {"Muffin Top": 3.00}]',
 '2025-09-25 07:40:00', 8.75, 0.0825, '{"Tip": 1.00}', 10.22, 'USD', NOW(), NOW()),

(UUID(), 'Buffalo Wild Wings', '1500 Sports Blvd, Austin, TX 78701',
 '[{"12 Wings": 14.99}, {"Beer Pint": 6.00}]',
 '2025-10-11 19:10:00', 20.99, 0.085, '{"Tip": 3.00}', 26.64, 'USD', NOW(), NOW()),

(UUID(), 'Panda Express', '600 E Main St, Los Angeles, CA 90012',
 '[{"Orange Chicken Bowl": 9.25}, {"Spring Rolls": 2.75}]',
 '2025-10-09 11:45:00', 12.00, 0.09, '{"None": 0.00}', 13.08, 'USD', NOW(), NOW()),

(UUID(), 'Peet\'s Coffee', '300 University Ave, Palo Alto, CA 94301',
 '[{"Cappuccino": 4.50}, {"Bagel": 3.25}]',
 '2025-08-19 08:25:00', 7.75, 0.085, '{"Tip": 1.00}', 9.39, 'USD', NOW(), NOW()),

(UUID(), 'The Habit Burger Grill', '1450 Main St, Irvine, CA 92614',
 '[{"Charburger": 6.75}, {"Fries": 2.25}, {"Drink": 2.00}]',
 '2025-09-28 17:40:00', 11.00, 0.085, '{"None": 0.00}', 11.94, 'USD', NOW(), NOW()),

(UUID(), 'IHOP', '400 Sunrise Blvd, Roseville, CA 95661',
 '[{"Pancake Combo": 12.25}, {"Coffee": 3.25}]',
 '2025-10-18 09:10:00', 15.50, 0.085, '{"Tip": 2.00}', 18.83, 'USD', NOW(), NOW()),

(UUID(), 'Denny\'s', '2100 El Camino Real, Redwood City, CA 94063',
 '[{"Grand Slam": 11.99}, {"Orange Juice": 3.50}]',
 '2025-10-25 08:50:00', 15.49, 0.0825, '{"Tip": 2.00}', 18.67, 'USD', NOW(), NOW()),

(UUID(), 'BJ\'s Restaurant & Brewhouse', '400 Great Mall Dr, Milpitas, CA 95035',
 '[{"Deep Dish Pizza": 18.25}, {"Root Beer": 3.75}]',
 '2025-11-01 18:30:00', 22.00, 0.09, '{"Tip": 3.00}', 26.98, 'USD', NOW(), NOW()),

(UUID(), 'Krispy Kreme', '123 Donut Ave, Fresno, CA 93721',
 '[{"Dozen Original Glazed": 13.99}, {"Coffee": 2.50}]',
 '2025-10-30 07:20:00', 16.49, 0.085, '{"None": 0.00}', 17.89, 'USD', NOW(), NOW()),

(UUID(), 'Cold Stone Creamery', '200 Ice Cream Blvd, Anaheim, CA 92805',
 '[{"Cookie Dough Ice Cream": 5.75}, {"Waffle Cone": 1.50}]',
 '2025-09-19 15:10:00', 7.25, 0.085, '{"None": 0.00}', 7.86, 'USD', NOW(), NOW()),

(UUID(), 'Applebee\'s Grill + Bar', '3200 Sunset Blvd, Los Angeles, CA 90026',
 '[{"BBQ Ribs": 17.50}, {"Beer": 5.50}, {"Fries": 3.00}]',
 '2025-11-02 20:10:00', 26.00, 0.085, '{"Tip": 4.00}', 32.21, 'USD', NOW(), NOW()
 
 );

