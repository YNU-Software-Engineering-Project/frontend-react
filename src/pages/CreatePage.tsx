import React, { useState } from 'react';
import Header from 'components/common/Header';
import Footer from 'components/common/Footer';
import Sidebar from 'components/CreatePage/SideBar';
import SectionContent from 'components/CreatePage/SectionContent';
import styles from 'styles/CreatePage/createPage.module.css';

const CreatePage: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState<string>('Schedule');

  const handleSectionChange = (section: string) => {
    setSelectedSection(section);
  };

  return <>
    <Header/>
      <div className={styles.createPage}>
        <Sidebar setSelectedSection={handleSectionChange} />
        <SectionContent selectedSection={selectedSection} />
      </div>
    <Footer/>
  </>
};

export default CreatePage;
