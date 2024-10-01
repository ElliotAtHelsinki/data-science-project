import statsmodels as sm
import pandas as pd
# There are over 500 stations
# and this is a proof of concept
# so we will only take a few stations
stations = ['Jämeräntaival']

trips = pd.read_csv('../datasets/' + stations[0] + '_hourly_aggregate.csv')

pd.plotting()