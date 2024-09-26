import style from 'styles/PostListPage/PostList.module.css';
import PostCard, { PostCardProps } from 'components/common/PostCard';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import OrderButton from 'components/common/OrderButton';
import Pagination from '@mui/material/Pagination';
import { useState } from 'react';

const PostList = () => {
  // 테스트용 더미 데이터
  const cardInfo: PostCardProps[] = [
    {
      avatarImgUrl: 'https://picsum.photos/id/1/200/300',
      postTitle: '가벼운 노트북',
      postImgUrl: 'https://picsum.photos/id/2/200/300',
      postSummary:
        'This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels',
      progressBarValue: 80,
      tagList: ['tag1', 'tag2', 'tag3'],
    },
    {
      avatarImgUrl: 'https://picsum.photos/id/3/200/300',
      postTitle: '제목2',
      postImgUrl: 'https://picsum.photos/id/4/200/300',
      postSummary: '요약2',
      progressBarValue: 40,
      tagList: ['tag1', 'tag2', 'tag3'],
    },
    {
      avatarImgUrl: 'https://picsum.photos/id/5/200/300',
      postTitle: '제목3',
      postImgUrl: 'https://picsum.photos/id/6/200/300',
      postSummary: '요약3',
      progressBarValue: 20,
      tagList: ['tag1', 'tag2', 'tag3'],
    },
    {
      avatarImgUrl: 'https://picsum.photos/id/5/200/300',
      postTitle: '제목3',
      postImgUrl: 'https://picsum.photos/id/6/200/300',
      postSummary: '요약3',
      progressBarValue: 20,
      tagList: ['tag1', 'tag2', 'tag3'],
    },
    {
      avatarImgUrl: 'https://picsum.photos/id/5/200/300',
      postTitle: '제목3',
      postImgUrl: 'https://picsum.photos/id/6/200/300',
      postSummary: '요약3',
      progressBarValue: 20,
      tagList: ['tag1', 'tag2', 'tag3'],
    },
  ];

  // 정렬 컨트롤 부분
  const orderOptions = ['최신순', '가격순', '추천순'];
  const [clickedState, setClickedState] = useState<boolean[]>([
    true,
    ...Array(orderOptions.length - 1).fill(false),
  ]);
  const [isDecending, setIsDecending] = useState<boolean>(true);
  const onClick = (target: number) => {
    if (clickedState[target]) {
      setIsDecending(!isDecending);
    } else {
      setClickedState(
        clickedState.map((_, index) => (index === target ? true : false)),
      );
    }
  };

  // 검색 부분
  const [searchTerm, setSearchTerm] = useState<string>('');
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value); // 입력값을 상태로 업데이트
  };
  const search = () => {
    // 검색어 처리 로직 채우면됨.
    setSearchTerm('');
  };
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      search();
    }
  };
  const handleIconClick = () => {
    search();
  };

  // footer paignation handler 부분
  const [totalPages, setTotalPages] = useState(10); // 나중에 리덕스로 처리해도 되지 않을까?
  const [page, setPage] = useState(1);
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number,
  ) => {
    setPage(page);
  };

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
              }
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
          {cardInfo.map((info, index) => (
            <PostCard
              avatarImgUrl={info.avatarImgUrl}
              postTitle={info.postTitle}
              postImgUrl={info.postImgUrl}
              postSummary={info.postSummary}
              progressBarValue={info.progressBarValue}
              tagList={info.tagList}
              key={`${index} - ${info.postTitle}`}
            />
          ))}
        </div>
        <div className={style.footer}>
          <Pagination
            count={totalPages} // 전체 페이지 수
            page={page} // 현재 페이지
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
