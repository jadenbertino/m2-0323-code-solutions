-- List the number of "cities" per country in the "countries" table.

select 
  "countries"."name" as "country",
  count(*) as "citiesCount"
from "cities"
join "countries" using ("countryId")
group by "countries"."name"
order by "citiesCount" desc;