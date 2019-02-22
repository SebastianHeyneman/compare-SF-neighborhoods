# Homelessness Data Source

This is the data source for `homelessness per capita` in my project "Understanding San Francisco."

## Steps

1: Download the 311 reports data available through DataSF's [portal](https://data.sfgov.org/City-Infrastructure/311-Cases/vw6y-z8j6).

2: Generate a table with every encampment report and its set of [coordinates](encampmentsPerCapita.R) to assign each encampment report to a neighborhood. 

3: Match each report to a neighborhood, with the Python [script](reportPlusNeighborhood.py).

4: Generate a table with each neighborhood and the per capita encampments from 2018. 


## Acknowledgements

Thanks to the [GIS Stack Exchange](https://gis.stackexchange.com/questions/250172/finding-out-if-coordinate-is-within-shapefile-shp-using-pyshp/250195) for helping with the Python script to match incidents to neighborhoods. 
