import React from 'react';

const Insert = ({ 
  form, 
  editingPhone, 
  onChange, 
  onInsertSubmit, 
  onUpdateSubmit, 
  onCancel 
}) => {
  return (
    <div className="insert-container">
      {editingPhone ? (
        <form onSubmit={onUpdateSubmit} className="insert-form">
          <h3>연락처 수정</h3>
          <input
            type="text"
            name="name"
            placeholder="이름"
            value={form.name}
            onChange={onChange}
          />
          <input
            type="text"
            name="phone"
            placeholder="전화번호"
            value={form.phone}
            onChange={onChange}
          />
          <button type="submit">수정 완료</button>
          <button type="button" onClick={onCancel}>취소</button>
        </form>
      ) : (
        <form onSubmit={onInsertSubmit} className="insert-form">
          <h3>새 연락처 등록</h3>
          <input
            type="text"
            name="name"
            placeholder="이름"
            value={form.name}
            onChange={onChange}
          />
          <input
            type="text"
            name="phone"
            placeholder="전화번호"
            value={form.phone}
            onChange={onChange}
          />
          <button type="submit">등록</button>
        </form>
      )}
    </div>
  );
};

export default Insert;
