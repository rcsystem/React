import { ItemCounter } from "./shopping-cart/ItemCounter";

export function FirstStepsApp() {
  return (
    <>
      <h1>¡Carrito de Compras!</h1>
      <ItemCounter name="Nintendo Swith 2" quantity={1}/>
      <ItemCounter name="Pro Controller" quantity={2}/>
      <ItemCounter name="Super Smash" quantity={3}/>
    </>
  );
}
