import AsyncStorage from "@react-native-async-storage/async-storage";

export const STORAGE_KEY = "STORAGE_KEY";
export const LOCAL_NOTIFICATION_KEY = "LOCAL_NOTIFICATION_KEY";

export const ANSWER_KEY =
  new Date().getFullYear().toString() +
  new Date().getMonth().toString() +
  new Date().getDate().toString();

export const SubmitDeck = async (entry) => {
  const result = await AsyncStorage.mergeItem(
    STORAGE_KEY,
    JSON.stringify(entry)
  );
  return result;
};

export const ClearAnswer =async (key)=>{
  const answers = await JSON.parse(await AsyncStorage.getItem(ANSWER_KEY));
  const seletedAnswers = Object.keys(answers).filter((s) => s.startsWith(key));
  seletedAnswers.map((s) => {
    answers[s] = undefined;
    delete answers[s];
  });
  await AsyncStorage.setItem(ANSWER_KEY, JSON.stringify(answers));
}

export const RemoveDeck = async (key) => {
  const result = await AsyncStorage.getItem(STORAGE_KEY);
  await ClearAnswer(key)
  const data = await JSON.parse(result);
  data[key] = undefined;
  delete data[key];
  const returnVal = await AsyncStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(data)
  );
  return returnVal;
};

export const AddCardToDeckStorage = async (deck, card) => {
  const data = await AsyncStorage.getItem(STORAGE_KEY);
  const decks = JSON.parse(data);
  decks[deck].questions = decks[deck].questions.concat(card);
  const result = await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(decks));
  return result;
};

export const AnswerQuestion = async ({ deck, question, passed }) => {
  const key = deck + " " + question;
  return await AsyncStorage.mergeItem(
    ANSWER_KEY,
    JSON.stringify({ [key]: passed })
  );
};
