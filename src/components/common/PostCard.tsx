import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LinearProgressWithLabel from './ProgressLineBar';
import { useState } from 'react';

export type PostCardProps = {
  avatarImgUrl: String;
  postTitle: String;
  postImgUrl: String;
  postSummary: String;
  progressBarValue: number;
  tagList: String[];
};

const PostCard: React.FC<PostCardProps> = props => {
  const [liked, setLiked] = useState<boolean>(false);

  const handleLike = () => {
    setLiked(prev => !prev);
  };
  ``;
  return (
    <>
      <Card
        sx={{
          width: 360,
          height: 470,
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          ':hover': {
            transform: 'translateY(-5px,-5px)' /* 위로 5px 이동 */,
            boxShadow: ' 0 4px 8px rgba(0, 0, 0, 0.2)' /* 그림자 추가 */,
          },
          cursor: 'pointer',
        }}
      >
        <CardHeader
          avatar={<Avatar alt="avator Img" src={`${props.avatarImgUrl}`} />}
          title={
            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
              {props.postTitle}
            </div>
          }
          subheader={props.tagList.map((tag, index) => (
            <span key={index} style={{ marginRight: '0.3rem' }}>
              {`#${tag}`}
            </span>
          ))}
          action={
            <IconButton onClick={handleLike} aria-label="like">
              <FavoriteIcon
                color={liked ? 'error' : 'inherit'}
                sx={{ fontSize: '32px' }}
              />
            </IconButton>
          }
        />
        <CardMedia
          component="img"
          src={`${props.postImgUrl}`}
          height="250px"
          alt="product image"
        />
        <CardContent>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            style={{ height: '60px' }}
          >
            {props.postSummary}
          </Typography>
          <Typography sx={{ marginTop: '5px' }}>목표 펀딩 달성률</Typography>
          <LinearProgressWithLabel
            variant="determinate"
            value={props.progressBarValue}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default PostCard;
