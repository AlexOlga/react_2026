import { useState, type ReactNode } from 'react';
import './App.css';
import Modal from './components/Modal/Modal';
import UncontrolledForms from './components/UncontrolledForms';

import { useForms } from './store/store';
import CardList from './components/CardList';
import ReactHookForm from './components/ReactHookForm';

function App() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [childrenModal, setChildrenModal] = useState<null | ReactNode>(null);
  const users = useForms((state) => state.users);

  const onClose = () => {
    setIsOpenModal(false);
    setChildrenModal(null);
  };
  const openUncontrolledForm = () => {
    setIsOpenModal(true);
    setChildrenModal(<UncontrolledForms onClose={onClose} />);
  };
  const openReactHookForm = () => {
    setIsOpenModal(true);
    setChildrenModal(<ReactHookForm onClose={onClose}/>);
  };

  return (
    <>
      <header>
        <h1>React Forms</h1>

        <button
          type="button"
          className="counter"
          onClick={openUncontrolledForm}>
          Uncontrolled Forms
        </button>
        <button type="button" className="counter" onClick={openReactHookForm}>
          React Hook Form
        </button>
      </header>
      <main>
        <CardList list={users} />
      </main>

      <Modal isOpen={isOpenModal} onClose={onClose}>
        {childrenModal}
      </Modal>
    </>
  );
}

export default App;
