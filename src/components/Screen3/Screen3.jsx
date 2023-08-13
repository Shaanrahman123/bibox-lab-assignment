import { useContext, useState } from 'react';
import './Screen3.css';
import context from '../../context/context';
import itemsData from '../../utils/items.js';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Assemble = () => {
  console.log(itemsData);
  const { items, setItems, childs, setChilds } = useContext(context);
  const [draggingItem, setDraggingItem] = useState(null);
  const [dragOver, setDragOver] = useState(false);

  return (
    <section className="assemble-wrapper">
      <div className="header-text">Assemble Your Parts</div>
      <div className="assemble">
        <div className="left">
          {items.map(id => (
            <motion.img
              draggable
              onDragStart={() => {
                setDraggingItem(id);
              }}
              src={itemsData?.[id - 1]?.src}
              className="item"
              key={id}
              alt={itemsData?.[id - 1]?.name}
            />
          ))}
        </div>
        <motion.div
          draggable="off"
          className={`right ${dragOver ? 'border' : ''}`}
          onDragOver={e => {
            e.preventDefault();
          }}
          onDragEnter={() => {
            setDragOver(prev => !prev);
          }}
          onDragLeave={() => {
            setDragOver(prev => !prev);
          }}
          onDrop={e => {
            e.preventDefault();
            setDragOver(prev => !prev);
            setChilds(prev => {
              if (prev.includes(draggingItem)) return prev;
              return [...prev, draggingItem];
            });
            setItems(prev => prev.filter(el => el != draggingItem));
          }}>
          {childs?.map(child => (
            <div className="img-child" key={child}>
              <img
                key={child}
                className="draggedItem"
                src={itemsData?.[child - 1]?.src}
                alt={itemsData?.[child - 1]?.name}
              />
              <div
                className="cross"
                onClick={() => {
                  setChilds(prev => prev.filter(el => el != child));
                  setItems(prev => [...prev, child]);
                }}>
                X
              </div>
            </div>
          ))}
        </motion.div>
      </div>
      {childs.length > 0 && (
        <div className="btn-next">
          <Link to={'/screen4'} className="btn-assemble">
            Final Result
          </Link>
        </div>
      )}
    </section>
  );
};

export default Assemble;
