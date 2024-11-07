import style from 'styles/PostPage/dashBoard/SponsorList.module.css';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useState } from 'react';
import { SelectChangeEvent } from '@mui/material';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from '@mui/material';

type DataType = {
  date: string;
  id: string;
  nickname: string;
  email: string;
  address: string;
  phone: string;
  reward: string;
};

const data: DataType[] = Array.from({ length: 100 }, (_, index) => ({
  date: `2024-05-${103 - index}`,
  id: 'admin',
  nickname: 'spending',
  email: 'spending@yu.ac.kr',
  address: '대구광역시 달서구 조암로6길 율성푸르지오 스포츠센터',
  phone: '010-2914-4545',
  reward: '알뜰 선풍기 상품 오늘은 여기까지',
}));

type ButtonInfo = {
  label: string;
  key: string;
};

const buttons: ButtonInfo[] = [
  { label: '구매일', key: 'date' },
  { label: 'ID', key: 'id' },
  { label: '닉네임', key: 'nickname' },
  { label: '주소', key: 'adress' },
  { label: '전화번호', key: 'telNumber' },
];

const SponsorList = () => {
  ///리워드
  const [reward, setReward] = useState('');

  const handleChange = (event: SelectChangeEvent<string>) => {
    setReward(event.target.value as string);
  };

  //// 회원 정보 나열
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState<keyof DataType>('date'); // 정렬할 기준 열
  const [orderDirection, setOrderDirection] = useState<'asc' | 'desc'>('asc'); // 정렬 방향

  // 정렬 로직
  const sortedData = data.sort((a, b) => {
    if (a[orderBy] < b[orderBy]) {
      return orderDirection === 'asc' ? -1 : 1;
    }
    if (a[orderBy] > b[orderBy]) {
      return orderDirection === 'asc' ? 1 : -1;
    }
    return 0;
  });

  // 현재 페이지에 보여줄 데이터 계산
  const currentData = sortedData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSort = (column: keyof DataType) => {
    const isAsc = orderBy === column && orderDirection === 'asc';
    setOrderDirection(isAsc ? 'desc' : 'asc');
    setOrderBy(column);
  };

  return (
    <>
      <div>
        <header className={style.header}>
          <span>펀딩 참여자</span>
        </header>
        <div className={style.filterBox}>
          <TextField
            sx={{ width: '30%' }}
            variant="outlined"
            placeholder="Search..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          <FormControl variant="outlined" sx={{ width: '30%' }}>
            <InputLabel id="reward-select-label">리워드 선택</InputLabel>
            <Select
              labelId="reward-select-label"
              id="reward-select"
              value={reward}
              onChange={handleChange}
              label="리워드 선택"
            >
              <MenuItem value="리워드 1">리워드 1</MenuItem>
              <MenuItem value="리워드 2">리워드 2</MenuItem>
              <MenuItem value="리워드 3">리워드 3</MenuItem>
              <MenuItem value="리워드 4">리워드 4</MenuItem>
              <MenuItem value="리워드 5">리워드 5</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <Paper style={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell
                      onClick={() => handleSort('date')}
                      style={{ cursor: 'pointer' }}
                    >
                      구매일
                      {orderBy === 'date'
                        ? orderDirection === 'asc'
                          ? '▲'
                          : '▼'
                        : ''}
                    </TableCell>
                    <TableCell
                      onClick={() => handleSort('id')}
                      style={{ cursor: 'pointer' }}
                    >
                      ID
                      {orderBy === 'id'
                        ? orderDirection === 'asc'
                          ? '▲'
                          : '▼'
                        : ''}
                    </TableCell>
                    <TableCell
                      onClick={() => handleSort('nickname')}
                      style={{ cursor: 'pointer' }}
                    >
                      닉네임
                      {orderBy === 'nickname'
                        ? orderDirection === 'asc'
                          ? '▲'
                          : '▼'
                        : ''}
                    </TableCell>
                    <TableCell
                      onClick={() => handleSort('email')}
                      style={{ cursor: 'pointer' }}
                    >
                      이메일
                      {orderBy === 'email'
                        ? orderDirection === 'asc'
                          ? '▲'
                          : '▼'
                        : ''}
                    </TableCell>
                    <TableCell
                      onClick={() => handleSort('address')}
                      style={{ cursor: 'pointer' }}
                    >
                      주소
                      {orderBy === 'address'
                        ? orderDirection === 'asc'
                          ? '▲'
                          : '▼'
                        : ''}
                    </TableCell>
                    <TableCell
                      onClick={() => handleSort('phone')}
                      style={{ cursor: 'pointer' }}
                    >
                      전화번호
                      {orderBy === 'phone'
                        ? orderDirection === 'asc'
                          ? '▲'
                          : '▼'
                        : ''}
                    </TableCell>
                    <TableCell>선택한 리워드</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.date}</TableCell>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.nickname}</TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>{row.address}</TableCell>
                      <TableCell>{row.phone}</TableCell>
                      <TableCell>{row.reward}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </div>
      </div>
    </>
  );
};

export default SponsorList;
