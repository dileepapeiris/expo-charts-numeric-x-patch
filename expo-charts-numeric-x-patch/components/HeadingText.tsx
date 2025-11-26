import React from "react";
import { Text, TextProps, StyleSheet } from "react-native";

interface HeadingTextProps extends TextProps {
  children: React.ReactNode;
}

export default function HeadingText({
  children,
  style,
  ...props
}: HeadingTextProps) {
  return (
    <Text style={[styles.heading, style]} {...props}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
});
