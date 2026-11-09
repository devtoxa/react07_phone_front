import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Insert from './component/Insert';
import List from './component/List';
import './App.css';

function App() {
  const [phones, setPhones] = useState([]);
  const [editingPhone, setEditingPhone] = useState(null);

  const fetchPhones = async () => {
    try {
      const response = await axios.get('/api/phones');
      setPhones(response.data);
    } catch (error) {
      console.error('데이터를 불러오는 중 오류가 발생했습니다:', error);
    }
  };

  useEffect(() => {
    fetchPhones();
  }, []);

  const handleInsert = async (phoneData) => {
    try {
      await axios.post('/api/phones', phoneData);
      fetchPhones();
    } catch (error) {
      console.error('데이터 등록 중 오류가 발생했습니다:', error);
    }
  };

  const handleUpdate = async (id, phoneData) => {
    try {
      await axios.put(`/api/phones/${id}`, phoneData);
      setEditingPhone(null);
      fetchPhones();
    } catch (error) {
      console.error('데이터 수정 중 오류가 발생했습니다:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/phones/${id}`);
      setPhones(phones.filter((phone) => phone.id !== id));
    } catch (error) {
      console.error('데이터 삭제 중 오류가 발생했습니다:', error);
    }
  };

  return (
    <div className="App">
      <h1>전화번호부 (Spring Boot + React)</h1>
      <Insert 
        onInsert={handleInsert} 
        onUpdate={handleUpdate} 
        editingPhone={editingPhone} 
        setEditingPhone={setEditingPhone} 
      />
      <List 
        phones={phones} 
        onDelete={handleDelete} 
        onEdit={(phone) => setEditingPhone(phone)} 
      />
    </div>
  );
}

export default App;
