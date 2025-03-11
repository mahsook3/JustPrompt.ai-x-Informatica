import React, { useEffect, useState } from 'react';

export default function Test() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const targetUrl = 'https://niryat.gov.in/group_data?start_date=202404&end_date=202410&sort_table=export_achieved-sort-desc&country_id=10&region_id=1&commodity_group_id=3';

    fetch(proxyUrl + targetUrl)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : 'Loading...'}
    </div>
  );
}