import { ChangeEvent, useEffect, useRef, useState } from "react";
import styles from "styles/CreatePage/section/projectInfo.module.css";
import documentImg from "assets/documentFrame.png";
import { FundingInfoRequestDto, InsertTagRequestDto, UploadDocumentPayload, UploadIDcardPayload } from "apiTypes/data-contracts";
import { Api } from "apiTypes/Api";
import { Token } from "apiTypes/Token";
import { useAtom } from 'jotai';
import { fundingIdAtom } from "components/CreatePage/atoms";
import axios from "axios";

const categories = [
    { label: "캐릭터·굿즈", value: "캐릭터·굿즈" },
    { label: "홈·리빙", value: "홈·리빙" },
    { label: "사진", value: "사진" },
    { label: "게임", value: "게임"},
    { label: "키즈", value: "키즈"},
    { label: "도서·전자책", value: "도서·전자책"},
    { label: "여행", value: "여행"},
    { label: "만화·웹툰", value: "만화·웹툰"},
    { label: "스포츠·아웃도어", value: "스포츠·아웃도어"},
    { label: "테크·가전", value: "테크·가전"},
    { label: "자동차", value: "자동차"},
    { label: "패션", value: "패션"},
    { label: "아트", value: "아트"},
    { label: "소셜", value: "소셜"},
    { label: "영화·음악", value: "영화·음악"},
    { label: "반려동물", value: "반려동물"},
    { label: "디자인", value: "디자인"},
];

interface Tag {
    id: number; // tag_id는 서버에서 받아오는 고유값
    name: string;
}

