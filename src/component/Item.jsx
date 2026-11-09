import React from 'react';

const Item = ({ phone, onDelete, onEdit }) => {
  return (
    <li>
      <span><strong>{phone.name}</strong>: {phone.phone}</span>
      <div>
        <button onClick={() => onEdit(phone)}>수정</button>
        <button onClick={() => onDelete(phone.id)}>삭제</button>
      </div>
    </li>
  );
};

export default Item;
