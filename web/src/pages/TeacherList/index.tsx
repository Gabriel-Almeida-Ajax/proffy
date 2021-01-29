import React, { ReactElement, useState, FormEvent } from 'react';
import api from '../../services/api';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import './styles.css';
import Input from '../../components/Input';
import Select from '../../components/Select';

function TeacherList(): ReactElement {
  const [subject, setSubject] = useState('');
  const [weekDay, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  const [teachers, setTeachers] = useState([]);

  async function searchTeachers(e: FormEvent) {
    e.preventDefault();

    const response = await api.get('classes', {
      params: {
        subject,
        week_day: weekDay,
        time,
      },
    });

    setTeachers(response.data);
  }

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Colaboradores disponíveis.">
        <form id="search-teachers" onSubmit={searchTeachers}>
          <Select
            name="subject"
            label="Serviços"
            value={subject}
            onChange={e => { setSubject(e.target.value) }}
            options={[
              { value: 'Unhas', label: 'Unhas' },
              { value: 'Cabelos', label: 'Cabelos' },
              { value: 'Corpo', label: 'Corpo' },
              { value: 'Maquiagem', label: 'Maquiagem' },
              
            ]}
          />
          <Select
            name="week_day"
            label="Dia da Semana"
            value={weekDay}
            onChange={e => { setWeekDay(e.target.value) }}
            options={[
              { value: '0', label: 'Domingo' },
              { value: '1', label: 'Segunda-feira' },
              { value: '2', label: 'Terça-feira' },
              { value: '3', label: 'Quarta-feira' },
              { value: '4', label: 'Quinta-feira' },
              { value: '5', label: 'Sexta-feira' },
              { value: '6', label: 'Sábado' },
            ]}
          />
          <Input 
            name="time" 
            label="Hora" 
            type="time" 
            value={time}
            onChange={e => { setTime(e.target.value) }}
          />

          <button type="submit">Buscar</button>
        </form>
      </PageHeader>

      <main>
        {teachers.map((teacher: Teacher) => {
          return <TeacherItem key={teacher.id} teacher={teacher} />
        })}
      </main>
    </div>
  );
}

export default TeacherList;
