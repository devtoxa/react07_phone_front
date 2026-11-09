import React, { useState, useEffect } from 'react';

const Insert = ({ onInsert, onUpdate, editingPhone, setEditingPhone }) => {
  const [form, setForm] = useState({ name: '', phone: '' });

  // 수정하려는 아이템이 선택되면 폼에 기존 데이터 채우기
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;

    if (editingPhone) {
      // 수정 모드일 때 PUT 요청 수행
      onUpdate(editingPhone.id, form);
    } else {
      // 등록 모드일 때 POST 요청 수행
      onInsert(form);
    }

    setForm({ name: '', phone: '' });
  };

  const handleCancel = () => {
    setEditingPhone(null);
    setForm({ name: '', phone: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="insert-form">
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
      <button type="submit">{editingPhone ? '수정하기' : '등록'}</button>
      {editingPhone && (
        <button type="button" onClick={handleCancel}>취소</button>
      )}
    </form>
  );
};

export default Insert;