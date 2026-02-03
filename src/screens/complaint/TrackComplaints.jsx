// import React, { useEffect, useState } from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   StatusBar,
//   ScrollView,
//   RefreshControl,
//   ActivityIndicator,
// } from 'react-native';
// import CustomHeader from '../../components/CustomHeader';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { COLORS } from '../../theme/theme';
// import { useSelector } from 'react-redux';
// import commanServices from '../../redux/services/commanServices';

// export default function TrackComplaints() {
//   const { token } = useSelector(state => state.auth);

//   const [complaints, setComplaints] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);

//   // ----- Fetch Complaints API -----
//   const loadComplaints = async () => {
//     const res = await commanServices.getAllComplaints(token);
//     setComplaints(res.complaints);
//   };

//   // ----- Initial Load -----
//   useEffect(() => {
//     (async () => {
//       await loadComplaints();
//       setLoading(false);
//     })();
//   }, []);

//   // ----- Refresh -----
//   const onRefresh = async () => {
//     setRefreshing(true);
//     await loadComplaints();
//     setRefreshing(false);
//   };

//   // ----- Convert API status -----
//   const convertStatus = status => {
//     switch (status) {
//       case '0':
//         return 'Pending';
//       case '1':
//         return 'In Progress';
//       case '2':
//         return 'Completed';
//       case '3':
//         return 'Rejected';
//       default:
//         return 'Pending';
//     }
//   };

//   const getStatusStyle = statusText => {
//     switch (statusText) {
//       case 'Completed':
//         return { badge: styles.statusCompleted, text: styles.statusTextGreen };
//       case 'In Progress':
//         return { badge: styles.statusInProgress, text: styles.statusTextDark };
//       case 'Pending':
//         return { badge: styles.statusPending, text: styles.statusTextPurple };
//       case 'Rejected':
//         return { badge: styles.statusRejected, text: styles.statusTextOrange };
//       default:
//         return {};
//     }
//   };

//   return (
//     <>
//       <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />

//       <SafeAreaView style={styles.screen}>
//         <CustomHeader headername="Track Complaint" />

//         <View style={styles.content}>
//           {loading ? (
//             <ActivityIndicator
//               size="large"
//               color={COLORS.primary}
//               style={{ marginTop: 40 }}
//             />
//           ) : (
//             <ScrollView
//               showsVerticalScrollIndicator={false}
//               refreshControl={
//                 <RefreshControl
//                   refreshing={refreshing}
//                   onRefresh={onRefresh}
//                   colors={[COLORS.primary]}
//                   tintColor={COLORS.primary}
//                 />
//               }
//             >
//               {/* Table */}
//               <View style={styles.table}>
//                 {/* Header */}
//                 <View style={[styles.row, styles.headerRow]}>
//                   <Text
//                     style={[styles.cell, styles.headerCell, styles.colSmall]}
//                   >
//                     Priority
//                   </Text>
//                   <Text style={[styles.cell, styles.headerCell]}>Message</Text>
//                   <Text style={[styles.cell, styles.headerCell]}>Type</Text>
//                   <Text style={[styles.cell, styles.headerCell]}>Status</Text>
//                 </View>

//                 {/* Dynamic Rows */}
//                 {complaints.length > 0 ? (
//                   complaints.map((item, index) => {
//                     const statusText = convertStatus(item.status);
//                     const styleSet = getStatusStyle(statusText);
//                     const isLast = index === complaints.length - 1;

//                     return (
//                       <View
//                         key={item.id}
//                         style={[styles.row, isLast && { borderBottomWidth: 0 }]}
//                       >
//                         <Text style={[styles.cell, styles.colSmall]}>
//                           {item.priority}
//                         </Text>
//                         <Text style={styles.cell}>{item.message}</Text>
//                         <Text style={styles.cell}>{item.type}</Text>
//                         <View style={[styles.statusBadge, styleSet.badge]}>
//                           <Text style={styleSet.text}>{statusText}</Text>
//                         </View>
//                       </View>
//                     );
//                   })
//                 ) : (
//                   <Text style={styles.noData}>No Complaints Found.</Text>
//                 )}
//               </View>

