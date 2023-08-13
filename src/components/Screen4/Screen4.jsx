import { useContext } from 'react';
import './Screen4.css';
import context from '../../context/context';
import itemsData from '../../utils/items.js';
import { Link } from 'react-router-dom';

const Final = () => {
  const { childs, setChilds, setItems } = useContext(context);

  return (
    <section className="final-wrapper">
      <div className="final">
        {childs.map(child => (
          <div key={child} className="img-wrapper">
            <img src={itemsData?.[child - 1]?.src} className="items" />
            <div className="name">{itemsData?.[child - 1]?.name}</div>
          </div>
        ))}
      </div>
      <div className="btn-next">
        <Link
          to={'/'}
          onClick={() => {
            setChilds([]);
            setItems([]);
          }}
          className="btn-assemble">
          Finish
        </Link>
      </div>
    </section>
  );
};

export default Final;
