-- List the first and last name of all customers, plus the total amount they've spent on rentals. Order them by total paid, descending.

select
  "c"."firstName",
  "c"."lastName",
  sum("p"."amount") as "totalSpent"
from "customers" as "c"
join "payments" as "p" using ("customerId")
group by "customerId"
order by "totalSpent" desc;