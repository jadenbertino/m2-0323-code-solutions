update "countries"
   set "name" = 'Murica'
 where "name" = 'United States';

select * from "countries" where "name" = 'Murica';