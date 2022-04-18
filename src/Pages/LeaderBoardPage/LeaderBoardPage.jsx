import axios from 'axios';
import React, { useEffect } from 'react';
import LeaderBoard from '../../components/board/LeaderBoard';
import Layout from '../Layout';

function LeaderBoardPage() {
  const [rankList, setRankList] = React.useState([]);

  useEffect(() => {
    (async () => {
      const response = await axios(`${process.env.REACT_APP_API_DEFAULTS_URL}/user/rank`);
      const { data } = response;
      setRankList(data);
    })();
  }, []);

  if (!rankList?.length) {
    return <></>;
  }
  return (
    <div style={{ width: '90%', height: 'inherit', margin: 'auto' }}>
      <Layout TopLeft={<LeaderBoard title="랭킹" data={rankList} />} />
    </div>
  );
}

export default LeaderBoardPage;
