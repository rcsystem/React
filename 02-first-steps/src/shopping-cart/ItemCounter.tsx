<<<<<<< HEAD
import { useState } from 'react';

// import './ItemCounter.css';
import styles from './ItemCounter.module.css';
=======
import { useState } from "react";
>>>>>>> 2da5d566e35c7ea8c3c0adad5d21763789560775

interface Props {
  name: string;
  quantity?: number;
}

export const ItemCounter = ({ name, quantity = 1 }: Props) => {
  const [count, setCount] = useState(quantity);

  const handleAdd = () => {
    setCount(count + 1);
  };

  const handleSubtract = () => {
    if (count === 1) return;

    setCount(count - 1);
  };

<<<<<<< HEAD
  return (
    <section
      className={styles.itemRow}
      // style={{
      //   display: 'flex',
      //   alignItems: 'center',
      //   gap: 10,
      //   marginTop: 10,
      // }}
    >
      <span
        className={styles['item-text']}
        style={{
          color: count === 1 ? 'red' : 'black',
        }}
      >
        {name}
      </span>
      <button onClick={handleAdd}>+1</button>
      <span>{count}</span>
      <button onClick={handleSubtract}>-1</button>
=======
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

>>>>>>> 2da5d566e35c7ea8c3c0adad5d21763789560775
    </section>
  );
};
