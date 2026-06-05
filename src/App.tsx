import { useState } from 'react';
import './App.css';
import Modal from './components/Modal/Modal';

function App() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <>
      <header>
        <h1>React Forms</h1>

        <button
          type="button"
          className="counter"
          onClick={() => setIsOpenModal(true)}
        >
          Uncontrolled Components
        </button>
        <button type="button" className="counter">
          React Hook Form
        </button>
      </header>

      <Modal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)}>
        tut tut tutu tu tut
      </Modal>
    </>
  );
}

export default App;
