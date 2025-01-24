import { useEffect, useState } from 'react';
import styles from './app.module.css';

function App() {
  const [caseArr, setCaseArr] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nameCase, setNameCase] = useState('');
  const [idForChange, setIdForChange] = useState(null);
  const [isSort, setIsSort] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetch('http://localhost:3000/products')
        .then(data => data.json())
        .then(caseItem => {
          setCaseArr(caseItem)
          if (isSort) {
            setCaseArr(itemArr => itemArr.sort((a, b) => a.title.localeCompare(b.title)))
          }
          })
        .finally(() => setLoading(false));
  }, [isSort])

  const requestAddPhone = () => {

    if (nameCase) {
      fetch('http://localhost:3000/products', {
        method: 'POST',
        headers: {'Content-type': 'application/json;charset=utf-8'},
        body: JSON.stringify({
          title: nameCase,
        })
      })
      .then(rawResponse => rawResponse.json())
      .finally();
      }
    }

  const requestDeletePhone = (productId) => {

      fetch(`http://localhost:3000/products/${productId}`, {
        method: 'DELETE',
      })
      .then(rawResponse => rawResponse.json())
      .finally();
  }

  const requestChangePhone = () => {

      fetch(`http://localhost:3000/products/${idForChange}`, {
        method: 'PUT',
        headers: {'Content-type': 'application/json;charset=utf-8'},
        body: JSON.stringify({
          title: nameCase,
        })
      })
      .then(rawResponse => rawResponse.json())
      .finally();
  }

  console.log(isSort)
  return (
    <div className={styles.app}>
      {loading ? <div className={styles.loading}></div> : caseArr.map((product) => (
        <div key={product.id} className={styles.caseAndButtonDelete}>
            <h1 
                onClick={() => setIdForChange(product.id)} 
                className={idForChange === product.id ? styles.red : styles.case}
            >
            {product.title}
            </h1>
            <button 
                className={styles.buttonDelete} 
                onClick={() => requestDeletePhone(product.id)}
            >
            Удалить
            </button>
        </div>
      ))}
      <form className={styles.appForm}>
        <input
            className={styles.inputCase} 
            type="text" 
            placeholder='Введите дело на сегодня'
            onChange={({target}) => setNameCase(target.value)}
        />
        <h2 className={styles.changeCase}>Выбери дело чтобы изменить</h2>
        <div className={styles.buttons}>
            <button
                className={styles.button} 
                onClick={requestAddPhone}
              >
                Добавить
            </button>
            <button
                className={styles.button}
                onClick={requestChangePhone}
            >
              Изменить
            </button>
        </div>
      </form>
            <button 
                className={styles.buttonSort}
                onClick={() => setIsSort(bool => !bool)}
            >
              {isSort ? "Отключить сортировку" : "Отсортировать"}
            </button>
    </div>
  )
}

export default App
