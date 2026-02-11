import styles from "./vær.module.css"; // Importerer CSS-moduler for styling
import { useState } from "react"; // Importerer useState-hooken fra React
import { Analytics } from "@vercel/analytics/react"; // Importerer Analytics-komponenten fra Vercel Analytics
import { useEffect } from "react"; // Importerer useEffect-hooken fra React

// hoved komponenter for værappen
function VærApp() {
  const [Land, setLand] = useState(""); // State for landet
  const [By, setBy] = useState(""); // State for byen
  const [Vær, setVæret] = useState(null); // State for værdata

    // 👇 Logg IP når komponenten lastes (kaller API)
  useEffect(() => {
    fetch("/api/ip")
      .catch((err) => console.error("Kunne ikke logge IP:", err));
  }, []);


  // Funksjonen som håndterer innsending av skjemaet
  const handleSubmit = async (e) => {
    // kaller funksjonen når skjemaet sendes inn
    e.preventDefault(); // Forhindrer standard skjema-innsending
    await getVæret(); // Kaller funksjonen for å hente værdata
  };

  // Denne funksjonen henter værdata fra Flask-backenden
  const getVæret = async () => {
    // kaller funksjonen for å hente værdata
    if (!By || !Land) {
      // Sjekker om begge felt er fylt ut
      alert("Fyll ut begge felt!"); // Viser en alert hvis ikke
      return; // Avslutter funksjonen
    }

    try {
      // prøver å hente værdata
      const response = await fetch(
        // henter data for været fra backend-en
        `http://localhost:3000/weather?by=${By}&land=${Land}`,
      ); // backend url med By og Land som query parametre
      const json = await response.json(); // konverterer responsen til JSON

      // sjekker om landet fra API-responsen passer sammen med stedet brukeren har skrevet inn
      if (
        json.location.country.trim().toLowerCase() !== Land.trim().toLowerCase()
      ) {
        // sjekker om landet passer sammen med stedet
        alert("Skriv inn riktig land eller by!"); // om det ikke passer sammen, vises dette
        return; // avslutter funksjonen
      }

      setVæret(json); // setter værdata i state
    } catch (error) {
      // funksjon for å håndtere feil
      console.error("Feil i fetch:", error);
      alert("Noe gikk galt med å hente værdata."); // viser en alert om det oppstår en feil
    }
  };

  return (
    <form action="" onSubmit={handleSubmit} className={styles.container}>
      <div className={styles.innhold}>
        <input
          type="text"
          style={{ fontStyle: "italic" }}
          placeholder="Enter a country..."
          value={Land}
          className={styles.innhold}
          onChange={(e) => setLand(e.target.value)}
        ></input>
        <input
          type="text"
          style={{ fontStyle: "italic" }}
          placeholder="Enter a place..."
          value={By}
          className={styles.innhold}
          onChange={(e) => setBy(e.target.value)}
        ></input>
        <button className={styles.btn} type="submit">
          Enter
        </button>

        {Vær?.location &&
          Vær?.current && ( // Sjekker om værdata er tilgjengelig før output vises
            <div className={styles.weatherbox}>
              <h3>
                {Vær.location.name}, {Vær.location.country}
              </h3>
              <p>
                <b>Temperature:</b> {Vær.current.temp_c}°C
              </p>
              <p>
                <b>Condition:</b> {Vær.current.condition.text}
              </p>
              <p>
                <b>Humidity:</b> {Vær.current.humidity}
              </p>
              <p>
                <b>Wind:</b> {Vær.current.wind_kph} km/h
              </p>
              <p>
                <b>Time:</b> {Vær.location.localtime}
              </p>
              <div className={styles.bilde}>
                <img
                  id="current-icon"
                  src={`https:${Vær.current.condition.icon}`}
                  alt="Værikon"
                />

                <div className={styles.searchHistory}>
                  <b>{Vær.antall_søk} other have searched this place</b>
                </div>
              </div>
            </div>
          )}
        <Analytics />
      </div>
    </form>
  );
}

export default VærApp;
