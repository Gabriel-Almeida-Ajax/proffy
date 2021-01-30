import React, { ReactElement, useState, FormEvent } from 'react';
import PageHeader from '../../../components/PageHeader';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import api from '../../../services/api';
import Input from '../../../components/Input';
import Textarea from '../../../components/Textarea';
import Select from '../../../components/Select';

import warningIcon from '../../../assets/images/icons/warning.svg';
import './../styles.css';

function Singin(): ReactElement {

    const history = useHistory();

  const [name, setName] = useState('');
  const [cost, setCost] = useState('');
  const [email, setEmail] = useState('');

  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: '', to: '' },
  ]);

  function addNewScheduleItem() {
    setScheduleItems([...scheduleItems,
    { week_day: 0, from: '', to: '' },
    ]);
  }

  function handleCreateClass(e: FormEvent) {
    e.preventDefault();

    api.post('classes', {
      name,
      email,
      cost: Number(cost),
      schedule: scheduleItems,
    }).then(() => {
      alert('Cadastro realizado com sucesso!');

      history.push('/');
    }).catch(() => {
      alert('Erro no cadastro.');
    });
  }

  function setScheduleItemValue(position: number, field: string, value: string) {
    const updateScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if (index === position) {
        return { ...scheduleItem, [field]: value };
      }

      return scheduleItem;
    });

    setScheduleItems(updateScheduleItems);
  }
return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="Registre-se."
        description="Crie sua conta do Studio Build"
      />
      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>
            <Input
              name="name"
              label="Nome Completo"
              value={name}
              onChange={(e) => { setName(e.target.value) }}
            />

            <Input
              name="email"
              label="Digite seu email"
              value={email}
              onChange={(e) => { setEmail(e.target.value) }}
            />

           
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
              Importante! 
              {' '}
              <br />
              Preencha todos os dados
            </p>
            <button type="submit">
              Registrar-se
            </button>
          </footer>
        </form>
      </main>
      </div>
    
      );
}

export default Singin;