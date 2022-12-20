import React from 'react'
import db from '../firebaseFS'
import { getDoc, doc } from 'firebase/firestore'

const getRecentTrends = async () => {
  const docRef = doc(db, "trendsAgg", "recentTrends");
  const docSnap = await getDoc(docRef); //TODO: change this to try catch
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

function useGetDataHook() {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        let docRef = doc(db, "trendsAgg", "recentTrends")
        let docSnap = await getDoc(docRef)
        setData(docSnap.data().last500)
      } catch (e) {
        console.log(e)
      }
    }
    fetchData()
    // might want to add empty items in each of data's article arrays to create fake space
  }, [])

  //if (data.length === 0) {
  //  return <Loading />;
  //}
  return data;
}

export default useGetDataHook;
