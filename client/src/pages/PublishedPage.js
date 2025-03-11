import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function PublishedPage() {
  const { id } = useParams();
  const [htmlCode, setHtmlCode] = useState('');

  useEffect(() => {
    fetch(`https://free-ap-south-1.cosmocloud.io/development/api/justpromptclientmodel/${id}`, {
      headers: {
        'environmentId': '66dc452ca54723b1c14ba1ea',
        'projectId': '66dc452ca54723b1c14ba1e9'
      }
    })
      .then(response => response.json())
      .then(data => setHtmlCode(data.code))
      .catch(error => console.error('Error fetching data:', error));
  }, [id]);

  return (
    <div className="dark">
      <div dangerouslySetInnerHTML={{ __html: htmlCode }} />
    </div>
  );
}

export default PublishedPage;