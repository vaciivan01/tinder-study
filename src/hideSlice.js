import { createSlice, current } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';
import { initializeApp } from "firebase/app";
import {getFirestore, collection, getDocs, addDoc, updateDoc, doc} from '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDyJa0XBkvHYajXkCvGtSwJ9WSdF0GQThg",
  authDomain: "tinderstudy-fd4f5.firebaseapp.com",
  projectId: "tinderstudy-fd4f5",
  storageBucket: "tinderstudy-fd4f5.appspot.com",
  messagingSenderId: "836511004846",
  appId: "1:836511004846:web:728e1d3b273224444f153f"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const tinderData = collection(db, "data");

const getTinderData = async (keyTinder, valueTinder, generatedUuid) => {
  const data = await getDocs(tinderData)
  const rr = data.docs.map((doc) => ({ ...doc.data(), id: doc.id}))
  let updateId = "";
  rr.forEach(el => {
    if(el.uuid && el.uuid === generatedUuid){
      updateId = el.id
    }
  });
  if(updateId === ""){
    createData({[keyTinder]: valueTinder, uuid: generatedUuid})
  }else{
    updateData(updateId, {[keyTinder]: valueTinder})
  }
}

const createData = async (data) => {
  await addDoc(tinderData, data)
}

const updateData = async (id, data) => {
  const firestoreDataId = doc(db, "data", id)
  await updateDoc(firestoreDataId, data)
}

const initialState = {
    usersUUID: "",
    shownElements: {
        ponasanje: true,
        saglasnost: false,
        nekadaKoristiliTinder: false,
        orijentacija: false,
        osobine: false,
        godiste: false,
        pol: false,
        instrukcije2: false,
        tinderPictures: false,
        perTinderPictures: false,
        endOfTest: false,
        perSwipe: false,
    },
    questions: {
        ponasanje: "",
        saglasnost: "",
        nekadaKoristiliTinder: "",
        izasliTinder: "",
        orijentacija: "",
        instrukcije: "",
        osobine: "",
        godiste: "",
        pol: "",
        instrukcije2: "",
        tinderPictures: "",
        perTinderPictures: "",
        perSwipe: "",
    },
    finalAnswers: [],
    showFinal: {
      0: true,
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
      6: false,
      7: false,
      8: false,
      9: false,
      10: false,
      11: false,
      12: false,
      13: false,
      14: false,
      15: false,
      16: false,
      17: false,
      18: false,
      19: false,
      20: false,
    },
    dbPics: {
        Muški: [
            {
              url: '/images/muska_lica/l3.jpg'
            },
            {
              url: '/images/muska_lica/l15.jpg'
            },
            {
              url: '/images/muska_lica/l19.jpg'
            },
            {
              url: '/images/muska_lica/l20.jpg'
            },
            {
              url: '/images/muska_lica/l25.jpg'
            },
            {
              url: '/images/muska_lica/l30.jpg'
            },
            {
              url: '/images/muska_lica/l33.jpg'
            },
            {
              url: '/images/muska_lica/n1.jpg'
            },
            {
              url: '/images/muska_lica/n6.jpg'
            },
            {
              url: '/images/muska_lica/n9.jpg'
            },
            {
              url: '/images/muska_lica/n14.jpg'
            },
            {
              url: '/images/muska_lica/n17.jpg'
            },
            {
              url: '/images/muska_lica/n23.jpg'
            },
            {
              url: '/images/muska_lica/n24.jpg'
            },
            {
              url: '/images/muska_lica/r4.jpg'
            },
            {
              url: '/images/muska_lica/r7.jpg'
            },
            {
              url: '/images/muska_lica/r12.jpg'
            },
            {
              url: '/images/muska_lica/r16.jpg'
            },
            {
              url: '/images/muska_lica/r21.jpg'
            },
            {
              url: '/images/muska_lica/r22.jpg'
            },
            {
              url: '/images/muska_lica/r28.jpg'
            }
          ],
          Ženski : [
            {
                url: '/images/zenska_lica/l3.jpg'
            },
            {
                url: '/images/zenska_lica/l12.jpg'
            },
            {
                url: '/images/zenska_lica/l14.jpg'
            },
            {
                url: '/images/zenska_lica/l16.jpg'
            },
            {
                url: '/images/zenska_lica/l17.jpg'
            },
            {
                url: '/images/zenska_lica/l23.jpg'
            },
            {
                url: '/images/zenska_lica/l25.jpg'
            },
            {
                url: '/images/zenska_lica/n4.jpg'
            },
            {
                url: '/images/zenska_lica/n8.jpg'
            },
            {
                url: '/images/zenska_lica/n9.jpg'
            },
            {
                url: '/images/zenska_lica/n10.jpg'
            },
            {
                url: '/images/zenska_lica/n19.jpg'
            },
            {
                url: '/images/zenska_lica/n24.jpg'
            },
            {
                url: '/images/zenska_lica/n33.jpg'
            },
            {
                url: '/images/zenska_lica/r1.jpg'
            },
            {
                url: '/images/zenska_lica/r11.jpg'
            },
            {
                url: '/images/zenska_lica/r15.jpg'
            },
            {
                url: '/images/zenska_lica/r22.jpg'
            },
            {
                url: '/images/zenska_lica/r26.jpg'
            },
            {
                url: '/images/zenska_lica/r31.jpg'
            },
            {
                url: '/images/zenska_lica/r32.jpg'
            }
        ]
    }
}

const saveAnswerToGoogle = (key, value, generatedUuid) => {
  getTinderData(key, value, generatedUuid);
}

export const hideReducer = createSlice({
    name: "hide",
    initialState,
    reducers: {
        toggleVisibility: (state, action) => {
            state.shownElements[action.payload.current] = false
            state.shownElements[action.payload.next] = true
        },
        setAnswer: (state, action) => {
            if(current(state).usersUUID === ""){
              state.usersUUID = uuidv4();
            }
            if(state.questions[action.payload.keyForQuestion].length){
              state.questions[action.payload.keyForQuestion] = [...action.payload.value]
            }else{
              state.questions[action.payload.keyForQuestion] = action.payload.value
            }

            saveAnswerToGoogle(action.payload.keyForQuestion, action.payload.value, state.usersUUID)
        },
        exitTest: (state, action) => {
            state.shownElements[action.payload.current] = false
            state.shownElements.endOfTest = true
        },
        addFinalResults: (state, action) => {
          state.finalAnswers = [...state.finalAnswers, action.payload];
          for (const show in state.showFinal) {
            if(state.showFinal[show]){
              state.showFinal[show] = false
              if(state.showFinal[parseInt(show)+1] === false){
                state.showFinal[parseInt(show)+1] = true
              }else{
                let finalAnswersLet = {}
                state.finalAnswers.forEach(element => {
                  let kkey = Object.keys(element.value)[0]
                  finalAnswersLet[kkey] = element.value[kkey]
                });
                state.shownElements.endOfTest = true
              }
              break
            }
          }
      },
    }
})

export const { toggleVisibility, setAnswer, exitTest, addFinalResults } = hideReducer.actions

export default hideReducer.reducer