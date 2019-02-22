# Fog Data Source

This is the data source for `median hours of summertime fog` in my project "Understanding San Francisco."

## Steps

1: Download the decadal summertime fog [dataset](http://climate.calcommons.org/datasets/summertime-fog) published by the United States Geological Survey + Climate Commons.

2: Get the shapefiles for each neighborhood, available through [DataSF](https://data.sfgov.org/Geographic-Locations-and-Boundaries/Analysis-Neighborhoods/p5b7-5n3h).

3: Calculate the mean hours of fog per neighborhood, in a GIS software like [QGIS](.

1: Download the 311 reports data available through DataSF's [portal](https://data.sfgov.org/City-Infrastructure/311-Cases/vw6y-z8j6).

2: Generate a table with every encampment report and its set of [coordinates](encampmentsPerCapita.R) to assign each encampment report to a neighborhood. 

3: Match each report to a neighborhood, with the Python [script](reportPlusNeighborhood.py).

4: Generate a table with each neighborhood and the per capita encampments from 2018. 


## Acknowledgements

Thanks to the [GIS Stack Exchange](https://gis.stackexchange.com/questions/250172/finding-out-if-coordinate-is-within-shapefile-shp-using-pyshp/250195) for helping with the Python script to match incidents to neighborhoods. 
