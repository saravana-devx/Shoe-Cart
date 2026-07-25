import Header from "@/components/Header";
import { RootState } from "@/redux/store";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

export default function Orders() {
  const order = useSelector((state: RootState) => state.order.data);
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Orders" />

      {order && order?.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No orders placed yet.</Text>
        </View>
      ) : (
        <FlatList
          data={order}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image
                source={
                  typeof item.image === "string"
                    ? { uri: item.image }
                    : item.image
                }
                style={styles.image}
              />

              <View style={styles.info}>
                <Text style={styles.name}>
                  {item.brand} {item.model}
                </Text>

                <Text style={styles.price}>
                  ₹{item.price.toLocaleString()}
                </Text>

                <Text style={styles.quantity}>
                  Quantity: {item.quantity}
                </Text>
                <Text style={styles.quantity}>
                  Size: {item.selected_Sizes}
                </Text>

                <Text style={styles.total}>
                  Total: ₹{(item.price * item.quantity).toLocaleString()}
                </Text>

                <View style={styles.statusContainer}>
                  <Text style={styles.status}>Order Placed</Text>
                </View>
              </View>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    paddingHorizontal: 16,
    paddingTop: 15,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#777",
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 12,
    marginBottom: 15,
    elevation: 3,
    alignItems: "center",
  },

  image: {
    width: 90,
    height: 90,
    resizeMode: "contain",
  },

  info: {
    flex: 1,
    marginLeft: 15,
  },

  name: {
    fontSize: 18,
    fontWeight: "700",
  },

  price: {
    marginTop: 6,
    fontSize: 16,
    color: "#2563EB",
    fontWeight: "700",
  },

  quantity: {
    marginTop: 5,
    fontSize: 15,
    color: "#555",
  },

  total: {
    marginTop: 5,
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
  },

  statusContainer: {
    marginTop: 10,
    alignSelf: "flex-start",
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  status: {
    color: "#15803D",
    fontWeight: "700",
    fontSize: 13,
  },
});