import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useState } from 'react';

export default function GroupTrackingScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('Group');

  const ProgressBar = ({ goal, progress, maxWidth = 300 }) => {
    const barWidth = (progress / 100) * maxWidth;
    return (
      <View style={styles.progressBarContainer}>
        <Text style={styles.goalLabel}>{goal}</Text>
        <View style={styles.progressBarBackground}>
          <View style={[styles.progressBarFill, { width: barWidth }]} />
        </View>
      </View>
    );
  };

  const BoxPlot = ({ goal, min, max, median, value }) => {
    const range = max - min;
    const plotWidth = 300;
    const valuePosition = value !== null ? ((value - min) / range) * plotWidth : null;

    return (
      <View style={styles.boxPlotContainer}>
        <Text style={styles.goalLabel}>{goal}</Text>
        <View style={styles.boxPlotWrapper}>
          <View style={styles.boxPlotLine}>
            <View style={[styles.boxPlotEndMarker, { left: 0 }]} />
            <View style={[styles.boxPlotMiddleMarker, { left: plotWidth / 2 - 1 }]} />
            <View style={[styles.boxPlotEndMarker, { right: 0 }]} />
            {value !== null && (
              <View style={[styles.boxPlotValue, { left: Math.max(0, Math.min(valuePosition - 4, plotWidth - 8)) }]} />
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Group & Team Tracking</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Individual' && styles.activeTab]}
          onPress={() => setActiveTab('Individual')}
        >
          <Text style={[styles.tabText, activeTab === 'Individual' && styles.activeTabText]}>
            Individual
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Team' && styles.activeTab]}
          onPress={() => setActiveTab('Team')}
        >
          <Text style={[styles.tabText, activeTab === 'Team' && styles.activeTabText]}>
            Team
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Group' && styles.activeTab]}
          onPress={() => setActiveTab('Group')}
        >
          <Text style={[styles.tabText, activeTab === 'Group' && styles.activeTabText]}>
            Group
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Team Progress Comparison</Text>
        <View style={styles.sectionContent}>
          <ProgressBar goal="Goal A" progress={0} />
          <ProgressBar goal="Goal B" progress={0} />
          <ProgressBar goal="Goal C" progress={0} />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Peer Distribution (Box Plot)</Text>
        <View style={styles.sectionContent}>
          <BoxPlot goal="Goal A" min={0} max={100} median={50} value={null} />
          <BoxPlot goal="Goal B" min={0} max={100} median={50} value={null} />
          <BoxPlot goal="Goal C" min={0} max={100} median={50} value={null} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  backText: {
    fontSize: 24,
    color: '#111827',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  placeholder: {
    width: 40,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 8,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#111827',
  },
  tabText: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#111827',
    fontWeight: '600',
  },
  section: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 20,
  },
  sectionContent: {
  },
  progressBarContainer: {
    marginBottom: 16,
  },
  goalLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 8,
  },
  progressBarBackground: {
    width: 300,
    height: 24,
    backgroundColor: '#e5e7eb',
    borderRadius: 12,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#3b82f6',
    borderRadius: 12,
  },
  boxPlotContainer: {
    marginBottom: 16,
  },
  boxPlotWrapper: {
    width: 300,
    height: 40,
    justifyContent: 'center',
  },
  boxPlotLine: {
    width: 300,
    height: 2,
    backgroundColor: '#111827',
    position: 'relative',
  },
  boxPlotEndMarker: {
    position: 'absolute',
    width: 2,
    height: 10,
    backgroundColor: '#111827',
    top: -4,
  },
  boxPlotMiddleMarker: {
    position: 'absolute',
    width: 2,
    height: 10,
    backgroundColor: '#111827',
    top: -4,
  },
  boxPlotValue: {
    position: 'absolute',
    width: 8,
    height: 8,
    backgroundColor: '#111827',
    top: -3,
  },
});

