/**
 * ------------------------------------------------------------
 *  Owner    : K. Dileepa Thushan Peiris
 *  GitHub   : https://github.com/dileepapeiris
 *  Created  : 2025-11-26
 * ------------------------------------------------------------
 */

import { Chart, Host } from "@expo/ui/swift-ui";
import React from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";

import HeadingText from "../components/HeadingText";

// ----- DATA WITH NUMERIC X-AXIS -----
const lineData = [
  { x: 0, y: 10 },
  { x: 1.5, y: 25 },
  { x: 3, y: 18 },
  { x: 4.5, y: 32 },
  { x: 6, y: 28 },
  { x: 7.5, y: 35 },
];

const barData = [
  { x: 0, y: 20 },
  { x: 4, y: 22 },
  { x: 8, y: 25 },
  { x: 12, y: 28 },
  { x: 16, y: 26 },
  { x: 20, y: 23 },
];

const pointData = [
  { x: 0.5, y: 12.3, color: "#4A90E2" },
  { x: 1.2, y: 18.7, color: "#50C8D8" },
  { x: 2.8, y: 15.2, color: "#5AD67D" },
  { x: 3.5, y: 22.1, color: "#F5D76E" },
  { x: 4.9, y: 19.8, color: "#FF8C42" },
];

// ----- REUSABLE CHART WRAPPER -----
interface ChartCardProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

function ChartCard({ children, title, description }: ChartCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      {description && <Text style={styles.cardDescription}>{description}</Text>}
      <View style={styles.chartWrapper}>{children}</View>
    </View>
  );
}

// ----- SCREEN -----
export default function NumericXAxisExamplesScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContainer}
    >
      <HeadingText style={styles.heading}>Numeric X-Axis Examples</HeadingText>
      <Text style={styles.description}>
        Charts demonstrating numeric values on the X-axis
        {"\n"}Supports decimal values and non-uniform spacing
      </Text>

      {/* Line Chart */}
      <ChartCard
        title="Line Chart"
        description="Numeric X values: 0, 1.5, 3, 4.5, 6, 7.5"
      >
        <Host style={{ flex: 1 }}>
          <Chart
            data={lineData}
            type="line"
            showGrid={true}
            animate={true}
            lineStyle={{
              color: "#6366F1",
              width: 3,
              pointStyle: "circle",
              pointSize: 8,
            }}
            style={styles.chart}
          />
        </Host>
      </ChartCard>

      {/* Bar Chart */}
      <ChartCard
        title="Bar Chart"
        description="Numeric X values with wider spacing: 0, 4, 8, 12, 16, 20"
      >
        <Host style={{ flex: 1 }}>
          <Chart
            data={barData}
            type="bar"
            showGrid={true}
            animate={true}
            barStyle={{
              cornerRadius: 6,
              width: 25,
            }}
            style={styles.chart}
          />
        </Host>
      </ChartCard>

      {/* Point Chart */}
      <ChartCard
        title="Point Chart"
        description="Decimal X values with custom colors per point"
      >
        <Host style={{ flex: 1 }}>
          <Chart
            data={pointData}
            type="point"
            showGrid={true}
            animate={true}
            pointStyle={{
              pointStyle: "diamond",
              pointSize: 10,
            }}
            style={styles.chart}
          />
        </Host>
      </ChartCard>
    </ScrollView>
  );
}

// ----- STYLES -----
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    padding: 20,
  },
  heading: {
    textAlign: "center",
    marginBottom: 8,
  },
  description: {
    textAlign: "center",
    color: "#666",
    marginBottom: 24,
    lineHeight: 20,
  },
  card: {
    marginBottom: 24,
    backgroundColor: "#ffffff",
    borderRadius: 14,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 13,
    color: "#666",
    marginBottom: 12,
    fontStyle: "italic",
  },
  chartWrapper: {
    height: 280,
  },
  chart: {
    flex: 1,
  },
});
