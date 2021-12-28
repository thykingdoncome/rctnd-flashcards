import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Text, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Styles from "../../utils/styles";
import { STORAGE_KEY } from "../../utils/api";
import { getDecks } from "../../redux/actions";

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const state = useSelector((s) => s);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((s) =>
      dispatch(getDecks(JSON.parse(s)))
    );
  });


  return (
    <ScrollView style={Styles.main}>
      {state &&
        Object.keys(state).map((s) => {
          const cards = state[s].questions.length;
          return (
            <TouchableOpacity
              key={s}
              style={Styles.decks}
              onPress={() => navigation.navigate("Deck", { deck: s })}
            >
              <Text style={Styles.deckTexts}>{s}</Text>
              <Text style={Styles.cards}>
                {cards === 1
                  ? cards + " Card"
                  : cards === 0
                  ? "No card"
                  : cards + " cards"}{" "}
              </Text>
            </TouchableOpacity>
          );
        })}
    </ScrollView>
  );
};

export default Home;
