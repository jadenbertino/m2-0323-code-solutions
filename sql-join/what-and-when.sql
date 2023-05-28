-- Use two joins to select the "releaseYear" and "genres"."name" of the film with the "title" 'Boogie Amelie'. 

select "films"."title",
       "films"."releaseYear",
       "genres"."name" as "genre"
from "films"
join "filmGenre" using ("filmId")
join "genres" using ("genreId")
where "films"."title" = 'Boogie Amelie';