//               <View style={{ height: 20 }} />
//             </ScrollView>
//           )}
//         </View>
//       </SafeAreaView>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   screen: {
//     flex: 1,
//     backgroundColor: '#f3f4f6',
//   },
//   content: {
//     flex: 1,
//     paddingHorizontal: 10,
//   },

//   // Table
//   table: {
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     paddingVertical: 0,
//     elevation: 2,
//     shadowColor: '#000',
//     marginTop: 15,
//   },

//   row: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 10,
//     borderBottomWidth: 0.7,
//     borderColor: '#e5e7eb',
//   },
//   headerRow: {
//     backgroundColor: '#e5e7eb',
//   },

//   cell: {
//     flex: 1,
//     fontSize: FontSizes.small,
//     fontFamily: 'Quicksand-Medium',
//     color: '#374151',
//     textAlign: 'center',
//     textTransform: 'capitalize',
//   },
//   headerCell: {
//     color: '#111827',
//     fontSize: FontSizes.xsmall,
//     fontFamily: 'Quicksand-Bold',
//   },
//   colSmall: {
//     flex: 0.6,
//   },

//   // Status Styling
//   statusBadge: {
//     flex: 1,
//     paddingVertical: 4,
//     borderRadius: 6,
//     alignItems: 'center',
//   },
//   // statusInProgress: {
//   //   backgroundColor: '#fcd34d33',
//   // },
//   // statusCompleted: {
//   //   backgroundColor: '#86efac33',
//   // },
//   // statusPending: {
//   //   backgroundColor: '#fca5a533',
//   // },
//   // statusRejected: {
//   //   backgroundColor: '#fca5a533',
//   // },
//   statusTextGreen: {
//     color: '#15803d',
//     fontWeight: '600',
//     fontSize: FontSizes.xsmall,
//   },
//   statusTextDark: {
//     color: '#92400e',
//     fontWeight: '600',
//     fontSize: FontSizes.xsmall,
//   },
//   statusTextOrange: {
//     color: '#b91c1c',
//     fontWeight: '600',
//     fontSize: FontSizes.xsmall,
//   },
//   statusTextPurple: {
//     color: COLORS.darkPurple,
//     fontWeight: '600',
//     fontSize: FontSizes.xsmall,
//   },

//   noData: {
//     textAlign: 'center',
//     paddingVertical: 20,
//     color: '#777',
//     fontSize: FontSizes.normal,
//     fontFamily: 'Quicksand-Bold',
//   },
// });

import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import CustomHeader from '../../components/CustomHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FontSizes } from '../../theme/theme';
import { useSelector } from 'react-redux';
import commanServices from '../../redux/services/commanServices';

