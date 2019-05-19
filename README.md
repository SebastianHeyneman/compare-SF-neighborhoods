# Compare Neighborhoods

Inspired by Justin Gage's [This is America](https://justinsgage.com/dataViz/united-states-by-state.html), this visualization compares each of the neighborhoods in San Francisco.

It allows for exploration along these dimensions:

- Population
- Population Density
- Income
- Racial Diversity
- Povetry
- Home Value
- Unemployment
- Crime
- Homelessness
- Fog 
- Liquefaction

## Data Sources

It pulls data from:

- [2012-2016 American Community Survey](https://factfinder.census.gov/faces/tableservices/jsf/pages/productview.xhtml?src=bkmk)
- [Police Department Incident Reports](https://data.sfgov.org/Public-Safety/Police-Department-Incident-Reports-Historical-2003/tmnf-yvry/data)
- [311 Cases](https://data.sfgov.org/City-Infrastructure/311-Cases/vw6y-z8j6)
- [San Francisco Seismic Hazard Zones](https://data.sfgov.org/City-Infrastructure/San-Francisco-Seismic-Hazard-Zones/7ahv-68ap/data)
- [Summertime Fog & Coastal Low Cloud Dataset](http://climate.calcommons.org/datasets/summertime-fog)

The data is transformed with Python scripts from the [crime](https://github.com/SeabassWells/understand-sf/tree/master/crime), [fog](https://github.com/SeabassWells/understand-sf/tree/master/fog), [homelessness](https://github.com/SeabassWells/understand-sf/tree/master/homelessness) and [liquefaction](https://github.com/SeabassWells/understand-sf/tree/master/liquefaction) folders.
