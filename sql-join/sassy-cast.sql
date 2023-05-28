-- Use two joins to select the "firstName" and "lastName" of all actors that starred in the film 'Jersey Sassy'.

select "actors"."firstName",
       "actors"."lastName",
from "actors"
join "castMembers" using ("actorId")
join "films" using ("filmId")
where "films"."title" = 'Jersey Sassy';