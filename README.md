# San Francisco, by the numbers

This is the data source for `crimes per capita` in my project "Understanding San Francisco."

## Steps

1: Download the crime data available through DataSF's [portal](https://data.sfgov.org/Public-Safety/Police-Department-Incident-Reports-Historical-2003/tmnf-yvry/data).

2: Generate a table with every crime and its set of coordinates with the R [script](/CrimesPerCapita.R), so we can assign each crime to a neighborhood. 

3: Match each crime to a neighborhood, with the Python [script](/incidentPlusNeighborhood.py).

4: Generate a table with each neighborhood and the per capita crimes from 2018. 


## Acknowledgements

Thanks to the [GIS Stack Exchange](https://gis.stackexchange.com/questions/250172/finding-out-if-coordinate-is-within-shapefile-shp-using-pyshp/250195) for helping with the Python script to match incidents to neighborhoods. 
