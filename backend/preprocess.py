import pandas as pd
import numpy as np
from sklearn.model_selection import TimeSeriesSplit
from datetime import datetime
import statsmodels.api as sm

stations = ['Kamppi (M)', 'Rautatientori - itä']
for station in stations:
    data = pd.read_csv('datasets/' + station + '_hourly_aggregate.csv')
    data['Departure'] = pd.to_datetime(data['Departure'], format='mixed')

    weather_df = pd.read_csv('datasets/weather_hourly_helsinki.csv')
    weather_df = weather_df.loc[1:, :]
    weather_df.columns = weather_df.iloc[0]
    weather_df = weather_df.loc[2:, :]
    weather_df['time'] = pd.to_datetime(weather_df['time'], format='mixed')

    data = pd.merge(weather_df, data, how='inner', left_on='time', right_on='Departure')
    data = data.drop(['time'], axis=1)

    data['temperature_2m (°C)'] = pd.to_numeric(data['temperature_2m (°C)'], errors='coerce')
    data['rain (mm)'] = pd.to_numeric(data['rain (mm)'], errors='coerce')
    data['trip'] = pd.to_numeric(data['trip'], errors='coerce')


    # generation of weekday & hour series
    datedata = pd.DataFrame()
    datedata['date'] = data['Departure']
    datedata['weekday'] = data['Departure'].dt.weekday
    days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat']
    for day in days:
        datedata[day] = 0
        datedata.loc[datedata['date'].dt.weekday == 0, day] = 1
    for i in range(0, 23):
        asd = 'hour' + str(i)
        days.append(asd)
        datedata[asd] = 0
        datedata.loc[datedata['date'].dt.hour == i, asd] = 1

    data = pd.merge(datedata, data, how='inner', left_on='date', right_on='Departure')
    data.set_index(data['Departure'], inplace=True)

    data.to_csv('datasets/' + station + "final_data.csv")

