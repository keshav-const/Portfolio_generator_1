import React from 'react';
import { PortfolioData } from '../../types';
import MinimalistTemplate from './templates/MinimalistTemplate';
import DevFolioTemplate from './templates/DevFolioTemplate';
import CreativeTemplate from './templates/CreativeTemplate';
import DarkModeTemplate from './templates/DarkModeTemplate';
import ModernTemplate from './templates/ModernTemplate';

interface PortfolioPreviewProps {
  portfolioData: PortfolioData;
  template: string;
}

const PortfolioPreview: React.FC<PortfolioPreviewProps> = ({
  portfolioData,
  template,
}) => {
  const renderTemplate = () => {
    switch (template) {
      case 'minimalist':
        return <MinimalistTemplate data={portfolioData} />;
      case 'devfolio':
        return <DevFolioTemplate data={portfolioData} />;
      case 'creative':
        return <CreativeTemplate data={portfolioData} />;
      case 'darkmode':
        return <DarkModeTemplate data={portfolioData} />;
      case 'modern':
        return <ModernTemplate data={portfolioData} />;
      default:
        return <MinimalistTemplate data={portfolioData} />;
    }
  };

  return (
    <div className="w-full h-full">
      <div className="transform scale-50 origin-top-left w-[200%] h-[200%]">
        {renderTemplate()}
      </div>
    </div>
  );
};

export default PortfolioPreview;