from flask import Flask, jsonify, request 
from flask_cors import CORS # importerer cors for å tillate kobling fra andre domener 
from dotenv import load_dotenv # importerer dotenv for å lese det som står i .env filen og for å gjøre det tigjengelig i Python
import os # importeres for å hente ting skrevet i .env filen
import requests # dette importeres for at API-kall skal fungere
<<<<<<< HEAD
import mariadb # importeres for å kunne snakke med DB
=======
import mariadb # iporteres for å kunne snakke med DB
>>>>>>> aac72e825f8710b39aefc3a51b4475feb8ce9694

load_dotenv() # laster alt som står i .env filer

app = Flask(__name__)
CORS(app) # tillater tilkobling fra andre domener 


def db_connection(): # funskjonen for å koble til DB
        return mariadb.connect( # kobler på DB ved å bruke .env info 
           host=os.getenv('DB_HOST'), # host 
           user=os.getenv('DB_USER'), # bruker
           password=os.getenv('DB_PASS'), # passord
           database=os.getenv('DB_NAME') # database navn
        )

API_KEY = os.getenv('API_KEY') # henter API-nøkkel for å kunne hente værdata




@app.get('/weather') # route for værdata output
def weather(): # variabel 
    By = request.args.get('by') # henting av by ved bruk av query parametre
    Land = request.args.get('land') # henting av land ved bruk av query parametre
    
    if not By or not Land: # is setning som sjekker om både by og land er oppgitt 
         jsonify({ "error": 'Vennligst oppgi både by og land'}), 400 # feilmeldingen om de er ikke det 
 
     
   
    return søk_statistikk(By, Land) 

def søk_statistikk(By, Land): # funskjon for håndtering lagring i db 
    
    url = f"https://api.weatherapi.com/v1/current.json?key={API_KEY}&q={By},{Land}" # url for henting av værdata
    response = requests.get(url).json() # gjør et get kall til API-et og konverterer responsen til JSON
 

# Sjekk om API-et gir error
    if response.get('error'):
        return jsonify({"error": 'Ugyldig by eller land'}), 400

# Hent landet som API-et sier byen ligger i
    api_land = response.get('location', {}).get('country')

# Sjekk om det matcher brukerens input (case-insensitive)
    if api_land.lower() != Land.lower():
        return jsonify({"error": f"Byen {By} finnes ikke i {Land}"}), 400
    
    Forbokstav_Land = Land.strip().capitalize() # dette gjør at første bokstav på et land skal være stor når den blir lagret i DB 
    Forbokstav_By = By.strip().capitalize() # dette gjør at første bokstav på et sted skal være stor når den blir lagret i DB




    connection = db_connection() # prøver å koble til db
    cursor = connection.cursor() # lager en cursor for å utføre SQL spørringer som skal brukes til å kommunisere med DB
    
    
    # cursor execute for å snakke med DB og lagre informasjon  
    cursor.execute("""
                   INSERT INTO søk_statistikk (Sted_navn, Land_navn, Antall_ganger_søkt)
                   VALUES (%s, %s, 1)
                   ON DUPLICATE KEY UPDATE Antall_ganger_søkt = Antall_ganger_søkt + 1
                """, (Forbokstav_By, Forbokstav_Land))
    connection.commit() #  bekrefter endringer i DB
    
    # denne cursor execute henter antall søk for spesfikke steder 
    cursor.execute("SELECT Antall_ganger_søkt FROM søk_statistikk WHERE Sted_navn = %s AND Land_navn = %s", (Forbokstav_By, Forbokstav_Land))
    row = cursor.fetchone() # henter raden med antall søk 
    antall_søk = row[0] - 1 if row else 0 # henter antall søk fra bestemt rad, eksluderer den nåværende søket
    
    cursor.close() # kommunikasjon med DB avsluttes
    connection.close() # koblingen til DB avsluttes

    
    response['antall_søk'] = antall_søk # legger antall søk i API respons for å kunne vite hvor mange ganger et sted har blitt søkt på 
    return jsonify(response) # returnerer API responsen som JSON

 
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000, debug=True)