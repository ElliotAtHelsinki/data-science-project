from django.http import HttpResponse, JsonResponse
from datetime import datetime
import pandas as pd
import statsmodels.api as sm

station = 'Kamppi (M)'
exogenous = ['rain (mm)', 'temperature_2m (°C)'] + ['mon', 'tue', 'wed', 'thu', 'fri', 'sat']

departure_data = pd.read_csv('../datasets/' + station +  "final_data.csv")
return_data = pd.read_csv('../datasets/' + station + '_return_hourly_aggregate.csv')
departure_data['Departure'] = pd.to_datetime(departure_data['Departure'], format='mixed')
return_data['Return'] = pd.to_datetime(return_data['Return'], format='mixed')

departure_data.set_index(departure_data['Departure'], inplace=True)
return_data.set_index(return_data['Return'], inplace=True)

departure_data['trip'] = pd.to_numeric(departure_data['trip'], errors='coerce')
return_data['trip'] = pd.to_numeric(return_data['trip'], errors='coerce')

departure_data = departure_data.dropna(axis=1)
return_data = return_data.dropna(axis=1)

departure_mod = sm.tsa.statespace.SARIMAX(departure_data['trip'], order=(1,1,0), exog=departure_data[exogenous], seasonal_order=(0,0,0,0), freq='h')
departure_res = departure_mod.fit(disp=False)

return_mod = sm.tsa.statespace.SARIMAX(return_data['trip'], order=(1, 1, 1), seasonal_order=(0, 1, 0, 24), freq='h')
return_res = return_mod.fit(disp=False)

def index(request):
  return HttpResponse('You\'re at the app index.')


def predict(request):
  if request.method == 'GET':
    current = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    timestamp = request.GET.get('timestamp', current)
    ts = timestamp

    defaultBikeCount = 20

    departingCount = -1
    if departure_data.index.max() >= pd.to_datetime(timestamp):
      ls = departure_data[departure_data['Departure'] == ts]['trip'].tolist()
      if len(ls) != 0:
        departingCount = ls[0]
      else:
        pass
    else:
      departForecast = departure_res.forecast(timestamp)
      departingCount = round(departForecast[-1])

    returningCount = -1
    if return_data.index.max() >= pd.to_datetime(timestamp):
      ls = return_data[return_data['Return'] == ts]['trip'].tolist()
      if len(ls) != 0:
        returningCount = ls[0]
      else:
        pass
    else:
      returnForecast = return_res.forecast(timestamp)
      returningCount = round(returnForecast[-1])

    bikeAtStationCount = defaultBikeCount - departingCount + returningCount

    result = {
        'timestamp': timestamp,
        'departingCount': departingCount,
        'returningCount': returningCount,
        'bikeAtStationCount': bikeAtStationCount
    }

    return JsonResponse(result)
