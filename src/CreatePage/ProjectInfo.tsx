import { useState } from "react";
import styles from "styles/CreatePage/sections/projectInfo.module.css";
// import documentImg from "assets/documentFrame.png";

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

const ProjectInfo =()=>{
    const [selectedCategory, setSelectedCategory] = useState<string>('');

    const [tag, setTag] = useState(''); //tag string
    const [name, setName] = useState('');
    const [email, setEMail] =useState('');
    const [taxEmail, setTaxEmail] = useState('');
    const [amount, setAmount] = useState('');
    
    const handleTagChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (event.target.value.length <= 10) {
          setTag(event.target.value);
        }
    };
    const handleName = (event: React.ChangeEvent<HTMLTextAreaElement>) => {setName(event.target.value)};
    const handleEmail = (event: React.ChangeEvent<HTMLTextAreaElement>) => {setEMail(event.target.value)};
    const handleTaxEmail= (event: React.ChangeEvent<HTMLTextAreaElement>) => {setTaxEmail(event.target.value)};
    const handleAmount= (event: React.ChangeEvent<HTMLTextAreaElement>) => {setAmount(event.target.value)};
    
    const categoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(event.target.value);
    };

    return(
        <div className={styles.wrapper}>
            <div className={styles.categoryContainer}>
                <div className={styles.title}>카테고리</div>
                <div className={styles.light}>카테고리를 하나 선택하세요. 카테고리를 상세하게 선택할수록 서포터가 프로젝트를 더 잘 찾을 수 있어요.<br/> 혹시, 중분류 카테고리에 원하는 항목이 없다면 해당 없음을 선택해 주세요.</div>
                <div className={styles.categoryBox}>
                <select className={styles.categorySelect} style={{fontSize:'18px', width: '212px',height: '48px'}} value={selectedCategory} onChange={categoryChange}>
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
                    <div className={styles.tagInputBox}>
                        <span style={{fontSize:'18px', lineHeight:'28px', borderRight: '1px solid black', width:'45px', height:'104px', display:'flex',alignItems:'center'}}>태그</span>
                        <div className={styles.tagInputArea}>
                            <textarea className={styles.tagInput} value={tag} onChange={handleTagChange} placeholder="태그 입력"></textarea>
                            <button className={styles.saveBtn}>추가하기</button>
                            <br/><div className={styles.textLength} style={{fontSize:'12px', fontWeight:'lighter'}}>{tag.length} / 10자</div>
                        </div>
                    </div>
                    <div className={styles.addedTag}>
                        <div className={styles.addedTagContainer}></div>
                    </div>
                </div>
            </div>
            <div className={styles.setFundingOrgan}>
                <div className={styles.title}>태그 주최자 등록</div>
                <div className={styles.light}>SparkSeed는 학생들을 위한 펀딩 사이트 임으로 개인으로서의 펀딩만 유효합니다.<br/> 개인 사업자, 법인사업자등록은 할 수 없습니다.</div>
                <div className={styles.setOrganInfo}>
                    <div className={styles.subHead} style={{justifyContent:"flex-start"}}>신분증</div>
                    <button className={styles.idFile} style={{justifyContent:'end'}}>첨부 파일 업로드</button>
                </div>
                <div className={styles.setOrganInfo}>
                    <div className={styles.subHead}>대표자명</div>
                    <textarea className={styles.infoArea} value={name} onChange={handleName} placeholder="대표자명"></textarea>
                </div>
                <div className={styles.setOrganInfo}>
                    <div className={styles.subHead}>대표자 이메일</div>
                    <textarea className={styles.infoArea} value={email} onChange={handleEmail} placeholder="이메일"></textarea>
                </div>
                <div className={styles.setOrganInfo}>
                    <div className={styles.subHead}>세금계산서 발행 이메일</div>
                    <textarea className={styles.infoArea} value={taxEmail} onChange={handleTaxEmail} placeholder="이메일"></textarea>
                </div>
            </div>
            <div className={styles.screenDocument}>
                <div className={styles.title}>심사 서류</div>
                <div className={styles.grayBox}>심사 서류는 앞으로 작성할 스토리 보드 내용이 허위가 아님을 증명하는 서류를 추가하시면됩니다.</div>
                {/* <img className={styles.documentImg} src={documentImg} alt="document image" width="500px" style={{ cursor: "pointer", justifySelf:'center' }} onClick={() => {console.log(0);}}></img> */}
            </div>
            <div className={styles.fundingPeriod}>
                <div className={styles.title}>펀딩 기간</div>
                <div className={styles.light}>펀딩 기간은 최대 60일입니다.</div>
                <input type="date" id="date" max="2099-12-31"min="1999-01-01" value="today"></input>
            </div>
            <div className={styles.targetAmount}>
                <div className={styles.title}>목표 금액</div>
                <div className={styles.light}>목표하는 금액을 적으시면 됩니다. 기본단위는 원입니다.</div>
                <textarea className={styles.setAmount} value={amount} onChange={handleAmount} placeholder="목표 금액을 적어주세요."
                style={{height:'63px', fontSize:'18px', fontWeight:'lighter', lineHeight:'28px',border:'4px solid #D9D9D9', padding:'10px'}}></textarea>
            </div>
            <div className={styles.saveBtn}></div>
        </div>
    );
};
export default ProjectInfo;