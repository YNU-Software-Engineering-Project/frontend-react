import style from 'styles/PostListPage/Postlist.module.css';
import PostCard from 'components/common/PostCard';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import OrderButton from 'components/common/OrderButton';
import Pagination from '@mui/material/Pagination';
import React, { startTransition, useEffect, useState } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import {
  searchFundingQueryAtom,
  sortingEnum,
  sortingType,
  searchFundings,
} from 'atoms/SearchFundingAtom';

const PostList = () => {
  const setQeury = useSetAtom(searchFundingQueryAtom);
  const pageInfo = useAtomValue(searchFundings);
  const postCard = !Array.isArray(pageInfo) ? pageInfo?.data : [];

  // 정렬 컨트롤 부분
  const orderOptions = ['최신순', '가격순', '추천순'];
  const [clickedState, setClickedState] = useState<boolean[]>([
    true,
    ...Array(orderOptions.length - 1).fill(false),
  ]);
  const [isDecending, setIsDecending] = useState<boolean>(false);
  const onClick = (target: number) => {
    if (clickedState[target]) {
      setIsDecending(!isDecending);
    } else {
      setIsDecending(false);
      setClickedState(
        clickedState.map((_, index) => (index === target ? true : false)),
      );
    }
  };

  useEffect(() => {
    const idx = clickedState.findIndex(x => x);
    setQeury(prev => ({
      ...prev,
      sort: sortingEnum[idx * 2 + Number(isDecending)] as sortingType,
    }));
  }, [clickedState, isDecending]);

  // 검색 부분
  const [searchTerm, setSearchTerm] = useState<string>('');
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value); // 입력값을 상태로 업데이트
  };
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      search();
    }
  };
  const handleIconClick = () => {
    search();
  };

  const search = () => {
    startTransition(() => {
      setQeury(prev => ({
        keyword: searchTerm,
      }));
    });
    setSearchTerm('');
  };

  // footer paignation handler 부분
  const [localPage, setLocalPage] = useState(1); // 로컬 페이지 상태
  const { totalPages } = !Array.isArray(pageInfo)
    ? pageInfo
    : { totalPages: 0 };

  // 페이지 변경 핸들러
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number,
  ) => {
    setLocalPage(page); // 로컬 상태를 먼저 업데이트
  };

  // localPage가 변경될 때 API 요청 트리거
  useEffect(() => {
    setQeury(prev => ({
      ...prev,
      page: localPage - 1,
    }));
  }, [localPage, setQeury]);

  return (
    <>
      <div className={style.wrapper}>
        <div className={style.header}>
          {/* Button Group */}
          <div className={style.buttonGroup}>
            {orderOptions.map((option, index) => (
              <OrderButton
                isClicked={clickedState[index]}
                isDescending={isDecending}
                onClick={() => onClick(index)}
                key={`${index} - ${option}`}
              >
                {option}
              </OrderButton>
            ))}
          </div>

          {/* Search Bar */}
          <TextField
            variant="outlined"
            placeholder="검색"
            sx={{
              width: '327px !important',
              height: '40px !important',
              '& .MuiInputBase-root': {
                borderRadius: '999px',
              },
            }}
            onKeyDown={handleKeyPress}
            value={searchTerm} // 상태값을 TextField에 반영
            onChange={handleInputChange} // 입력이 변경될 때마다 상태를 업데이트
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleIconClick}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className={style.main}>
          {postCard &&
            postCard.map((info, index) => (
              <PostCard key={info.fundingId} {...info} />
            ))}
        </div>
        <div className={style.footer}>
          <Pagination
            count={totalPages} // 전체 페이지 수
            page={localPage} // 현재 페이지
            onChange={handlePageChange} // 페이지 변경 핸들러
            variant="outlined"
            color="primary"
          />
        </div>
      </div>
    </>
  );
};

export default PostList;
