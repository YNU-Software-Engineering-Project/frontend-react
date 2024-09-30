import { useState } from 'react';
import ToastUiEdit from 'component/ToastUi';
import styles from 'styles/CreatePage/sections/story.module.css';
// import camera from'assets/cameraIcon.png';

const Story =()=>{
    const [projectName, setProjectName] = useState('');
    const [projectSummary, setProjectSummary] = useState('');
    const [img, setImage] = useState(null);
    const [id_card, setIdCard] = useState('');
    const uploadImage=()=>{ };

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
  const cameraIcons = new Array(8).fill(null);
    return(
        <div className={styles.wrapper}>
            <div className={styles.storyName}>
                <div className={styles.titleArea}>
                    <div className={styles.header}>프로젝트 제목</div>
                    <textarea className={styles.nameBox} value={projectName} onChange={handleNameChange} placeholder="대표자명" />
                    <div className={styles.textLength}>{projectName.length} / 20자</div>
                </div>
            </div>
            <div className={styles.storyImage}>
                <div className={styles.header}>대표 이미지</div> <br/> <br/>
                <div className={styles.light}>SparkSeed의 검색 결과 및 매인 화면에 보여지는 이미지입니다.</div>
                <div className={styles.grayBox}>
                    <span style={{fontSize:'18px', fontWeight:'lighter'}}> • 10MB 이하의 JPG. JPEG, PNG 파일<br/> • 1:1 비율이 가장 적절합니다.<br/> • 해상도 1200x675 픽셀 이상</span>
                </div>
                {/* <img className={styles.cameraImg} src={camera} alt="camera icon" style={{cursor:"pointer"}} onClick={()=> (true)}/> */}
            </div>
            <div className={styles.cardImg}>
                <div className={styles.header}>소개 사진 등록</div> <br/> <br/>
                <div className={styles.light}>펀딩 페이지가 등록되면 가장 처음에 보여지는 사진입니다.</div>
                <div className={styles.grayBox}>
                    <div className={styles.light}> • 2MB 이하의 JPG. JPEG, PNG 파일<br/> • 1:1 비율이 가장 적절합니다.<br/> • 해상도 1440x864 픽셀 이하<br/> • 최대 8개까지 등록 가능합니다.</div>
                </div>
                <div className={styles.cameraGroup}>
                    {/* {cameraIcons.map((_, index) => ( */}
                        {/* <img className={styles.cameraImg} src={camera} alt={`camera icon ${index + 1}`} style={{ cursor: 'pointer' }} onClick={() => true} /> ))} */}
                </div>
            </div>
            <div className={styles.projectSum}>
                <div className={styles.header}>프로젝트 요약</div>
                <textarea className={styles.sumBox} value={projectSummary} onChange={handleSummaryChange} placeholder="프로젝트 내용 요약" />
                <div className={styles.textLength}>{projectSummary.length} / 100자</div>
                <button className={styles.saveButton}>저장하기</button>
            </div>
            <div className={styles.projectStory}>
                <div className={styles.header}>소개 사진 등록</div> <br/> <br/>
                <div className={styles.light}>프로젝트 스토리는 프로젝트의 정체성을 보여주는 부분입니다.<br/> 정체성을 잘 적어서 꼭 목표금액까지 펀딩을 달성해보아요!</div>
                <ToastUiEdit />
            </div>
        </div>
    );
};

export default Story