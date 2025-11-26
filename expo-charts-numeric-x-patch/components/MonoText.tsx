import React from "react";
import { Text, TextProps, StyleSheet, Platform } from "react-native";

interface MonoTextProps extends TextProps {
  children: React.ReactNode;
  textStyle?: object;
}

export default function MonoText({
  children,
  style,
  textStyle,
  ...props
}: MonoTextProps) {
  return (
    <Text style={[styles.monoText, textStyle, style]} {...props}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  monoText: {
    fontFamily: Platform.select({
      ios: "Courier",
      android: "monospace",
      default: "monospace",
    }),
  },
});
