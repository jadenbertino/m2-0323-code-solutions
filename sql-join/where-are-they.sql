-- Generate a list of all addresses in the system that includes their "line1", "city"."name", and "district".
-- Bragging rights if you get the name of the country in there too.

select "addresses"."line1" as "streetAddress",
       "cities"."name" as "city",
       "addresses"."district",
       "countries"."name" as "country"
from "addresses"
join "cities" using ("cityId")
join "countries" using ("countryId")
order by "country";