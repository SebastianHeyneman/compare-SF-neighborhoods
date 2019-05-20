library(dplyr)

#access the file: https://data.sfgov.org/City-Infrastructure/311-Cases/vw6y-z8j6
cases <- read.csv("/Users/One/Downloads/311_Cases.csv")

#access the file: http://default.sfplanning.org/publications_reports/SF_NGBD_SocioEconomic_Profiles/2012-2016_ACS_Profile_Neighborhoods_Final.pdf
neighborhoods <- read.csv("/Volumes/NONAME/user/Projects/Blog/Neighborhoods/SanFranciscoACS2016.csv")

#assign each encampment report to a neighborhood
reports <- cases %>% 
  mutate(open_year = substr(as.character(Opened),7,10)) %>%
  filter(open_year == "2018", Request.Type == "Encampment Reports") %>%
  select(CaseID, Latitude, Longitude) %>% unique()

#write to CSV to feed into Python script for assigning each encampment report a neighborhood
write.table(reports, file = "reports.csv", row.names = FALSE, col.names = TRUE,sep = ",")

#import the table with incidents assigned to a particular neighborhood
reportsMatched <- read.csv("/Volumes/NONAME/user/Projects/Blog/Neighborhoods/EncampmentData/reportsMatchedNeighborhood.csv")

#compile summary table
reportsPerNeighorhood <- cases %>% 
  left_join(reportsMatched, by = "CaseID") %>%
  left_join(neighborhoods, by = "nhood") %>%
  mutate(open_year = substr(as.character(Opened),7,10)) %>% 
  filter(open_year == "2018", Request.Type == "Encampment Reports") %>%
  group_by(nhood) %>%
  summarize(population1000s = unique(population) / 1000,
            reports = length(unique(CaseID)),
            reportspercapita = reports / population1000s)

#export to CSV
write.table(reportsPerNeighorhood, file = "reportsPerNeighorhood.csv", row.names =FALSE, col.names = TRUE,sep = ",")
 
