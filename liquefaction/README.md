# Liquefaction

This is the data source for `Percent of land area in a Liquefaction or Landslide zone` in my project "Understanding San Francisco."

## Steps

1: Download the San Francisco Seismic Hazard Zones shapefile from [DataSF](https://data.sfgov.org/City-Infrastructure/San-Francisco-Seismic-Hazard-Zones/7ahv-68ap/data).

2: Get the shapefiles for each neighborhood, available as well through [DataSF](https://data.sfgov.org/Geographic-Locations-and-Boundaries/Analysis-Neighborhoods/p5b7-5n3h).

3: Use a GIS software, like [QGIS](https://www.qgis.org/en/site/), to calculate the percent of area in each neighborhood that falls within a seismic hazard zone.

This is my [QGIS file](liquefaction.qgz) with the seismic hazard zone analysis.

## Acknowledgements

Thanks to the [GIS Stack Exchange](https://gis.stackexchange.com/questions/313149/how-do-i-find-the-percent-overlap-between-two-shapefiles-in-qgis/313156#313156) for helping with analysis on the shapefiles.
 
