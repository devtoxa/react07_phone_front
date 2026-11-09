import React from 'react';
import Item from './Item';

const List = ({ phones, onDelete, onEdit }) => {
  return (
    <div className="list-container">
      <h2>연락처 목록</h2>
      {phones.length === 0 ? (
        <p>등록된 연락처가 없습니다.</p>
      ) : (
        <ul>
          {phones.map((phone) => (
            <Item key={phone.id} phone={phone} onDelete={onDelete} onEdit={onEdit} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default List;