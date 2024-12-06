import { useEffect, useRef, useState } from 'react';
import styles from 'styles/CreatePage/section/story.module.css';
import { Api } from 'apiTypes/Api';
import { FundingStoryRequestDto, StoryContentDto, UploadImagesPayload, UploadMainPayload } from 'apiTypes/data-contracts';
import { useAtom } from 'jotai';
import { fundingIdAtom } from 'components/CreatePage/atoms';
import { Editor } from '@toast-ui/editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import axios from 'axios';

const Story = () => {
  const [projectName, setProjectName] = useState<string>('');
  const [projectSummary, setProjectSummary] = useState<string>('');
  const [imageUrls, setImageUrls] = useState<any[]>([]); // 소개 사진 등록용 이미지 url
  const [boardImageFileList, setBoardImageFileList] = useState<string[]>([]); // uuid
  const [mainImage, setMainImg] = useState<string | null>(); // 대표 이미지
  const [fundingId] = useAtom(fundingIdAtom);

  const editorRef = useRef<Editor | null>(null);
  const editorContainerRef = useRef<HTMLDivElement>(null);
  const mainImgRef = useRef<HTMLInputElement | null>(null);
  const imageRef = useRef<HTMLInputElement | null>(null);
  
  const api = new Api();

  useEffect(() => {
    if (editorContainerRef.current && !editorRef.current && fundingId) {
      // 에디터가 아직 초기화되지 않았다면 초기화
      editorRef.current = new Editor({
        el: editorContainerRef.current,
        height: '500px',
        initialEditType: 'wysiwyg',
        placeholder: '내용을 입력해 주세요.',
        previewStyle: 'vertical',
        hooks: {
          addImageBlobHook: async (file, callback) => {
            // FormData를 사용하여 이미지를 업로드합니다.
            const formData = new FormData();
            formData.append("image", file); // 이미지 파일을 formData에 추가합니다.
      
            try {
              // axios를 사용하여 파일 업로드
              const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
              const response = await axios.post(
                `${baseURL}/api/user/fundings/${fundingId}/editor/image-upload`,
                formData,
                {
                  headers: {
                    'Content-Type': 'multipart/form-data',
                  },
                }
              );
      
              // 서버에서 받은 filename 사용
              const filename = response.data.filename; // 서버에서 반환된 파일 이름 필드 추출
              const imageUrl = `${baseURL}/api/user/fundings/editor/image-print/${filename}`;
      
              // 에디터에 이미지 삽입 콜백 호출
              callback(imageUrl, filename);
              alert("이미지 업로드 성공");
            } catch (error) {
              console.error("이미지 업로드 실패:", error);
            }
          }
        }
      });
    }
    handleProjectStory();
  }, []);
  // 불러오기
  const handleProjectStory = () => {
    if (fundingId) {
      api.getProject(fundingId)
        .then((response) => {
          const storyData = response.data;
          setProjectName(storyData.title || "");
          setProjectSummary(storyData.summary || "");
          //에디터 인스턴스가 있을 때 storyData.story를 로드
          if (editorRef.current && storyData.story) {
            editorRef.current.setMarkdown(storyData.story);
          }
          setMainImg(storyData.main_url || "");
          setImageUrls(storyData.image_url || []);
          setBoardImageFileList(storyData.image_uuid ? storyData.image_uuid: []);
          // setImageUrls(storyData.image_url || []);
        })
        .catch((error) => {
          console.error("프로젝트 정보를 불러오는 중 오류 발생:", error);
          alert("프로젝트 정보를 불러오는 중 오류가 발생했습니다.");
        });
    }
  };
  //메인 이미지 설정
  const mainImgClickHandler = () =>{
    if(!mainImgRef.current) return;
    mainImgRef.current.click();
  };
  // 메인 이미지 추가 
  const addMainImageHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !event.target.files.length) return;

    const file = event.target.files[0];

    try{
      const payload:UploadMainPayload={
        file: file,
      };
      if(fundingId){
        api.uploadMain(fundingId,payload)
          .then((response)=>{
            const imageUrl = response.data.url;
            setMainImg(imageUrl);
            alert("메인 이미지 저장 완료");
          })
          .catch(error=>{
            alert("메인 이미지 저장 실패");
          })
      }
    }catch(error){
      console.error("메인 이미지 업로드 중 오류 발생:", error);
      alert("메인 이미지 업로드 중 오류가 발생했습니다.");
    }
  };
  //메인 이미지 삭제
  const mainImgDeleteHandler = () =>{
    if(!mainImgRef.current) return;
    mainImgRef.current.value = "";
    try{
      if(fundingId){
        api.deleteMain(fundingId)
          .then(()=>{
            alert("메인 이미지가 성공적으로 삭제되었습니다.");
            setMainImg(null);
        })
        .catch(error=>{
            alert("메인 이미지 삭제에 실패했습니다.");
        })
      }
    }catch (error) {
      console.error("메인 이미지 삭제 중 오류 발생:", error);
      alert("메인 이미지 삭제 중 오류가 발생했습니다.");
    }
  };
  // 소개 사진 설정
  const imageClickHandler = () => {
    if (!imageRef.current) return;
    imageRef.current.click();
  };
  // 소개 사진 추가
  const addImageHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !event.target.files.length) return;
  
    const newFiles = Array.from(event.target.files);
  
    if (newFiles.length + imageUrls.length > 8) {
      alert("소개 사진은 최대 8개까지 가능합니다");
      return;
    }
  
    try {
      if (fundingId) {
        const uploadedImageUrls: string[] = [];
        const uploadedUuids: string[] = [];
  
        for (const file of newFiles) {
          const payload: UploadImagesPayload = {
            file,
          };
  
          // 이미지 업로드 요청 보내기
          try {
            const imageResponse = await api.uploadImages(fundingId, payload);
            const uuid = imageResponse.data.uuid_name;
            const url = imageResponse.data.url;
  
            if (uuid && url) {
              uploadedImageUrls.push(url);
              uploadedUuids.push(uuid);
            }
          } catch (error) {
            console.error("이미지 업로드 중 오류 발생:", error);
          }
        }
        if (uploadedImageUrls.length === uploadedUuids.length) {
          setImageUrls((prevUrls) => [...prevUrls, ...uploadedImageUrls]);
          setBoardImageFileList((prevFiles) => [...prevFiles, ...uploadedUuids]);
        } else {
          alert("이미지 업로드 중 일부 실패했습니다. 다시 시도해 주세요.");
        }
      }
    } catch (error) {
      console.error("소개 사진 업로드 중 오류 발생:", error);
    }
  };
  
  // 이미지 삭제 핸들러 (uuid 사용)
  const imageDeleteHandler = (uuid: string) => {
    try {
      if (uuid) {
        console.log("삭제할 uuid:", uuid);
  
        api.deleteImage(uuid)
          .then(() => {
            setImageUrls((prevUrls) =>
              prevUrls.filter((_, index) => boardImageFileList[index] !== uuid)
            );
            setBoardImageFileList((prevFiles) =>
              prevFiles.filter((fileUuid) => fileUuid !== uuid)
            );
          })
          .catch((error) => {
            console.error("이미지 삭제 중 오류 발생:", error);
            alert("이미지 삭제에 실패했습니다.");
          });
      }
    } catch (error) {
      console.error("소개 이미지 삭제 중 오류 발생:", error);
    }
  };
  // 프로젝트 명 설정
  const handleNameChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (event.target.value.length <= 20) {
      setProjectName(event.target.value);
    }
  };
  //프로젝트 요약 설정
  const handleSummaryChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (event.target.value.length <= 100) {
      setProjectSummary(event.target.value);
    }
  };
  // 저장하기 (제출하기)
  const handleSubmit = async () => {
    const editorContent = editorRef.current ? editorRef.current.getMarkdown() : '';

    const dataToSend: FundingStoryRequestDto = {
      title: projectName,
      summary: projectSummary,
    };
    const tuiData:StoryContentDto={
      content:editorContent,
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
        api.savePost(fundingId,tuiData)
        .catch(error=>{
          console.error("tui 저장 실패:", error);
          if (error.response) {
            alert(`tui 저장 실패: ${error.response.data.message || "서버 오류"}`);
          } else {
            alert("tui 저장 실패: 네트워크 오류");
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
        <div className='mainImage'>
          <div className={styles.storyImage} style={{display:'grid'}}>
            <button className={styles.addBtn} style={{display: mainImage ? "none" : "block"}} onClick={mainImgClickHandler}>메인 사진 선택</button>
            <input ref={mainImgRef} type = "file" onChange={addMainImageHandler} style={{ display: 'none' }} accept="image/*"/>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {mainImage && (
              <div className='mainImgCon' style={{ position: 'relative', display: 'grid' }}>
                <img className={styles.img} src={mainImage} style={{ width: '200px', height: '200px', objectFit: 'cover', marginTop:'10px'}}/>
                <button style={{ padding: '0', position: 'absolute', border: 'none', backgroundColor: 'transparent', left: '100%' }} onClick={mainImgDeleteHandler}>X</button>
              </div>
            )}
          </div>
        </div>
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
        <div className='image'>
          <div className={styles.storyImage}>
            <button className={styles.addBtn} onClick={imageClickHandler}>소개 사진 선택</button>
            <input ref={imageRef} type = "file" onChange={addImageHandler} style={{ display: 'none' }} accept="image/*"/>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px'}}>
            {imageUrls.map((imageUrl, index) => (
              <div className='mainImgContainer' style={{ position: 'relative', display: 'grid' }} key={index}>
                <img  src={imageUrl} style={{ width: '200px', height: '200px', objectFit: 'cover' }} />
                <button
                  style={{ padding: '0', position: 'absolute', border: 'none', backgroundColor: 'transparent', left: '100%' }}
                  onClick={() => imageDeleteHandler(boardImageFileList[index])}
                >
                  X
                </button>
              </div>
            ))}
          </div>
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
        <div ref={editorContainerRef} />
      </div>
      <div className={styles.saveBtn} onClick={handleSubmit} style={{ display: 'flex', justifySelf: 'end', cursor: 'pointer' }}>
        저장하기
      </div>
    </div>
  );
};

export default Story;