import style from 'styles/PostListPage/Filterbox.module.css';
import AddIcon from '@mui/icons-material/Add';
import Chip from 'components/common/Chip';
import { useEffect, useState } from 'react';
import Slider from '@mui/material/Slider';
import Checkbox from './Checkbox';
import Category from './Category';
import { useSetAtom } from 'jotai';
import { searchFundingQueryAtom } from 'atoms/SearchFundingAtom';

const FilterBox = () => {
  const setQeury = useSetAtom(searchFundingQueryAtom);

  // 테그 설정 부분
  const [input, setInput] = useState<string>('');
  const [tagList, setTagList] = useState<string[]>([]);
  const addTag = () => {
    if (input.trim() !== '') setTagList([...tagList, input]);
    setInput('');
  };
  const deleteTag = (target: number) => {
    setTagList(tagList.filter((_, index) => index !== target));
  };
  const handleTagInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };
  const handleTagSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addTag();
  };
  const handleTagClick = () => {
    addTag();
  };

  useEffect(() => {
    setQeury(prev => ({
      ...prev,
      tags: tagList,
    }));
  }, [tagList]);

  // 최소 후원 금액 설정
  const [priceRange, setPriceRange] = useState<number[]>([0, 100]);
  const handlePriceChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number,
  ) => {
    const minDistance = 5;
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance);
        setPriceRange([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setPriceRange([clamped - minDistance, clamped]);
      }
    } else {
      setPriceRange(newValue as number[]);
    }
  };

  useEffect(() => {
    setQeury(prev => ({
      ...prev,
      minRate: priceRange[0],
      maxRate: priceRange[1],
    }));
  }, [priceRange]);

  // 옵션 체크박스 부분
  const [checkboxStates, setCheckboxStates] = useState<boolean[]>(
    Array(2).fill(true),
  );
  const handleCheckboxState = (target: number) => {
    setCheckboxStates(
      checkboxStates.map((value, index) => (target === index ? !value : value)),
    );
  };

  useEffect(() => {
    setQeury(prev => ({
      ...prev,
      isClosed: checkboxStates[0],
      isLiked: checkboxStates[1],
    }));
  }, [checkboxStates]);

  return (
    <>
      <div className={style.wrapper}>
        <header>
          <p>Filter</p>
        </header>

        <div className={style.categoryBox}>
          <div className={style.headerP}>
            <p>Category</p>
          </div>
          <Category />
        </div>

        <div className={style.tagBox}>
          <div className={style.headerP}>
            <p>Tags</p>
          </div>
          <form className={style.inputBox} onSubmit={handleTagSubmit}>
            <input
              type="text"
              value={input}
              onChange={handleTagInputChange}
              placeholder="태그를 입력해주세요."
            />
            <AddIcon
              sx={{ fontSize: '24px', ':hover': { cursor: 'pointer' } }}
              onClick={handleTagClick}
            />
          </form>
        </div>
        <div className={style.tagList}>
          {tagList.map((tag, index) => (
            <Chip
              key={`${tag}-${index}`}
              nthChild={index}
              onClick={() => deleteTag(index)}
            >
              {tag}
            </Chip>
          ))}
        </div>
        <div>
          <span>후원 달성률:</span>
          <span>
            &nbsp;&nbsp;&nbsp;{`  ${priceRange[0]}% ~ ${priceRange[1]}%`}
          </span>
          <Slider
            disableSwap
            step={5}
            marks
            min={0}
            max={100}
            value={priceRange}
            onChange={handlePriceChange}
            sx={{ color: 'blue' }}
          />
        </div>
        <div>
          <div className={style.headerP}>이외 옵션</div>
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
      </div>
    </>
  );
};

export default FilterBox;
