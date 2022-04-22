import db from '../firebaseFS'
import { getDoc, doc } from 'firebase/firestore'

export const getRecentTrends = async () => {
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
    //const data = await db.collection('trendsAgg').doc('recentTrends').data();
  const docRef = doc(db, "trendsAgg", "recentTrends");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    console.log(docSnap.data());
    return docSnap.data().last500;
  } else {
    console.log('[ERROR]: DocSnap doesnt exist');
  }
}
