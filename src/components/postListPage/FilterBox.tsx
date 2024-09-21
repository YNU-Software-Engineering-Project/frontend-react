import style from 'styles/PostListPage/Category.module.css';
import AddIcon from '@mui/icons-material/Add';
import Tag from 'components/common/Tag';
import { useState } from 'react';
import Slider from '@mui/material/Slider';
import Checkbox from './Checkbox';

const FilterBox = () => {
  const [tagList, setTagList] = useState<string[]>([
    '프로그램',
    '미술',
    '디자인',
    '컴퓨터그래픽',
    '영상',
    '영화',
    'etc',
  ]);
  const [input, setInput] = useState<string>('');
  const [priceRange, setPriceRange] = useState<number[]>([50]);
  const [checkboxStates, setCheckboxStates] = useState<boolean[]>(
    Array(10).fill(true),
  );

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
  };

  const addTag = () => {
    if (input.trim() !== '') setTagList([...tagList, input]);
    setInput('');
  };

  const deleteTag = (target: number) => {
    setTagList(tagList.filter((_, index) => index !== target));
  };

  // 입력시 상테 리로드
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addTag();
  };

  const handleClick = () => {
    addTag();
  };

  const handleCheckboxState = (target: number) => {
    if (checkboxStates[target] === undefined) {
      setCheckboxStates(
        checkboxStates.map((value, index) =>
          target === index ? !value : value,
        ),
      );
    } else {
      setCheckboxStates(
        checkboxStates.map((value, index) =>
          target === index ? !value : value,
        ),
      );
    }
    console.log(checkboxStates);
  };

  return (
    <>
      <div className={style.wrapper}>
        <header>
          <p>Filter</p>
        </header>
        <div className={style.tagBox}>
          <div className={style.headerP}>
            <p>Tags</p>
          </div>
          <form className={style.inputBox} onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              onChange={handleChange}
              placeholder="태그를 입력해주세요."
            />
            <AddIcon
              sx={{ fontSize: '24px', ':hover': { cursor: 'pointer' } }}
              onClick={handleClick}
            />
          </form>
        </div>
        <div className={style.tagList}>
          {tagList.map((tag, index) => (
            <Tag
              key={`${tag}-${index}`}
              nthChild={index}
              onClick={() => deleteTag(index)}
            >
              {tag}
            </Tag>
          ))}
        </div>
        <div>
          <span>최소 후원 금액:</span>
          <span>&nbsp;&nbsp;&nbsp;{`${priceRange}만원 이하`}</span>
          <Slider
            step={0.5}
            marks
            min={0.5}
            max={30}
            value={priceRange}
            onChange={handlePriceChange}
            color="success"
          />
        </div>
        <Checkbox
          title="종료된 펜딩"
          description="종료된 펜딩도 표시됨"
          checked={checkboxStates[0]}
          onChange={() => {
            handleCheckboxState(0);
          }}
        />
        <Checkbox
          title="내가 좋아요한 펀딩"
          description="좋아요한 펀딩도 표시됨"
          checked={checkboxStates[1]}
          onChange={() => {
            handleCheckboxState(1);
          }}
        />
      </div>
    </>
  );
};

export default FilterBox;