const ProjectInfo =()=>{
    const [selectedCategory, setSelectedCategory] = useState<string>();

    const [tag, setTag] = useState<string>(''); // 태그 입력 값
    const [tags, setTags] = useState<Tag[]>([]); // 추가된 태그 리스트
    const [name, setName] = useState('');
    const [email, setEmail] =useState('');
    const [taxEmail, setTaxEmail] = useState('');
    const [amount, setAmount] = useState('');
    const [firstDate, setFirstDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [imgUrls, setImgUrls] = useState<string[]>([]);
    const [boardImageFileList, setBoardImageFileList] = useState<File[]>([]); 
    const [idCardUrl, setIdCardUrl] = useState< string | null>();

    const imageInputRef = useRef<HTMLInputElement | null>(null);
    const idCardInputRef = useRef<HTMLInputElement | null>(null);

    const [fundingId, setFundingId] = useAtom(fundingIdAtom);

    const api = new Api();
    
    // 컴포넌트가 마운트될 때 로컬 스토리지에서 `fundingId` 가져오기
    useEffect(() => {
        const savedId = localStorage.getItem('fundingId');
        if (savedId) {
        setFundingId(Number(savedId));
        console.log("로컬 스토리지에서 불러온 fundingId:", savedId);
        }
    }, []);

    // `fundingId`가 설정되면 handleInfo 실행
    useEffect(() => {
        if (fundingId) {
        handleInfo(fundingId);
        // `fundingId`를 로컬 스토리지에 저장
        localStorage.setItem('fundingId', String(fundingId));
        }
        else{
            alert("대표자명, 대표자 이메일, 세금 계산서 발행 이메일을 먼저 작성해 주세요!")
        }
    }, [fundingId]);  
    
    const handleInfo =(fundingId: number)=>{
        if (fundingId) {
            // `fundingId`가 있을 때만 프로젝트 정보 불러오기
            api.getInfo(fundingId)
                .then(async (response) => {
                    const projectData = response.data;
                    // 받아온 데이터로 상태 업데이트
                    setSelectedCategory(projectData.category || "");
                    setName(projectData.organizer_name || "");
                    setEmail(projectData.organizer_email || "");
                    setTaxEmail(projectData.tax_email || "");
                    setAmount(projectData.target_amount || "");
                    setFirstDate(projectData.start_date || "");
                    setEndDate(projectData.end_date || "");
                    fetchTags();
                    if (projectData.idCard_uuid) {
                        const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080';
                        const correctUrl = `${backendUrl}/file/view/project_document/${projectData.idCard_uuid}`;
                        setIdCardUrl(correctUrl);
                    }
                    const { document_url = [], document_name = [], document_uuid = [] } = response.data;
                    setImgUrls(document_uuid);
                    const files = document_uuid.map((uuid, index) => new File([document_url[index]], document_name[index]));
                    setBoardImageFileList(files);
                })
                .catch((error) => {
                    console.error("프로젝트 정보를 불러오는 중 오류 발생:", error);
                    alert("프로젝트 정보를 불러오는 중 오류가 발생했습니다.");
                });
        }
    }

    //신분증 구현
    const idCardButtonHandler = () => {
        if (!idCardInputRef.current) return;
        idCardInputRef.current.click();
    }
    const onIdCardChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files || !event.target.files.length) return;
    
        const file = event.target.files[0];
        
        try { // 서버로 신분증 파일 업로드
            const payload: UploadIDcardPayload = {
                file: file,
            };
    
            if (fundingId) {
                api.uploadIDcard(fundingId, payload)
                    .then((response)=>{
                        setIdCardUrl(response.data.url);
                        alert("신분증이 성공적으로 업로드되었습니다.");
                    })
                    .catch(error=>{
                        alert("신분증 업로드에 실패했습니다.");
                    })
            }
        } catch (error) {
            console.error("신분증 업로드 중 오류 발생:", error);
            alert("신분증 업로드 중 오류가 발생했습니다.");
        }
    }
    const onIdCardCloseButtonClickHandler = () => { // 심사 서류 삭제
        if (!idCardInputRef.current) return;
        idCardInputRef.current.value = "";
        try{
            if(fundingId){
                api.deleteIDcard(fundingId)
                    .then(()=>{
                        alert("신분증이 성공적으로 삭제되었습니다.");
                        setIdCardUrl(null);
                    })
                    .catch(error=>{
                        alert("신분증 삭제에 실패했습니다.");
                    })
            } else {
                alert("펀딩 ID가 없습니다.");
            }
        } catch (error) {
            console.error("신분증 삭제 중 오류 발생:", error);
            alert("신분증 삭제 중 오류가 발생했습니다.");
        }
    }
    //심사 서류
    const imageButtonHandler = () => {
        if (!imageInputRef.current) return;
        imageInputRef.current.click();
    };
    // 이미지 추가 핸들러 (이미지 업로드)
    const onImageChangeHandler = async (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files || !event.target.files.length) return;
        const newFiles = Array.from(event.target.files);
        
        try {
            if (fundingId) {
                for (const file of newFiles) {
                    const payload: UploadDocumentPayload = {
                        file,
                    };
        
                    const response = await api.uploadDocument(fundingId, payload);
                    if (response.status === 200 && response.data.uuid_name) {
                        const uuidUrl = response.data.uuid_name;
                        setImgUrls((prevUrls) => [...prevUrls, uuidUrl]);
                        setBoardImageFileList((prevFiles) => [...prevFiles, file]);
                    } else {
                        console.error("심사서류 업로드에 실패했습니다.");
                    }
                }
            } else {
                alert("펀딩 ID가 없습니다.");
            }
        } catch (error) {
            console.error("이미지 업로드 중 오류 발생:", error);
        }
    };
    // 이미지 삭제 핸들러
    const onImageCloseButtonClickHandler = async (deleteIndex: number) => {
        try {
            const uuidName = imgUrls[deleteIndex];
            if (uuidName) {
                const response = await api.deleteDocument(uuidName);
                if (response.status === 200) {
                setImgUrls((prevUrls) => prevUrls.filter((_, index) => index !== deleteIndex));
                setBoardImageFileList((prevFiles) => prevFiles.filter((_, index) => index !== deleteIndex));
                } else {
                console.error("이미지 삭제에 실패했습니다.");
                }
            }
        } catch (error) {
            console.error("이미지 삭제 중 오류 발생:", error);
        }
    };
    //Tag
    const handleTagChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (event.target.value.length <= 10) {
          setTag(event.target.value);
        }
    };
    // 태그 추가 처리 함수
    const addTag = async () => {
        if (tag.trim() && tags.length < 5 && !tags.some(t => t.name === tag)) {
            const requestTag: InsertTagRequestDto = {
                tagName: tag,
            };
            if (fundingId != null) {
                try {
                    const response = await api.insertTag(fundingId, requestTag);
                    if (response.status === 200) {
                        if (response.data.tag_id !== undefined) {
                            console.log("Insert tag with id:", response.data.tag_id); // 여기서 로그 출력
                            const newTag: Tag = {
                                id: response.data.tag_id, // 서버에서 반환된 tag_id 사용
                                name: tag,
                            };
                            setTags([...tags, newTag]);
                            alert('태그가 성공적으로 추가되었습니다.');
                        } else {
                            console.error('서버에서 유효한 tag_id를 반환하지 않았습니다.');
                        }
                        // 입력 필드 초기화
                        setTag('');
                    }
                } catch (error: any) {
                    console.error("태그 추가 실패:", error);
                    if (error.response) {
                        alert(`태그 추가 실패: ${error.response.data.message}`);
                    } else {
                        alert('태그 추가 실패: 네트워크 오류');
                    }
                }
            }
        }
    };
    const removeTag = async (tagToRemove: Tag) => {
        try {
            const response = await api.deleteTag(tagToRemove.id); // 서버에서 받은 tag_id를 사용해서 삭제 요청
            if (response.status === 200) {
                console.log("지울 태그 id:", tagToRemove.id);
                await fetchTags();
                setTags(tags.filter(tag => tag.id !== tagToRemove.id)); // 상태에서 해당 태그 제거
                alert("태그가 삭제되었습니다.");
            } else {
                alert("태그 삭제에 실패했습니다.");
            }
        } catch (error: any) {
            console.error("태그 삭제 중 오류 발생:", error);
            alert("태그 삭제에 실패했습니다.");
        }
    };
    const fetchTags = async () => {
        if (fundingId != null) {
            try {
                const response = await api.getInfo(fundingId);
                const tagIds = response.data.tag_id || []; // 서버에서 받아온 태그 ID 리스트
                const tagNames = response.data.tag || []; // 서버에서 받아온 태그 이름 리스트
    
                // 서버에서 태그 정보를 배열로 받아온다고 가정
                if (Array.isArray(tagIds) && Array.isArray(tagNames)) {
                    const newTags: Tag[] = tagIds.map((id, index) => ({
                        id: id,
                        name: tagNames[index],
                    }));
                    
                    // 상태에 태그 리스트 업데이트
                    setTags(newTags);
                } else {
                    console.error("유효한 태그 정보를 받지 못했습니다:", response.data);
                }
            } catch (error) {
                console.error('태그 목록을 가져오는 중 오류 발생:', error);
                alert('태그 목록을 가져오는 중 오류가 발생했습니다.');
            }
        }
    };
    // 카테고리 변경 처리 함수
    const categoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(event.target.value);
    };
    const getMaxEndDate = () => {
        if (!firstDate) return ''; // 첫 날짜가 비어 있으면 최대 날짜도 비워둡니다.
        
        const first = new Date(firstDate);
        const maxDate = new Date(first);
        maxDate.setDate(first.getDate() + 60); // 첫 날짜로부터 60일 더하기
        return maxDate.toISOString().split('T')[0]; // YYYY-MM-DD 형식으로 변환
    };
    const handleSubmit = async () => {
        const dataToSend:FundingInfoRequestDto = {
            category: selectedCategory || undefined,
            organizer_name: name || undefined,
            organizer_email: email || undefined,
            tax_email: taxEmail || undefined,
            target_amount: amount || undefined,
            start_date: firstDate || undefined,
            end_date: endDate || undefined
        };
        const params = {
            headers: {
                Authorization: Token.getToken,
        },
        };
        console.log(dataToSend);
        console.log(fundingId);
        if(fundingId!=null){
            api
            .modifyInfo(fundingId,dataToSend, params)
            .then((response)=>{
                alert("저장 성공: 펀딩 정보가 저장되었습니다.");
                console.log("응답 데이터:", response.data);
            })
            .catch(error => {
                console.error("저장 실패:", error);
                if (error.response) {
                    alert(`저장 실패: ${error.response.data.message || "서버 오류"}`);
                } else {
                    alert("저장 실패: 네트워크 오류");
                }
            })
        }
        else{
            api.register(Token.getHeaderParms)
                .then(()=>{
                    api.registerFunding(dataToSend,Token.getHeaderParms)
                    .then((response) => {
                        // registerFunding의 응답에서 펀딩 ID를 받아온다.
                        const newFundingId = response.data?.funding_id;
                        if (newFundingId) {
                            setFundingId(newFundingId);  // 상태로 설정
                            alert("펀딩 게시물 생성이 성공적으로 완료되었습니다.");
                        } else {
                            throw new Error('펀딩 ID를 받을 수 없습니다.');
                        }
                    })
                    .catch((error) => {
                        if (axios.isAxiosError(error) && error.response) {
                            console.error("펀딩 등록 실패:", error.response.data);
                            alert(`펀딩 등록 실패: ${error.response.data.message || '서버 오류'}`);
                        } else {
                            console.error("펀딩 등록 실패: 네트워크 오류", error);
                            alert("펀딩 등록 중 네트워크 오류가 발생했습니다.");
                        }
                    });
                })
                .catch((error) => {
                    if (error.response && error.response.status === 400) {
                        alert("학교 이메일 인증을 해주세요! (마이페이지->학교 이메일 인증)");
                    } else {
                        console.error("오류 발생:", error);
                        alert("알 수 없는 오류가 발생했습니다.");
                    }
                });
        }
    };

    return<>
    <div className={styles.wrapper} >
        <div className={styles.categoryContainer}>
            <div className={styles.title}>카테고리</div>
            <div className={styles.light}>카테고리를 하나 선택하세요. 카테고리를 상세하게 선택할수록 서포터가 프로젝트를 더 잘 찾을 수 있어요.<br/> 혹시, 중분류 카테고리에 원하는 항목이 없다면 해당 없음을 선택해 주세요.</div>
            <div className={styles.categoryBox}>
                <select className={styles.categorySelect} style={{ cursor:"pointer",fontSize:'18px', width: '212px',height: '48px', backgroundColor:'#FAFAFA', borderRadius:'8px'}} value={selectedCategory || ''} onChange={categoryChange}>
                    <option disabled value="">카테고리를 선택하세요</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category.value}>
                            {category.label}
                        </option>
                    ))}
                </select>
            </div> 
        </div>
        <div className={styles.tagContainer}>
            <div className={styles.title}>태그</div>
            <div className={styles.light}>태그는 최대 5개까지 추가 가능합니다.</div>
            <div className={styles.tagInfo}>
                <span style={{fontSize:'18px', lineHeight:'28px', borderRight: '1px solid black', width:'45px', height:'104px', display:'flex',alignItems:'center'}}>태그</span>
                <div className={styles.tagInputArea}>
                    <textarea className={styles.inputBox} value={tag} onChange={handleTagChange} placeholder="태그 입력"></textarea>
                    <button className={styles.saveBtn} onClick={addTag}>추가하기</button>
                    <br/><div className={styles.textLength} style={{fontSize:'12px', fontWeight:'lighter'}}>{tag.length} / 10자</div>
                </div>
                <div className={styles.addedTag} style={{maxWidth:'368px',maxHeight:'104px',display:'flex', flexWrap:'wrap', gap:'2px', paddingLeft:'5px'}}>
                    {tags.map((tag) => (
                        <div key={tag.id} className={styles.tagItem} style={{border:'0px solid', backgroundColor:'#D9D9D9',padding:'8px', borderRadius:'8px'}}>
                            {tag.name} <button style={{border:'none', backgroundColor:'transparent'}} onClick={() => removeTag(tag)}>x</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        <div className={styles.setFundingOrgan}>
            <div className={styles.title}>펀딩 주최자 등록</div>
            <div className={styles.light}>SparkSeed는 학생들을 위한 펀딩 사이트 임으로 개인으로서의 펀딩만 유효합니다.<br/> 개인 사업자, 법인사업자등록은 할 수 없습니다.</div>
            <div className={styles.setOrganInfo}>
                <div className={styles.subHead} style={{justifyContent:"flex-start"}}>신분증</div>
                <button className={styles.saveBtn} style={{justifyContent:'end', marginRight:'20px', display: idCardUrl ? "none" :"block" }} onClick={idCardButtonHandler}>첨부 파일 업로드</button>
                <input ref={idCardInputRef} type='file' accept="image/*" style={{display:'none'}} onChange={onIdCardChangeHandler}/>
            </div>
            {idCardUrl && (
                <div style={{position:'relative'}}>
                    <img className={styles.img} src={idCardUrl} style={{width:'100%'}}/>
                    <button style={{display:'flex', width:'30px', height:'30px', opacity:0.7, border:'none',position:'absolute', top:'20px', right:'20px', borderRadius:'50%',justifyContent:'center', alignItems:'center'}} onClick={onIdCardCloseButtonClickHandler}>X</button>
                </div>
            )}
            <div className={styles.setOrganInfo}>
                <div className={styles.subHead}>대표자명</div>
                <textarea className={styles.inputBox} style={{width:'584px'}} value={name || ''} onChange={(e) => setName(e.target.value)} placeholder="대표자명"></textarea>
            </div>
            <div className={styles.setOrganInfo}>
                <div className={styles.subHead}>대표자 이메일</div>
                <textarea className={styles.inputBox} style={{width:'584px'}} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="이메일"></textarea>
            </div>
            <div className={styles.setOrganInfo}>
                <div className={styles.subHead}>세금계산서 발행 이메일</div>
                <textarea className={styles.inputBox} style={{width:'584px'}} value={taxEmail} onChange={(e) => setTaxEmail(e.target.value)} placeholder="이메일"></textarea>
            </div>
        </div>
        <div className={styles.screenDocument}>
            <div className={styles.title}>심사 서류</div>
            <div className={styles.grayBox}>심사 서류는 앞으로 작성할 스토리 보드 내용이 허위가 아님을 증명하는 서류를 추가하시면 됩니다.</div>
            <div style={{ cursor:"pointer", justifySelf: "center", alignSelf: "center" }} onClick={imageButtonHandler}>
                <img className={styles.documentImg}src={documentImg}alt="document image"width="500px" style={{ display: "block" }}/>
            </div>
            <input ref={imageInputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={onImageChangeHandler} />
            <div>
                {imgUrls.map((imageUrl, index) => (
                    <div  key={index} style={{ position: "relative", marginTop: "20px" }}>
                        {boardImageFileList[index]?.name || "이미지 이름을 알 수 없음"}
                        <button
                            style={{ display: "flex", width: "30px", height: "30px", opacity: 0.7, border: "none", position: "absolute",
                                top: "20px", right: "20px", borderRadius: "50%", justifyContent: "center", alignItems: "center",}} onClick={() => onImageCloseButtonClickHandler(index)}>X
                        </button>
                    </div>
                ))}
            </div>
        </div>
        <div className={styles.fundingPeriod}>
            <div className={styles.title}>펀딩 기간</div>
            <div className={styles.light}>펀딩 기간은 최대 60일입니다.</div>
            <div style={{display:'flex', flexWrap:'wrap', gap: '20px'}}>
                <div>
                    <p>시작 날짜를 고르시오.</p>
                    <input type="date" id='firstDate' value={firstDate} max="2099-12-31" min="1999-01-01" onChange={(e) => setFirstDate(e.target.value)} style={{width:'380px', height: '28px',fontSize:'18px',cursor:'pointer'}}></input>
                </div>
                <div>
                    <p>마감 날짜를 고르시오.</p>
                    <input type="date" id='endDate' value={endDate} max={getMaxEndDate()} min={firstDate} onChange={(e) => setEndDate(e.target.value)} style={{width:'380px', height: '28px',fontSize:'18px',cursor:'pointer'}}></input>
                </div>
            </div>
        </div>
        <div className={styles.targetAmount}>
            <div className={styles.title}>목표 금액</div>
            <div className={styles.light}>목표하는 금액을 적으시면 됩니다. 기본단위는 원입니다.</div>
            <textarea className={styles.inputBox} value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="목표 금액을 적어주세요."
            ></textarea>
        </div>
        <div className={styles.saveBtn} onClick={handleSubmit} style={{display:'flex', justifySelf:'end'}}>저장하기</div>
    </div>
    </>
};

export default ProjectInfo;
