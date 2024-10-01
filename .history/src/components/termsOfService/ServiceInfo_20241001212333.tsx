import styles from "styles/termsOfService/serviceInfo.module.css";
import { useNavigate } from "react-router-dom";

interface ServiceInfoProps {
  onSectionChange: (section: string) => void; // 섹션 변경 핸들러의 타입
}

const ServiceInfo: React.FC<ServiceInfoProps> = ({ onSectionChange }) => {
  const navigate = useNavigate();

  const imgClickHandle = function imgClickHandle() {
    window.open('https://www.wadiz.kr/web/wterms/funding_plan_policy/20210910', '_blank');
  };

  const example = () => {
    console.log('Navigating to PolicyInfo...');
    navigate('/termsOfService', { state: { section: 'PolicyInfo' } });
  };
  const handlePolicyInfoNavigation = () => {
    onSectionChange('PolicyInfo');
  };

  return(
    <div className = {styles.wrapper}>
        <div className={styles.header}>
          <p className={styles.underline}>서비스 한줄 소개</p>
          <p className={styles.contentCenter}>💡 대학생 창작물의 평가와 후원을 통해 창의적인 성장을 돕는 펀딩 플랫폼입니다</p>
          <p className={styles.underline}>서비스 제공 목적</p>
          <p className={styles.subTitle}>문제 인식</p>
          <p className={styles.content}>&nbsp;대학생들이 만든 창작물들은 대개 과제로 제출된 후 더 이상의 관심을 받지 못하고 사라지는 경우가 많습니다. 이러한 상황은 학생들의 창의적인 작업이 단기적인 평가에 그치며, 더 넓은 기회를 얻지 못하는 현실을 반영합니다. 더불어, 일부 학생들은 금전적인 제약으로 인해 자신이 원하는 대로 창작물을 만들지 못하고, 잠재력을 충분히 발휘하지 못하는 경우도 발생합니다. 이러한 문제들은 학생들의 창의성과 열정을 억제할 수 있습니다.</p>
          <p className={styles.subTitle}>해결 방법</p>
          <p className={styles.content}>&nbsp;이 문제를 해결하기 위해, 창작물에 대한 다양한 평가와 후원 기회를 제공하는 온라인 플랫폼을 제안합니다. 이 플랫폼을 통해 학생들은 단순히 과제나 취미로 끝나는 것이 아니라, 자신의 창작물을 공개하고, 더 많은 사람들로부터 평가를 받을 수 있습니다. 펀딩 기능을 통해 창작 과정에서 부족한 자금을 모금할 수 있으며, 이를 통해 더 나은 작품을 만들 수 있는 기회를 얻게 됩니다. 또한, 이 플랫폼은 학교라는 한정된 환경을 넘어, 다양한 배경과 관점을 가진 사람들의 피드백을 반영할 수 있는 공간을 제공합니다.
          <br/>&nbsp;이를 통해 학생들은 자신의 창의적인 작업을 지속할 수 있으며, 더 나아가 자신의 작품을 통해 새로운 가능성과 기회를 발견할 수 있게 될 것입니다.</p>
          <p className={styles.underline}>서비스 차별점</p>
          <p className={styles.content}>&nbsp;국내에서 펀딩을 핵심 기능으로 하는 서비스로는 와디즈와 클라우드 펀딩이 있습니다. 그러나 이들 서비스는 펀딩 등록 시 높은 수수료를 부과하기 때문에, 판매자가 높은 수익을 얻기 어려우며, 일반인에게도 진입 장벽이 높습니다. 예를 들어, 아래 이미지에서 볼 수 있는 와디즈의 Light 요금제에는 ‘컨텐츠 제작 도우미’, ‘와딜리버리’, ‘새소식 알림’, ‘펀딩 인증 마크’ 등의 서비스가 기본적으로 포함되어 있습니다. 이러한 추가 서비스들은 모든 창작자에게 필요한 것이 아닐 수 있습니다.</p>
          <div className={styles.imageStyle}>
            <br/>
            <img id="image"
            src="https://www.wadiz.kr/resources/assets-img/terms/funding_plan_policy_01.png" 
            alt="Funding Plan Policy" 
            style={{ width: '100%', maxWidth: '760px' }} 
            />
            <br/>
            <button onClick={imgClickHandle} className={styles.buttonComponent}>사진 링크</button>
          </div>
          <p className={styles.content}>&nbsp;이 점에 착안하여 SparkSeed는 간소화된 요금제를 제공합니다. 펀딩에 필요한 최소한의 기능만을 제공하여, 요금을 낮추고 불필요한 서비스는 배제합니다. 또한, 창작 과정에서 힘든 작업들을 자동화하여 창작자가 별도의 도움 없이도 쉽게 펀딩을 등록할 수 있도록 합니다. 이처럼 SparkSeed는 낮은 요금제와 자동화된 시스템을 통해 개인 창작자들이 부담 없이 쉽게 접근할 수 있는 구조를 갖추고 있습니다.</p>
          <p className={styles.underline}>서비스 정책</p>
          <p className={styles.content}>&nbsp;기존 세분화된 요금제를 개편/통합하여 하나의 요금제를 만들었습니다. 통합된 요금제에는 불필요한 서비스를 제거했습니다. 또 펀딩에 필요한 절차와 서비스는 어린 아이도 쉽게 따라할 수 있도록 펀딩 등록 절차를 간단하게 개편했습니다.
          </p>
          <button className={styles.buttonComponent} onClick={handlePolicyInfoNavigation}> 더보기 </button>
          <p className={styles.underline}>비전</p>
          <p className={styles.contentCenter}>💡 SparkSeed의 비전에 대해서 생각은 “다품종 대량생산 시대에서의 창작과 펀딩” 에서 시작합니다.</p>
          <p className={styles.content}>&nbsp;산업시대를 지나, 이제는 개인의 취향이 중요한 다품종 대량생산의 시대에 접어들었습니다. 이 변화 속에서 자신의 창작물을 통해 새로운 수요 집단을 확보하고, 이를 지원받을 수 있는 기회를 얻을 수 있습니다. 동시에, 기업에게는 이러한 학생들의 창작물이 새로운 시장을 탐색할 수 있는 표본이 될 수 있습니다. 나아가, 학생들과 기업이 연결될 수 있는 접점을 제공하는 것도 가능해집니다.</p>
          <p className={styles.content}>&nbsp;SparkSeed는 펀딩에 필요한 최소한의 기능만을 제공함으로써, 요금을 낮추고 개인 창작에 대한 진입 장벽을 낮추는 것을 목표로 하고 있습니다. 이를 통해 학생들까지도 부담 없이 자신의 창작물을 게시할 수 있도록 하며, 더 많은 개인 창작자들이 활동할 수 있는 환경을 조성하는 것이 궁극적인 목표입니다.</p>
        </div>
    </div>
  )
};

  export default ServiceInfo ;
  