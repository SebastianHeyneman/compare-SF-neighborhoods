library("dplyr")

#access the file: https://data.sfgov.org/Public-Safety/Police-Department-Incident-Reports-Historical-2003/tmnf-yvry/data
reports <- read.csv("/Users/One/Downloads/Police_Department_Incident_Reports__Historical_2003_to_May_2018.csv")

#access the file: http://default.sfplanning.org/publications_reports/SF_NGBD_SocioEconomic_Profiles/2012-2016_ACS_Profile_Neighborhoods_Final.pdf
neighborhoods <- read.csv("/Volumes/NONAME/user/Projects/Blog/Neighborhoods/SanFranciscoACS2016.csv")

#assign each crime to a neighborhood
incidents <- reports %>% filter(year == "2018") %>% 
  mutate(IncidntNum = as.factor(IncidntNum),
         latitude=X,
         longitude=Y) %>%
  select(IncidntNum, latitude, longitude) %>%
  unique()

#write to CSV to feed into Python script for assigning each crime a neighborhood
write.table(incidents, file = "incidents.csv", row.names =FALSE, col.names = TRUE,sep = ",")

#import the table with incidents assigned to a particular neighborhood
incidentsMatched <- read.csv("/Volumes/NONAME/user/Projects/Blog/Neighborhoods/CrimeData/incidentsMatchedNeighborhood.csv")

#compile summary table
incidentsPerNeighorhood <- reports %>% 
  left_join(incidentsMatched, by = "IncidntNum") %>%
  left_join(neighborhoods, by = "nhood") %>%
  filter(year == "2018", Category != "NON-CRIMINAL") %>%
  group_by(nhood) %>%
  summarize(population1000s = unique(population) / 1000,
            arrests = length(unique(IncidntNum)),
            arrestspercapita = arrests / population1000s)

#export to CSV
write.table(incidentsPerNeighorhood, file = "incidentsPerNeighorhood.csv", row.names =FALSE, col.names = TRUE,sep = ",")
