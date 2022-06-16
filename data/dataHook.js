import React from 'react'
import db from '../firebaseFS'
import { getDoc, doc } from 'firebase/firestore'

const getRecentTrends = async () => {
  const docRef = doc(db, "trendsAgg", "recentTrends");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    //console.log(docSnap.data());
    return docSnap.data().last500;
  } else {
    console.log('[ERROR]: DocSnap doesnt exist');
  }
}

/*
const Loading = () => {
  <View style={styles.loadingContainer}>
    <Text style={styles.paragraph}>Loading...</Text>
  </View>
}*/

function dataHook() {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    const fetchData = async () => {
      const data = await getRecentTrends();
      setData(data);
    }; // might want to add empty items in each of data's article arrays to create fake space

    if (data.length === 0) {
      fetchData(data);
    }
  }, [data]);

  //if (data.length === 0) {
  //  return <Loading />;
  //}
  return data;
};

export default dataHook;
