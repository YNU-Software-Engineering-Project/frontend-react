import styles from 'styles/termsOfService/termsOfServicePage.module.css';
import { Outlet } from 'react-router-dom';
import OptionList from 'components/common/OptionList';
import { useNavigate } from 'react-router-dom';

const TermsOfServicePage = () => {
  const navigate = useNavigate();

  const sectionItems = [
    { label: '서비스 소개', value: 'ServiceInfo' },
    { label: '심사 정책', value: 'PolicyInfo' },
    { label: '요금 안내', value: 'PaymentInfo' },
  ];

  const handleSectionChange = (
    label: string,
    e: React.MouseEvent<HTMLLIElement> | undefined,
  ) => {
    if (e === undefined) return;
    const link = sectionItems.find(item => item.label === label);
    if (link === undefined) return;
    navigate(`/termsOfService/${link.value}`);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.body}>
        <div className={styles.topBar}>
          <div className={styles.topBtn}>
            <OptionList
              items={sectionItems.map(item => item.label)}
              onClick={handleSectionChange}
            />
          </div>
        </div>

        <Outlet />
      </div>
    </div>
  );
};

export default TermsOfServicePage;
