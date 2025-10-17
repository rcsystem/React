import type { CSSProperties } from "react";

const firstName = "Rafael";
const lastName = "Cruz";
const favoriteGames = ["Zelda", "Mario", "Metroid"];
const isActive = true;
const address = {
  street: "123 Main St",
  city: "Anytown",
  country: "USA",
};

const myStyles: CSSProperties = {
  color: "blue",
  backgroundColor: "lightgray",
  padding: "10px",
  borderRadius: "5px",
};

export function MyawesomeApp() {
  return (
    <div>
      <h2>{firstName}</h2>
      <h3>{lastName}</h3>
      <ul>
        {favoriteGames.map((game) => (
          <li key={game}>{game}</li>
        ))}
      </ul>
      <p>{favoriteGames.join(", ")}</p>
      <p>{isActive.toString()}</p>
      <p>{isActive ? "Activo" : "Inactivo"}</p>
      <p style={myStyles}>{JSON.stringify(address)}</p>
    </div>
  );
}
