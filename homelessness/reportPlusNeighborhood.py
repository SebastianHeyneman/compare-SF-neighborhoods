from operator import itemgetter
import shapefile as shp
from shapely.geometry import Point
import csv
from shapely.geometry.polygon import Polygon


fileName = 'reports.csv'
#shapefile with polygons representing each neighborhood (source: https://data.sfgov.org/Geographic-Locations-and-Boundaries/Analysis-Neighborhoods/p5b7-5n3h)
sf = shp.Reader("geo_export_e4a5df38-1472-442c-80ec-f86908cebd69")
sfRec = sf.records() #Read records from the shapefile

n = 0
m = 1
coor = ''
coorDict = {}
matplotDict = []
muniFinal = {}

#transform the polygon representing each neighborhood into a list of coordinates
for shape in sf.shapeRecords():
    x = [i[0] for i in shape.shape.points[:]] #Initially for use in matplotlib to check shapefile
    y = [i[1] for i in shape.shape.points[:]] #Initially for use in matplotlib to check shapefile
    for i in x:
        matplotDict.append((x[x.index(i)],y[x.index(i)])) #Convert coordinates to be read by Shapely pkg

    munishp = Polygon(matplotDict)

    nhood = [j[0] for j in sfRec]
    muniFinal[nhood[n]] = munishp #Store shape in dictionary with key of neighborhood
    matplotDict = [] #refresh coordinate store for next shape
    n += 1

#write the output CSV with each incident and its coordinates
with open(fileName) as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        coor = (row['Latitude'],row['Longitude'])
        rlat = float(row['Latitude'])
        rlong = float(row['Longitude'])
        if coor == ' ,   ' or coor == ', ':
            coorDict[row['CaseID']] = 'No Data' #PrimaryKey is my primary key that I will use to write the data back into the .csv
        else:
            if float(row['Longitude']) > 0:
                coorDict[row['CaseID']] = (rlat,rlong)
            else:
                coorDict[row['CaseID']] = (rlong,rlat)
        m += 1

rows = [["CaseID", "nhood"]]

#pair each incident to a neighborhood based on its coordinates
for j in coorDict:
    for k in muniFinal:
        if muniFinal[k].contains(Point(coorDict[j])): #check each neigbhorhood, trigger when it finds a match
            entry = j
            neighborhood = k
            entry = [entry, neighborhood]
            rows.append(entry)
 
#write the completed file
with open("reportsMatchedNeighborhood.csv", "w") as f:
    writer = csv.writer(f)
    writer.writerows(rows)
