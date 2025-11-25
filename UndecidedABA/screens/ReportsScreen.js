import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts';

const firebase_url = "https://undecided-aba-app-default-rtdb.firebaseio.com/";

export default function ReportsScreen({ route, navigation }) {
  const { currentUser } = useAuth();
  const clientIndex = route.params?.index;
  const client = route.params?.client;

  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      const emailKey = currentUser.email.toLowerCase().replace(/[.#$[\]]/g, "_");

      const res = await axios.get(
        `${firebase_url}users/${emailKey}/clients/${clientIndex}/sessionReports.json`
      );

      if (!res.data) {
        setReports([]);
        setLoading(false);
        return;
      }

      // Convert report objects into array
      const reportArray = Object.keys(res.data).map(key => ({
        id: key,
        ...res.data[key]
      }));

      // Sort newest → oldest
      reportArray.sort((a, b) => b.submittedAt.localeCompare(a.submittedAt));

      setReports(reportArray);
      setLoading(false);

    } catch (error) {
      console.log("LOAD REPORTS ERROR:", error);
      setReports([]);
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{client?.name}'s Reports</Text>
        <View style={styles.placeholder} />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#3b82f6" style={{ marginTop: 40 }} />
      ) : reports.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No reports available yet</Text>
        </View>
      ) : (
        reports.map((report) => (
          <View key={report.id} style={styles.reportCard}>
            <Text style={styles.reportDate}>
              {new Date(report.submittedAt).toLocaleString()}
            </Text>

            <Text style={styles.sectionTitle}>Notes:</Text>
            <Text style={styles.notesText}>{report.notes}</Text>

            <Text style={styles.sectionTitle}>Tasks:</Text>
            {report.tasks.map((task, index) => (
              <View key={index} style={styles.taskRow}>
                <Text style={styles.taskName}>{task.name}</Text>

                <View
                  style={[
                    styles.statusBadge,
                    task.status === "pass" && styles.pass,
                    task.status === "partial" && styles.partial,
                    task.status === "fail" && styles.fail,
                  ]}
                >
                  <Text style={styles.statusText}>
                    {task.status || "—"}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        ))
      )}
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
    paddingHorizontal: 20
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
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
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
  },
  placeholder: {
    width: 40,
  },

  emptyContainer: {
    backgroundColor: '#fff',
    padding: 24,
    marginTop: 40,
    borderRadius: 12,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#6b7280',
  },

  reportCard: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 16,
    borderRadius: 12,
  },
  reportDate: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 4,
  },
  notesText: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 10,
  },

  taskRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
  },
  taskName: {
    fontSize: 15,
    flex: 1,
  },

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    color: "#fff",
    fontWeight: "600",
    textTransform: "capitalize"
  },

  pass: {
    backgroundColor: "#10b981",
  },
  partial: {
    backgroundColor: "#f59e0b",
  },
  fail: {
    backgroundColor: "#ef4444",
  },
});
