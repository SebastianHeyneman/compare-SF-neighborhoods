# Fog Data Source

This is the data source for `median hours of summertime fog` in my project "Understanding San Francisco."

## Steps

1: Download the decadal summertime fog [dataset](http://climate.calcommons.org/datasets/summertime-fog) published by the United States Geological Survey + Climate Commons.

2: Get the shapefiles for each neighborhood, available through [DataSF](https://data.sfgov.org/Geographic-Locations-and-Boundaries/Analysis-Neighborhoods/p5b7-5n3h).

3: Calculate the mean hours of fog per neighborhood, in a GIS software like [QGIS](https://www.qgis.org/en/site/).

This is my [QGIS file](FogbyNeighborhood.qgz) with the fog analysis.

## Acknowledgements

Thanks to the [GIS Stack Exchange](https://gis.stackexchange.com/questions/311573/how-do-i-turn-a-fog-belt-zone-raster-map-into-a-geographic-map-of-expected-fog/311580?noredirect=1#comment507826_311580) for helping with analysis on the summertime fog raster files.

Additionally, thank you to [Dr. Alicia Torregrosa](https://www.usgs.gov/staff-profiles/alicia-torregrosa) for explaining the summertime fog research. I encourage you to take a look at her excellent [map](http://journal.baygeo.org/karlthefog/) depicting fog and low cloud cover in the San Francisco Bay Area.
 
