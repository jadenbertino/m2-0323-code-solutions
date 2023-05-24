-- Find the first and last name of every customer who rented 'Magic Mallrats'.

select "c"."firstName",
       "c"."lastName",
from "customers" as "c"
join "rentals" using ("customerId")
join "inventory" using ("inventoryId")
join "films" using ("filmId")
where "films"."title" = 'Magic Mallrats';