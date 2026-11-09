import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Insert from './component/Insert';
import List from './component/List';
import './App.css';

function App() {
  const [phones, setPhones] = useState([]);
  // 수정 중인 항목의 상태 관리 (null이면 등록 모드, 객체면 수정 모드)
  const [editingPhone, setEditingPhone] = useState(null);

  // 1. 목록 조회 (Read) - Axios GET
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

  // 2. 데이터 등록 (Create) - Axios POST
  const handleInsert = async (phoneData) => {
    try {
      await axios.post('/api/phones', phoneData);
      fetchPhones(); // 목록 갱신
    } catch (error) {
      console.error('데이터 등록 중 오류가 발생했습니다:', error);
    }
  };

  // 3. 데이터 수정 (Update) - Axios PUT
  const handleUpdate = async (id, phoneData) => {
    try {
      await axios.put(`/api/phones/${id}`, phoneData);
      setEditingPhone(null); // 수정 모드 해제
      fetchPhones(); // 목록 갱신
    } catch (error) {
      console.error('데이터 수정 중 오류가 발생했습니다:', error);
    }
  };

  // 4. 데이터 삭제 (Delete) - Axios DELETE
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
      <h1>전화번호부 (Spring Boot + React + Axios)</h1>
      {/* Insert 컴포넌트에 등록/수정 분기 로직 전달 */}
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