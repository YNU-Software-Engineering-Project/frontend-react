import style from 'styles/PostListPage/Category.module.css';
import { useEffect, useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import Chip from 'components/common/Chip';
import { searchFundingQueryAtom } from 'atoms/SearchFundingAtom';
import { useSetAtom } from 'jotai';
import { categoryCode } from 'atoms/SearchFundingAtom';

const Category = () => {
  const setQuery = useSetAtom(searchFundingQueryAtom);
  const categories = Object.keys(categoryCode);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

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

  useEffect(() => {
    const categories = selectedCategories.map(
      label => categoryCode[label as keyof typeof categoryCode],
    );
    setQuery(prev => ({
      ...prev,
      categories,
    }));
  }, [handleAutocompleteChange]);

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
