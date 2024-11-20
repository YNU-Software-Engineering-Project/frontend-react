import style from 'styles/PostPage/dashBoard/SponsorList.module.css';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useState, useEffect } from 'react';
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
import { useParams } from 'react-router-dom';
import { useAtomValue, useSetAtom } from 'jotai';
import {
  setfunderListQueryAtom,
  funderListAtom,
  fetchFunderListAtom,
  funderListQueryAtom,
  sortByEnum,
} from 'atoms/funderListAtom';
import { fetchRewardListAtom, rewardListAtom } from 'atoms/rewardListAtom';

const SponsorList = () => {
  const { id: fundingId } = useParams();
  const buttons = ['후원 날짜', 'ID', '닉네임', '이메일', '주소', '전화번호'];

  //검색 파라미터 수정
  const setQuery = useSetAtom(setfunderListQueryAtom);

  ///리워드 파라미터 수정
  const rewardList = useAtomValue(rewardListAtom);
  const fetchRewardList = useSetAtom(fetchRewardListAtom);
  const [reward, setReward] = useState('');
  const handleChange = (event: SelectChangeEvent<string>) => {
    const rewardNo = event.target.value;
    setReward(rewardNo.toString());
    setQuery({ rewardNo: Number(rewardNo) });
  };

  useEffect(() => {
    fetchRewardList(Number(fundingId));
  }, [fetchRewardList]);

  //// 회원 정보 나열
  const query = useAtomValue(funderListQueryAtom);
  const funderListInfo = useAtomValue(funderListAtom);
  const fetchFunder = useSetAtom(fetchFunderListAtom);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  useEffect(() => {
    console.log(query);
    fetchFunder(Number(fundingId));
  }, [fetchFunder, query]);

  // 정렬 파라미터 수정
  const [sortBy, setSortBy] = useState(0); // 정렬할 기준 열
  const [sortDirection, setSortDirection] = useState(false); // 정렬 방향

  const handleSort = (index: number) => {
    if (sortBy == index) {
      setSortDirection(!sortDirection);
      setQuery({ sort: sortByEnum[sortBy * 2 + Number(!sortDirection)] });
    } else {
      setSortBy(index);
      setSortDirection(false);
      setQuery({ sort: sortByEnum[index * 2 + Number(sortDirection)] });
    }
  };

  // 페이지 파라미터 수정
  const handleChangePage = (event: unknown, newPage: number) => {
    setQuery({ page: newPage });
    setPage(newPage);
  };

  const rowsPerPageOptions = [5, 10, 25];
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const size = Number(event.target.value);
    setRowsPerPage(size);
    setPage(0);
    setQuery({ page: 0, size });
  };

  //아이디 파라미터 수정
  const [searchId, setSearchId] = useState('');
  const handleSearchIdchange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchId(value.trim());
  };
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setQuery({ id: searchId });
      setSearchId('');
    }
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
            placeholder="아이디 검색"
            value={searchId}
            onChange={handleSearchIdchange}
            onKeyDown={handleKeyPress}
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
              {rewardList.map(item => (
                <MenuItem key={item.no} value={item.no}>
                  {item.rewardName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div>
          <Paper style={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    {buttons.map((info, index) => (
                      <TableCell
                        key={index}
                        onClick={() => handleSort(index)}
                        style={{ cursor: 'pointer' }}
                      >
                        {info}
                        {index == sortBy ? (sortDirection ? '▲' : '▼') : ''}
                      </TableCell>
                    ))}
                    <TableCell>선택한 리워드</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Array.isArray(funderListInfo?.data) &&
                    funderListInfo?.data.map(funder => (
                      <TableRow key={funder.id}>
                        <TableCell>{funder.createdAt}</TableCell>
                        <TableCell>{funder.id}</TableCell>
                        <TableCell>{funder.nickname}</TableCell>
                        <TableCell>{funder.email}</TableCell>
                        <TableCell>{funder.address}</TableCell>
                        <TableCell>{funder.phoneNumber}</TableCell>
                        <TableCell>{funder.rewards}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={rowsPerPageOptions}
              component="div"
              count={Number(funderListInfo?.totalElements) || 0}
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
