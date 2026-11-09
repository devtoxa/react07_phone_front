import React, { useState, useEffect } from 'react';

const Insert = ({ onInsert, onUpdate, editingPhone, setEditingPhone }) => {
  const [form, setForm] = useState({ name: '', phone: '' });

  useEffect(() => {
    if (editingPhone) {
      setForm({ name: editingPhone.name, phone: editingPhone.phone });
    } else {
      setForm({ name: '', phone: '' });
    }
  }, [editingPhone]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    onInsert(form);
    setForm({ name: '', phone: '' });
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    onUpdate(editingPhone.id, form);
    setForm({ name: '', phone: '' });
  };

  const handleCancel = () => {
    setEditingPhone(null);
    setForm({ name: '', phone: '' });
  };

  return (
    <div className="insert-container">
      {editingPhone ? (
        <form onSubmit={handleUpdateSubmit} className="insert-form">
          <h3>연락처 수정</h3>
          <input
            type="text"
            name="name"
            placeholder="이름"
            value={form.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="phone"
            placeholder="전화번호"
            value={form.phone}
            onChange={handleChange}
          />
          <button type="submit">수정 완료</button>
          <button type="button" onClick={handleCancel}>취소</button>
        </form>
      ) : (
        <form onSubmit={handleRegisterSubmit} className="insert-form">
          <h3>새 연락처 등록</h3>
          <input
            type="text"
            name="name"
            placeholder="이름"
            value={form.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="phone"
            placeholder="전화번호"
            value={form.phone}
            onChange={handleChange}
          />
          <button type="submit">등록</button>
        </form>
      )}
    </div>
  );
};

export default Insert;
