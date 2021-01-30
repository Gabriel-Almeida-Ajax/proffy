import React, { ReactElement, useState, FormEvent } from 'react';
import PageHeader from '../../../components/PageHeader';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import api from '../../../services/api';
import Input from '../../../components/Input';
import Textarea from '../../../components/Textarea';
import Select from '../../../components/Select';

import warningIcon from '../../../assets/images/icons/warning.svg';
import './styles.css';
import googleIcon from "../../../assets/images/pesquisa.svg";

function Singin(): ReactElement {

    const history = useHistory();

  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [bio, setBio] = useState('');
  const [whatsapp, setWhatsapp] = useState('');

  const [subject, setSubject] = useState('');
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
      whatsapp: "undefined",
      bio: "undefined",
      subject: "undefined",
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
              name="user"
              label="Email"
              value={name}
              onChange={(e) => { setName(e.target.value) }}
            />

            <Input
              name="pass"
              type="password"
              label="Password"
              value={email}
              onChange={(e) => { setEmail(e.target.value) }}
            />

           
          </fieldset>
          <fieldset>
          <div className="third-party-join__container">
            <p className="third-party-join__reg-option">
              <span className="third-party-join__line-wrapper">
                <span className="third-party-join__line"></span></span>
                <span className="third-party-join__content">
                  <span className="third-party-join__or-span">ou</span></span></p>
                  <button type="button" data-tracking-control-name="_join-form-join-with-google" className="third-party-join__btn third-party-join__google-btn">
          <Link to="/singin" className="third-party-join__google-btn-content"> 
            <img src={googleIcon} alt="Estudar" />
              Entre com Google</Link></button></div>
          </fieldset>
          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
              
              {' '}
              
              <a href="https://">Esqueceu algo?</a>
              
            </p>
            <button type="submit">
              Sing in
            </button>
          </footer>
        </form>
      </main>
      </div>
    
      );
}

export default Singin;