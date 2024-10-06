import style from 'styles/PostListPage/Category.module.css';
import { useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import Chip from 'components/common/Chip';

const Category = () => {
  const categories = [
    '캐릭터·굿즈 전체',
    '애니메이션',
    '게임',
    '케이팝',
    'TV·영화',
    '브랜드',
    '크리에이터',
    '홈·리빙',
    '사진',
    '키즈',
    '도서·전자책',
    '여행',
    '만화·웹툰',
    '스포츠·아웃도어',
    '테크·가전',
    '자동차',
    '패션',
    '아트',
    '기타',
  ];

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event;
    setSelectedCategories(typeof value === 'string' ? value.split(',') : value);
  };

  const handleAutocompleteChange = (event: any, newValue: string | null) => {
    if (newValue && !selectedCategories.includes(newValue)) {
      setSelectedCategories(prev => [...prev, newValue]);
    }
  };

  const deletCategory = (target: number) => {
    setSelectedCategories(
      selectedCategories.filter((_, index) => target !== index),
    );
  };

  return (
    <>
      {/* 자동완성 입력 필드 */}
      <Autocomplete
        options={categories}
        onChange={handleAutocompleteChange}
        renderInput={params => (
          <TextField
            {...params}
            label="카테고리 입력"
            placeholder="카테고리 입력"
            sx={{ marginTop: 2, width: 300 }}
          />
        )}
        sx={{
          '& .MuiFormControl-root': {
            width: ' 100%',
          },
        }}
      />

      {/* 선택된 카테고리 목록 */}
      <div className={style.categoryListBox}>
        {selectedCategories.map((category, index) => (
          <Chip
            variant="outlined"
            key={`${category}-${index}`}
            onClick={() => deletCategory(index)}
            style={{ display: 'flex', justifyContent: 'space-around' }}
          >{`> ${category}`}</Chip>
        ))}
      </div>
    </>
  );
};

export default Category;