export default function TrackComplaints() {
  const { token } = useSelector(state => state.auth);

  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // ----- Fetch Complaints -----
  const loadComplaints = async () => {
    const res = await commanServices.getAllComplaints(token);
    setComplaints(res.complaints);
  };

  // ----- Initial Load -----
  useEffect(() => {
    (async () => {
      await loadComplaints();
      setLoading(false);
    })();
  }, []);

  // ----- Refresh -----
  const onRefresh = async () => {
    setRefreshing(true);
    await loadComplaints();
    setRefreshing(false);
  };

  // ----- Convert API status -----
  const convertStatus = status => {
    switch (status) {
      case '0':
        return 'Pending';
      case '1':
        return 'In Progress';
      case '2':
        return 'Completed';
      case '3':
        return 'Rejected';
      default:
        return 'Pending';
    }
  };

  const getStatusStyle = statusText => {
    switch (statusText) {
      case 'Completed':
        return { badge: styles.statusCompleted, text: styles.statusTextGreen };
      case 'In Progress':
        return { badge: styles.statusInProgress, text: styles.statusTextDark };
      case 'Pending':
        return { badge: styles.statusPending, text: styles.statusTextPurple };
      case 'Rejected':
        return { badge: styles.statusRejected, text: styles.statusTextOrange };
      default:
        return {};
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />

      <SafeAreaView style={styles.screen}>
        <CustomHeader headername="Track Complaint" />

        <View style={styles.content}>
          {loading ? (
            <ActivityIndicator
              size="large"
              color={COLORS.primary}
              style={{ marginTop: 40 }}
            />
          ) : (
            <ScrollView
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  colors={[COLORS.primary]}
                  tintColor={COLORS.primary}
                />
              }
            >
              {/* Complaints List */}
              <View style={styles.table}>
                {complaints.length > 0 ? (
                  complaints.map((item, index) => {
                    const statusText = convertStatus(item.status);
                    const styleSet = getStatusStyle(statusText);
                    const isLast = index === complaints.length - 1;

                    return (
                      <View
                        key={item.id}
                        style={[
                          styles.customRow,
                          isLast && { borderBottomWidth: 0 },
                        ]}
                      >
                        {/* LEFT COLUMN (40%) */}
                        <View style={styles.leftColumn}>
                          <Text style={styles.leftItem}>
                            Priority: {item.priority}
                          </Text>
                          <Text style={styles.leftItem}>Type: {item.type}</Text>

                          <View style={[styles.statusBadge, styleSet.badge]}>
                            <Text style={styleSet.text}>{statusText}</Text>
                          </View>
                        </View>

                        {/* RIGHT COLUMN (60%) */}
                        <View style={styles.rightColumn}>
                          <Text style={styles.messageText}>{item.message}</Text>
                        </View>
                      </View>
                    );
                  })
                ) : (
                  <Text style={styles.noData}>No Complaints Found.</Text>
                )}
              </View>

              <View style={{ height: 20 }} />
            </ScrollView>
          )}
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
  },

  table: {
    backgroundColor: '#fff',
    borderRadius: 5,
    marginTop: 10,
    elevation: 2,
    shadowColor: '#7a7a7aff',
  },

  /* -------------------------------
     NEW TWO-COLUMN LAYOUT
  ------------------------------- */
  customRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 0.7,
    borderColor: '#e5e7eb',
    marginBottom: 5,
  },

  leftColumn: {
    width: '40%',
    paddingRight: 6,
    borderRightWidth: 1,
    borderColor: '#e5e7eb',
    alignItems: 'center',
  },

  rightColumn: {
    width: '60%',
    paddingLeft: 8,
  },

  leftItem: {
    fontSize: FontSizes.xsmall,
    color: '#374151',
    marginBottom: 2,
    fontFamily: 'Quicksand-Bold',
  },

  messageText: {
    fontSize: FontSizes.xsmall,
    fontFamily: 'Quicksand-Medium',
    color: '#111827',
    textAlign: 'left',
  },

  // Status Colors
  statusBadge: {
    marginTop: 2,
    paddingVertical: 2,
    borderRadius: 6,
    alignItems: 'center',
  },

  // statusCompleted: { backgroundColor: '#86efac33' },
  // statusInProgress: { backgroundColor: '#fcd34d33' },
  // statusPending: { backgroundColor: '#a78bfa33' },
  // statusRejected: { backgroundColor: '#fca5a533' },

  statusTextGreen: {
    color: '#15803d',
    fontWeight: '600',
    fontSize: FontSizes.xsmall,
  },
  statusTextDark: {
    color: '#92400e',
    fontWeight: '600',
    fontSize: FontSizes.xsmall,
  },
  statusTextOrange: {
    color: '#b91c1c',
    fontWeight: '600',
    fontSize: FontSizes.xsmall,
  },
  statusTextPurple: {
    color: COLORS.darkPurple,
    fontWeight: '600',
    fontSize: FontSizes.xsmall,
  },

  noData: {
    textAlign: 'center',
    paddingVertical: 20,
    color: '#777',
    fontSize: FontSizes.normal,
    fontFamily: 'Quicksand-Bold',
  },
});
