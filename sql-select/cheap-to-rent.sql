select "filmId",
       "title"
  from "films"
  where "rentalRate" < 1
  order by "rentalRate"
  limit 50;