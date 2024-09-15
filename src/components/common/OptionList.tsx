import { useRef, useEffect, useState } from 'react';
import style from 'styles/common/OptionList.module.css';

type OptionListProps = {
  items: string[];
};

const OptionList: React.FC<OptionListProps> = ({ items }) => {
  const [nextRect, setNextRect] = useState<DOMRect | null>(null);
  const highlight = useRef<HTMLDivElement>(null);
  const initalLi = useRef<HTMLLIElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setNextRect(rect);
  };

  useEffect(() => {
    if (initalLi.current && highlight.current) {
      const initialEliment = initalLi.current.getBoundingClientRect();
      const highlightEliment = highlight.current;

      highlightEliment.style.height = `${initialEliment.height}px`;
      highlightEliment.style.width = `${initialEliment.width}px`;
      highlightEliment.style.transform = `translate(${initialEliment.left}px, ${initialEliment.top}px)`;
    }
  }, []);

  useEffect(() => {
    if (nextRect && highlight.current) {
      const highlightEliment = highlight.current;

      console.log(nextRect);

      requestAnimationFrame(() => {
        highlightEliment.style.transition = 'transform 0.5s ease';
        highlightEliment.style.height = `${nextRect.height}px`;
        highlightEliment.style.width = `${nextRect.width}px`;
        highlightEliment.style.transform = `translate(${nextRect.left}px, ${nextRect.top}px)`;
      });
    }
  }, [nextRect]);

  return (
    <>
      <div className={style.container}>
        <ul>
          {items.map((item, index) => (
            <li
              key={index}
              ref={index === 0 ? initalLi : null}
              onClick={handleClick}
            >
              <a>{item}</a>
            </li>
          ))}
        </ul>
        <div ref={highlight} className={style.highlight} />
      </div>
    </>
  );
};

export default OptionList;
