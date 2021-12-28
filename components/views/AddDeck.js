import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

import { addDeck } from "../../redux/actions";
import { SubmitDeck } from "../../utils/api";
import Styles from "../../utils/styles";

const App = ({ navigation }) => {
  const dispatch = useDispatch();

  const [deck, setDeck] = useState("");

  const handleSubmit = () => {
    const data = {
      [deck]: {
        title: deck,
        questions: [],
      },
    };
    setDeck("");

    dispatch(addDeck(data));
    SubmitDeck(data);

    navigation.navigate("Deck", { deck: deck });
  };
  
  return (
    <View style={Styles.main}>
      <View style={Styles.VerticalAlignCenter}>
        <Text style={Styles.DeckHeader}>Provide a title for the deck</Text>
        <TextInput
          style={{
            height: 40,
            borderWidth: 1,
            borderRadius: 5,
            marginTop: 50,
          }}
          name={deck}
          value={deck}
          onChangeText={(text) => setDeck(text)}
        />
      </View>
      <TouchableOpacity style={{ marginBottom: 50 }} onPress={handleSubmit}>
        <Text style={Styles.button}>Create Deck</Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;
