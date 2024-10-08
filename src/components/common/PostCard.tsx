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

type ExpiredOverlayProps = {
  children?: string;
};

const ExpiredOverlay: React.FC<ExpiredOverlayProps> = ({ children }) => {
  return (
    <>
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'red',
          fontSize: '24px',
          fontWeight: 'bold',
          zIndex: 99999,
          pointerEvents: 'none',
          backdropFilter: 'blur(3px)',
        }}
      >
        {children}
      </div>
    </>
  );
};

export type PostCardProps = {
  avatarImgUrl: String;
  postTitle: String;
  postImgUrl: String;
  postSummary: String;
  progressBarValue: number;
  tagList: String[];
  isExpired?: boolean;
};

const PostCard: React.FC<PostCardProps> = ({
  avatarImgUrl,
  postTitle,
  postImgUrl,
  postSummary,
  progressBarValue,
  tagList,
  isExpired = false,
}) => {
  const [liked, setLiked] = useState<boolean>(false);

  const handleLike = () => {
    setLiked(prev => !prev);
    console.log(isExpired);
  };

  return (
    <>
      <Card
        sx={{
          width: 360,
          height: 470,
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          ':hover': {
            transform: 'translateY(-5px,-5px)',
            boxShadow: ' 0 4px 8px rgba(0, 0, 0, 0.2)',
          },
          cursor: 'pointer',
          position: 'relative',
        }}
      >
        {isExpired && <ExpiredOverlay>종료되었습니다</ExpiredOverlay>}
        <CardHeader
          avatar={<Avatar alt="avator Img" src={`${avatarImgUrl}`} />}
          title={
            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
              {postTitle}
            </div>
          }
          subheader={tagList.map((tag, index) => (
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
          src={`${postImgUrl}`}
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
            {postSummary}
          </Typography>
          <Typography sx={{ marginTop: '5px' }}>목표 펀딩 달성률</Typography>
          <LinearProgressWithLabel
            variant="determinate"
            value={progressBarValue}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default PostCard;
