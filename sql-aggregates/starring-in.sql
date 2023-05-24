-- List the genres of movies (and how many) that 'Lisa Monroe' appeared in. She appeared in a lot of films!

select
  "genres"."name" as "genre",
  count(*) as "appearances"
from "actors"
join "castMembers" using ("actorId")
join "filmGenre" using ("filmId")
join "genres" using ("genreId")
group by "genre";