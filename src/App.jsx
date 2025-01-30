import { useEffect, useState } from 'react';
import styles from './app.module.css';
import { ref, onValue, push, set, remove } from 'firebase/database';
import { db } from './firebase';

function App() {
  const [caseArr, setCaseArr] = useState({});
  const [loading, setLoading] = useState(false);
  const [nameCase, setNameCase] = useState('');
  const [idForChange, setIdForChange] = useState(null);
  const [isSort, setIsSort] = useState(false);

  useEffect(() => {
    const caseDbRef = ref(db, 'tasks');

    return onValue(caseDbRef, (snapshot) => {
      const loadedCase = snapshot.val() || {};
      setCaseArr(loadedCase);

      setLoading(false);
      
    });
  }, [])

//Добавление дел
  const requestAddCase = () => {
    setLoading(true);
    const caseAddRef = ref(db, 'tasks');
    push(caseAddRef, {
      title: nameCase
    })
      .then(setLoading(false));
    }

//Удаление дел
  const requestDeleteCase = (productId) => {
      const caseRemoveRef = ref(db, `tasks/${productId}`);
      remove(caseRemoveRef);
  }

//Изменение дел
  const RequestChangeCase = () => {
    setLoading(true);
    const caseChangeRef = ref(db, `tasks/${idForChange}`);
    set(caseChangeRef, {
      title: nameCase
    })
      .then(setLoading(false))
  }

//Отмена обновления страницы
  const onCancelTheReboot = (event) => {
    event.preventDefault();
  }

  return (
    <div className={styles.app}>
      {loading ? <div className={styles.loading}></div> : Object.entries(caseArr).map(([id, {title}]) => (
        <div key={id} className={styles.caseAndButtonDelete}>
            <h1 
                onClick={() => setIdForChange(id)} 
                className={idForChange === id ? styles.green : styles.case}
            >
            {title}
            </h1>
            <button 
                className={styles.buttonDelete} 
                onClick={() => requestDeleteCase(id)}
            >
            Удалить
            </button>
        </div>
      ))}
      <form onSubmit={(e) => onCancelTheReboot(e)} className={styles.appForm}>
        <input
            className={styles.inputCase} 
            type="text" 
            name='case'
            placeholder='Введите дело на сегодня'
            onChange={({target}) => setNameCase(target.value)}
        />
        <h2 className={styles.changeCase}>Выбери дело чтобы изменить</h2>
        <div className={styles.buttons}>
            <button
                className={styles.button} 
                onClick={requestAddCase}
              >
                Добавить
            </button>
            <button 
                className={styles.button}
                onClick={() => setIsSort(bool => !bool)}
            >
              {isSort ? "Отключить сортировку" : "Отсортировать"}
            </button>
            <button
                className={styles.button}
                onClick={RequestChangeCase}
            >
              Изменить
            </button>
        </div>
      </form>
    </div>
  )
}

export default App
