import Button from 'components/common/Button';
import OptionList from 'components/common/OptionList';
import PostCard, { PostCardProps } from 'components/common/PostCard';

const PostList = () => {
  const optionsItems = [
    '신생 펀딩',
    '인기 펀딩 Top3',
    '소액 펀딩',
    '목표달성률',
  ];

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
  ];

  return (
    <>
      <div style={{ width: '1160px', margin: ' 128px auto' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <OptionList items={optionsItems} />
          <Button variant="contained" type="black">
            더보기
          </Button>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            marginTop: '20px',
          }}
        >
          {cardInfo.map((info, index) => (
            <PostCard
              avatarImgUrl={info.avatarImgUrl}
              postTitle={info.postTitle}
              postImgUrl={info.postImgUrl}
              postSummary={info.postSummary}
              progressBarValue={info.progressBarValue}
              tagList={info.tagList}
              key={`${info.postTitle} - ${info.postSummary}`}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default PostList;
