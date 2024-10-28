# HSL Bike Helper [![MIT - License](https://img.shields.io/badge/License-MIT-2ea44f)](https://opensource.org/licenses/MIT) ![v - 1.0.0](https://img.shields.io/badge/v-1.0.0-blue) ![PRs Welcome](https://img.shields.io/badge/PRs-welcome-green.svg)

HSL Bike Helper is an app that predicts the number of bikes at stations in [`Helsinki`](https://hel.fi/) and [`Espoo`](https://espoo.fi/) at any hour using the [`SARIMA`](https://en.wikipedia.org/wiki/Autoregressive_integrated_moving_average) model.

### Repository
https://github.com/ElliotAtHelsinki/data-science-project  

### Installation
The application can be directly accessed via a web browser at the following addresses, without requiring any installation:  
\- **Frontend**: https://hsl-frontend.elliot-at-helsinki.eu   
\- **Backend**: https://hsl-backend.elliot-at-helsinki.eu/app/predict

Optionally, however, the application can be installed as a mobile or desktop app, since it is a PWA.

### Development
To run the `Django` backend locally, navigate to the `backend` folder and:
\- Source the `env`: `source env/bin/activate`  
\- Create an empty `.env` file: `touch .env`  
\- Install the dependencies: `pip install -r requirements.txt`  
\- Run the first two code blocks of the `main.ipynb` file  
\- Start the server: `python manage.py runserver`  

To run the `Next.js` frontend locally, navigate to the `frontend` folder and:  
\- Install the dependencies: `npm install`   
\- Start the application: `npm run dev`  
