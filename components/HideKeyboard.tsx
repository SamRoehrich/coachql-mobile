import React, { FC } from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";

const HideKeyboard: FC = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

export default HideKeyboard;
