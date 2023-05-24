-- Select the 10 largest payment amounts, including the first and last name of the customer who paid. 

select "p"."amount", "c"."firstName", "c"."lastName"
from "payments" as "p"
join "customers" as "c" using ("customerId")
order by "p"."amount" desc
limit 10;