import React, { useState } from 'react';
import Github from './Github';
import PDFMaker from './PDFMaker';

export default function DocumentGenerator() {
  const [githubData, setGithubData] = useState(null);

  return (
    <>
      <Github setGithubData={setGithubData} />
      <PDFMaker githubData={githubData} />
    </>
  );
}