import pandas as pd
from os import listdir

wdata = pd.read_csv("../datasets/weather_hourly_helsinki.csv")

# In the weather data, the first two rows contain extra data
# Let's save these for possible later use and remove them from wdata
headers = wdata.loc[0:2, :]

wdata = wdata.loc[1:, :]
wdata.columns = wdata.iloc[0]
wdata = wdata.loc[2:,:]

bikedata = pd.DataFrame(columns=
    ['Departure', 'Return', 
    'Departure station id', 'Departure station name',
    'Return station id', 'Return station name', 
    'Covered distance (m)', 'Duration (sec.)'])

for dataset in listdir('../datasets'):
    if dataset == 'weather_hourly_helsinki.csv':
        continue

    temp_df = pd.read_csv("../datasets/" + dataset)

    if temp_df.columns.tolist() != bikedata.columns.tolist():
        print(dataset, " columns don't match! \n")
        print(temp_df.columns)
        continue
    
    
    bikedata = pd.concat([bikedata, temp_df])




