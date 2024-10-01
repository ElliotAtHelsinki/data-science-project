import pandas as pd
from os import listdir
import openpyxl

weather_df = pd.read_csv('datasets/weather_hourly_helsinki.csv')

# In the weather data, the first two rows contain extra data
# Let's save these for possible later use and remove them from weather_df
headers = weather_df.loc[0:2, :]

weather_df = weather_df.loc[1:, :]
weather_df.columns = weather_df.iloc[0]
weather_df = weather_df.loc[2:, :]

bike_df = pd.DataFrame(columns=['Departure', 'Return', 'Departure station id', 'Departure station name', 'Return station id', 'Return station name', 'Covered distance (m)', 'Duration (sec.)'])

print('Loading datasets...\n')
for dataset in listdir('datasets'):
  if dataset == 'weather_hourly_helsinki.csv':
    continue

  temp_df = pd.read_csv('datasets/' + dataset, low_memory=False)
  bike_df = pd.concat([bike_df, temp_df])

bike_df['Departure'] = pd.to_datetime(bike_df['Departure'], format='mixed')
bike_df['Return'] = pd.to_datetime(bike_df['Return'], format='mixed')

for station in bike_df['Departure station name'].values.tolist():
  print('Aggregating over stations\n')
  columns = ['Departure', 'Departure station name', 'Departure station id']
  temp_station = bike_df.loc[bike_df['Departure station name'] == station, columns]
  temp_station['trip'] = 1

  temp_station = temp_station.resample(freq='H', on='Departure').trip.sum()

  print('Printing aggregate to csv\n')
  temp_station.to_csv(station + 'hourly_aggregate.csv')
