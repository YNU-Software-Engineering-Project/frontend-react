import Button from 'components/common/Button';
import style from 'styles/homePage/ServoceInfo.module.css';

const ServiceInfo = () => {
  return (
    <>
      <div className={style.wrapper}>
        <div className={style.header}>
          <p
            style={{
              fontSize: '48px',
              textAlign: 'center',
              fontWeight: 'bold',
            }}
          >
            부담없이 재능을 펼칠 수 있는 솔루션
          </p>
        </div>
        <div className={style.subHeader}>
          <p>
            업계 최저 수수료 정책으로 인해서 기업규모가 아닌 개인도 쉽게 참여
            가능합니다. 우리는 귀하의 펀딩 시작부터 펀딩 목표 도달까지 모든 것을
            함께합니다. 누구나 쉽게 펀딩을 시작하도록 이후의 관리까지 직관적으로
            스스로 모든 것을 할수 있는 도구를 제공합니다.
          </p>
        </div>
        <div className={style.main}>
          <div className={style.options}>
            <div>
              <p>쉽게 시작할 수 있습니다.</p>
              <p>일반인도 펀딩 시작부터 종료까지 쉽게 할 수 있습니다.</p>
            </div>
            <div>
              <p>창작자와 창작물을 가장 중요시합니다.</p>
              <p>업계에서 가장 낮은 수수료를 적용합니다.</p>
            </div>
            <div>
              <p>펀딩 주최자와 후원자의 소통이 쉽습니다.</p>
              <p>펀딩 주최자와 메일 시스템을 통해서 쉽게 소통이 가능합니다.</p>
            </div>
          </div>
          <img
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="hiFive Img"
          />
        </div>
        <Button>더보기</Button>
      </div>
    </>
  );
};

export default ServiceInfo;
