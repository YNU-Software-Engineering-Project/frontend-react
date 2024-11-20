import { useEffect, useState } from 'react';
import ToastUi from 'components/toastUI/ToastUi';
import ImageSave from 'components/CreatePage/imageSave/ImageSave';
import styles from 'styles/CreatePage/section/story.module.css';
import { Api } from 'apiTypes/Api';
import { FundingStoryRequestDto } from 'apiTypes/data-contracts';
import { useAtom } from 'jotai';
import { fundingIdAtom } from 'components/CreatePage/atoms';

const Story = () => {
  const [projectName, setProjectName] = useState('');
  const [projectSummary, setProjectSummary] = useState('');
  const [imageUrls, setImageUrls] = useState<string[]>([]); // 소개 사진 등록용 이미지
  const [titleImg, setTitleImg] = useState<string[]>([]); // 대표 이미지
  const [fundingId] = useAtom(fundingIdAtom);

  const api = new Api();

  useEffect(() => {
    handleProjectStory();
    console.log(fundingId);
  }, []);

  const handleProjectStory = () => {
    if (fundingId) {
      api.getProject(fundingId)
        .then((response) => {
          const storyData = response.data;
          setProjectName(storyData.title || "");
          setProjectSummary(storyData.summary || "");
        })
        .catch((error) => {
          console.error("프로젝트 정보를 불러오는 중 오류 발생:", error);
          alert("프로젝트 정보를 불러오는 중 오류가 발생했습니다.");
        });
    }
  };

  const handleTitleImagesChange = (urls: string[]) => {
    setTitleImg(urls);
  };

  const handleImagesChange = (urls: string[]) => {
    setImageUrls(urls);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (event.target.value.length <= 20) {
      setProjectName(event.target.value);
    }
  };

  const handleSummaryChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (event.target.value.length <= 100) {
      setProjectSummary(event.target.value);
    }
  };

  const handleSubmit = async () => {
    const dataToSend: FundingStoryRequestDto = {
      title: projectName,
      summary: projectSummary,
    };

    if (fundingId) {
      api.modifyProject(fundingId, dataToSend)
        .then((response) => {
          alert("저장 성공: 펀딩 스토리가 저장되었습니다.");
          console.log("응답 데이터:", response.data);
        })
        .catch(error => {
          console.error("저장 실패:", error);
          if (error.response) {
            alert(`저장 실패: ${error.response.data.message || "서버 오류"}`);
          } else {
            alert("저장 실패: 네트워크 오류");
          }
        });
    console.log('Sending data to backend:', dataToSend);
    } else {
      alert("펀딩 ID가 없습니다.");
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.storyName}>
        <p style={{ fontSize: '18px', marginRight: '70px' }}>프로젝트 이름</p>
        <textarea
          className={styles.inputBox}
          value={projectName}
          onChange={handleNameChange}
          placeholder="프로젝트 이름"
          style={{ fontSize: '18px', width: '406px', alignItems: 'center', marginRight: '10px' }}
        />
        <div className={styles.textLength}>{projectName.length} / 20자</div>
      </div>
      <div className={styles.storyImage}>
        <p style={{ fontSize: '18px' }}>대표 이미지</p>
        <p style={{ fontSize: '18px', fontWeight: 'lighter' }}>
          SparkSeed의 검색 결과 및 매인 화면에 보여지는 이미지입니다.
        </p>
        <div className={styles.grayBox}>
          <span style={{ fontSize: '18px', fontWeight: 'lighter' }}>
            {' '}
            • 10MB 이하의 JPG. JPEG, PNG 파일
            <br /> • 1:1 비율이 가장 적절합니다.
            <br /> • 해상도 1200x675 픽셀 이상
          </span>
        </div>
        <ImageSave maxImageCount={1} onImagesChange={handleTitleImagesChange} />
      </div>
      <div className={styles.cardImg}>
        <p style={{ fontSize: '18px' }}>소개 사진 등록</p>
        <p style={{ fontSize: '18px', fontWeight: 'lighter' }}>
          펀딩 페이지가 등록되면 가장 처음에 보여지는 사진입니다.
        </p>
        <div className={styles.grayBox} style={{ padding: '10px', marginBottom: '10px' }}>
          <span style={{ fontSize: '18px', fontWeight: 'lighter' }}>
            {' '}
            • 2MB 이하의 JPG. JPEG, PNG 파일
            <br /> • 1:1 비율이 가장 적절합니다.
            <br /> • 해상도 1440x864 픽셀 이하
            <br /> • 최대 8개까지 등록 가능합니다.
          </span>
        </div>
        <div className={styles.cameraGroup}>
          <ImageSave maxImageCount={8} onImagesChange={handleImagesChange} />
        </div>
      </div>
      <div className={styles.projectSum}>
        <div style={{ fontSize: '18px', margin: '0' }}>프로젝트 요약</div>
        <textarea
          className={styles.inputBox}
          style={{ height: '120px' }}
          value={projectSummary}
          onChange={handleSummaryChange}
          placeholder="프로젝트 내용 요약"
        />
        <div className={styles.textLength}>{projectSummary.length} / 100자</div>
      </div>
      <div className={styles.projectStory}>
        <p style={{ fontSize: '18px' }}>소개 스토리 등록</p>
        <p style={{ fontSize: '18px', fontWeight: 'lighter' }}>
          프로젝트 스토리는 프로젝트의 정체성을 보여주는 부분입니다.
          <br /> 정체성을 잘 적어서 꼭 목표금액까지 펀딩을 달성해보아요!
        </p>
        <ToastUi />
      </div>
      <div className={styles.saveBtn} onClick={handleSubmit} style={{ display: 'flex', justifySelf: 'end', cursor: 'pointer' }}>
        저장하기
      </div>
    </div>
  );
};

export default Story;
