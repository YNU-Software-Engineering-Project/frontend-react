import OptionList from 'components/common/OptionList';

const PostList = () => {
  const optionsItems = [
    '신생 펀딩',
    '인기 펀딩 Top3',
    '소액 펀딩',
    '목표달성률',
  ];

  return (
    <>
      <OptionList items={optionsItems} />
    </>
  );
};

export default PostList;
