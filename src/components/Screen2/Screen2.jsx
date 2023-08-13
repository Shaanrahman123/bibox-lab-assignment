import "./Screen2.css";
import React, {
  useRef,
  useState,
  useLayoutEffect,
  useCallback,
  useContext,
} from "react";
import ResizeObserver from "resize-observer-polyfill";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import context from "../../context/context";
import itemsData from "../../utils/items";
import { Link } from "react-router-dom";

const Parts = () => {
  const scrollRef = useRef(null);
  const ghostRef = useRef(null);
  const [scrollRange, setScrollRange] = useState(0);
  const [viewportW, setViewportW] = useState(0);
  const { items, setItems } = useContext(context);
  useLayoutEffect(() => {
    scrollRef && setScrollRange(scrollRef.current.scrollWidth);
  }, [scrollRef]);

  const onResize = useCallback((entries) => {
    for (let entry of entries) {
      setViewportW(entry.contentRect.width);
    }
  }, []);

  useLayoutEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => onResize(entries));
    resizeObserver.observe(ghostRef.current);
    return () => resizeObserver.disconnect();
  }, [onResize]);

  const { scrollYProgress } = useScroll();
  const transform = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -scrollRange + viewportW]
  );
  const physics = { damping: 15, mass: 0.627, stiffness: 155 };
  const spring = useSpring(transform, physics);

  const handleAddItems = (e) => {
    if (items?.includes(e.target?.id?.toString())) {
      setItems((prev) => prev.filter((el) => el != e.target.id));
    } else {
      setItems((prev) => [...prev, e.target.id]);
    }
  };

  return (
    <section className="parts-wrapper">
      <div className="scroll-container">
        <div className="header-text">Please Select Image</div>
        <motion.section
          ref={scrollRef}
          style={{ x: spring }}
          className="imgs-container"
        >
          <div className="imgs">
            {itemsData?.map((item) => (
              <div className={`${items?.includes(item?.id?.toString())
                ? "img-wrapper selected"
                : "img-wrapper"
                }`}
                key={item?.id}>
                <div className="img-item">
                  <img
                    id={item.id}
                    src={item.src}
                    className={`${items?.includes(item?.id?.toString())
                      ? "img selected"
                      : "img"
                      }`}
                    onClick={handleAddItems}
                  />

                </div>
                <div className="title">{item.name}</div>
              </div>
            ))}
          </div>
        </motion.section>
        {items?.length > 0 && (
          <div className="btn-next">
            <Link to={"/screen3"} className="btn-assemble">
              Assemble
            </Link>
          </div>
        )}
      </div>
      <div ref={ghostRef} style={{ height: scrollRange }} className="ghost" />
    </section>
  );
};

export default Parts;
