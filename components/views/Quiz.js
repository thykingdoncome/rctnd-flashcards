import React from "react";
import { View, Text } from "react-native";
import Styles from "../../utils/styles";
import { AnswerQuestion, ANSWER_KEY,ClearAnswer } from "../../utils/api";
import { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setLocalNotification,clearLocalNotification } from "../../utils/helpers";
import { gray, red } from "../../utils/colors";

const StartQuiz = ({ route, navigation }) => {
  const { deck } = route.params;
  const QuestionList = deck.questions;

  const [displayResult, setDisplayResult] = useState(false);
  const [fromDb, setFromDb] = useState(null);
  const [index, setIndex] = useState(0);
  const [displayQuestion, setDisplayQuestion] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(ANSWER_KEY)
      .then((s) => {
        // console.log(s);
        const data = JSON.parse(s);
        if (data !== null) {
          const returnVal = Object.keys(data)
            .filter((s) => s.split(" ")[0] === deck.title)
            .map((s) => data[s]);
          setFromDb(Object.values(returnVal));
          if (Object.keys(returnVal).length === QuestionList.length) {
            setDisplayResult(true);
          } else if (Object.keys(returnVal).length > 0) {
            setIndex(Object.keys(returnVal).length);
          }
        }
      })
      .then(() => {});
  }, []);

  let selectedQuestion;

  if (QuestionList.length !== 0) {
    selectedQuestion = QuestionList[index];
  }

  const handleReset=()=>{
    ClearAnswer(deck.title)
    setDisplayResult(false)
    setFromDb([])
    setIndex(0)
  }

  const handleAnswer = (text) => {
    AnswerQuestion({
      deck: deck.title,
      question: selectedQuestion.question,
      passed: text,
    });

    const data = fromDb;

    if (data) {
      data.push(text);
      setFromDb(data);
    }
    if (index + 1 === QuestionList.length) {
      setDisplayResult(true);
      clearLocalNotification()
      setLocalNotification()
    } else {
      setIndex(index + 1);
    }
  };

  return (
    <View style={Styles.main}>
      {QuestionList.length === 0 ? (
        <View style={Styles.VerticalAlignCenter}>
          <Text style={Styles.deckTexts}>
            Sorry You can not take a quiz, because there are no cards in the
            deck
          </Text>
        </View>
      ) : displayResult ? (
        <View style={{ flex: 1 }}>
          <View style={Styles.VerticalAlignCenter}>
            <Text style={Styles.deckTexts}>
              passed
              {" " + JSON.stringify(fromDb.filter((s) => s === true).length)}/
              {JSON.stringify(fromDb.length)}
            </Text>
            <View style={{ marginTop: 50 }}>
            <TouchableOpacity onPress={handleReset}>
              <Text style={Styles.button}>Restart Quiz</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Deck",{deck:deck.title})}>
              <Text
                style={[Styles.button, { color: gray, borderColor: gray }]}
              >
                Back to Deck
              </Text>
            </TouchableOpacity>
          </View>
          </View>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <Text>
            {index + 1}/{QuestionList.length}
          </Text>
          <View style={Styles.VerticalAlignCenter}>
            {displayQuestion ? (
              <Text style={Styles.deckTexts}>{selectedQuestion.question}</Text>
            ) : (
              <Text style={Styles.deckTexts}>{selectedQuestion.answer}</Text>
            )}
            <TouchableOpacity
              onPress={() => setDisplayQuestion(!displayQuestion)}
            >
              {displayQuestion ? (
                <Text style={Styles.subButton}>Answer</Text>
              ) : (
                <Text style={Styles.subButton}>question</Text>
              )}
            </TouchableOpacity>
          </View>
          <View style={{ marginBottom: 50 }}>
            <TouchableOpacity onPress={() => handleAnswer(true)}>
              <Text style={Styles.button}>Correct</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleAnswer(false)}>
              <Text
                style={[Styles.button, { color: red, borderColor: red }]}
              >
                Incorrect
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default StartQuiz;
