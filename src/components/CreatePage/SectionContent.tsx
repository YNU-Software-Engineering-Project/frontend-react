import React from 'react';
import { useNavigate } from 'react-router-dom';
import Schedule from 'components/CreatePage/section/Schedule';
import ProjectInfo from 'components/CreatePage/section/ProjectInfo';
import Story from 'components/CreatePage/section/Story';
import Reward from 'components/CreatePage/section/Reward';
import Policy from 'components/CreatePage/section/Policy';
import Setting from 'components/CreatePage/section/Setting';
import styles from "styles/CreatePage/sectionContent.module.css";

interface SectionContentProps {
  selectedSection: string;
}

const SectionContent: React.FC<SectionContentProps> = ({ selectedSection }) => {
  const navigate = useNavigate();

  const renderSection = () => {
    switch (selectedSection) {
      case 'Schedule': return <Schedule/>
      case 'PolicyAndInfo': navigate('/termsOfService', { state: { section: 'PolicyInfo' } });
        return null;
      case 'ProjectInfo': return <ProjectInfo/>
      case 'Story': return <Story/>
      case 'Reward': return <Reward/>
      case 'Policy': return <Policy/>
      case 'Setting': return <Setting/>
    }
  };

  return (
    <div className={styles.content} style={{height:'100%', width:'885px'}}>
      {renderSection()}
    </div>
  );
};

export default SectionContent;