import axios from 'axios';
import React, { useEffect, useState } from 'react';

const PolicyInfo: React.FC = () => {
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    // 텍스트 파일을 불러오는 함수
    const fetchContent = async () => {
      try {
        const response = await axios.get('/policyInfo.txt'); // public 폴더 경로 기준으로 axios 요청
        setContent(response.data); // response.data에 파일 내용이 들어있음
      } catch (error) {
        console.error('Error fetching the text file:', error);
      }
    };

    fetchContent();
  }, []);

  return (
    <div style={{backgroundColor:'#FAFAFA', padding:'20px 10px'}}>
      {content.split('\n').map((line, index) => (
        <p style={{fontSize:'12px', fontWeight:"medium"}} key={index}>{line}</p>
      ))}
    </div>
  );
};

export default PolicyInfo;
