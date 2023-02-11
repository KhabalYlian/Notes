import { getFirestore} from 'firebase/firestore/lite';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const app = initializeApp({
    apiKey: 'AIzaSyBkJI2e_45VRR671FQZcqsweXiZp3ouvBQ',
    authDomain: 'notes-react-bb535.firebaseapp.com',
    projectId: 'notes-react-bb535',
    storageBucket: 'notes-react-bb535.appspot.com',
    messagingSenderId: '715764920471',
    appId: '1:715764920471:web:128f5042642b28b80639d2',
    measurementId: 'G-4BPGNCE5VD'
});

const db = getFirestore(app);
const auth = getAuth(app)

export {
	db, 
	auth
}