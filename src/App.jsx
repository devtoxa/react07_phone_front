import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Insert from './component/Insert';
import List from './component/List';
import './App.css';

function App() {
  const [phones, setPhones] = useState([]);
  
  // 입력 폼과 수정 폼에서 사용할 데이터를 App.js에서 관리
  const [form, setForm] = useState({ name: '', phone: '' });
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

  // 1. 입력값 변경 이벤트 처리 (App.js에서 관리)
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // 2. 등록 이벤트 처리 (App.js에서 처리)
  const handleInsertSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;

    try {
      await axios.post('/api/phones', form);
      setForm({ name: '', phone: '' }); // 입력폼 초기화
      fetchPhones();
    } catch (error) {
      console.error('데이터 등록 중 오류가 발생했습니다:', error);
    }
  };

  // 3. 수정 시작 이벤트 처리 (수정 버튼 클릭 시 호출)
  const handleStartEdit = (phone) => {
    setEditingPhone(phone);
    setForm({ name: phone.name, phone: phone.phone }); // 폼에 기존 데이터 채우기
  };

  // 4. 수정 완료 이벤트 처리 (App.js에서 처리)
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !editingPhone) return;

    try {
      await axios.put(`/api/phones/${editingPhone.id}`, form);
      setEditingPhone(null);
      setForm({ name: '', phone: '' });
      fetchPhones();
    } catch (error) {
      console.error('데이터 수정 중 오류가 발생했습니다:', error);
    }
  };

  // 5. 수정 취소 이벤트 처리
  const handleCancelEdit = () => {
    setEditingPhone(null);
    setForm({ name: '', phone: '' });
  };

  // 6. 삭제 이벤트 처리
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
        form={form}
        editingPhone={editingPhone}
        onChange={handleFormChange}
        onInsertSubmit={handleInsertSubmit}
        onUpdateSubmit={handleUpdateSubmit}
        onCancel={handleCancelEdit}
      />
      <List 
        phones={phones} 
        onDelete={handleDelete} 
        onEdit={handleStartEdit} 
      />
    </div>
  );
}

export default App;
