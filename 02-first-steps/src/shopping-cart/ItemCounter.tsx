import { useState } from "react";

interface Props {
  name: string;
  quantity?: number;

}



export const ItemCounter = ({name, quantity}:Props) => {

  const [count, setCount] = useState(quantity ?? 1);

  const handleAdd = () => {
    setCount(count + 1);
  }

  const handleSubtract = () => {
    if(count === 1) return;
    setCount(count - 1);
  }


  return (
    <section style={{
      display:'flex',
      alignItems: 'center',
      gap: 10,
      marginTop: 10,
    }}>
      <span style={{
        width:150,
      }}>{name}</span>
      <button
      onClick={handleAdd}
      >+1</button>
      <span>{count}</span>
      <button onClick={handleSubtract}>-1</button>

    </section>
  )
}
