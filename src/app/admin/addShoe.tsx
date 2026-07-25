import { add_Shoes, update_Shoes } from "@/redux/Slice/ShoesSlice";
import { RootState } from "@/redux/store";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";
import { useDispatch, useSelector } from "react-redux";

export default function AddShoe({ setVisible, visible, selectedShoe, setSelectedShoe }: { setVisible: any, visible: any, selectedShoe: any, setSelectedShoe: any }) {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [price, setPrice] = useState<Number>();
  const [image, setImage] = useState("");
  const [sizes, setSizes] = useState<number[]>([]);
  const dispatch = useDispatch()
  const shoes = useSelector((state: RootState) => state.shoes.data);
  const availableSizes = [6, 7, 8, 9, 10, 11];
  const data = selectedShoe && selectedShoe.length > 0
  const toggleSize = (size: number) => {
    if (sizes.includes(size)) {
      setSizes(sizes.filter((s) => s !== size));
    } else {
      setSizes([...sizes, size]);
    }
  };
  useEffect(() => {
    if (data) {
      const data_New = selectedShoe[0]
      setBrand(data_New.brand)
      setModel(data_New.model)
      setPrice(data_New.price.toString());
      setImage(data_New.image)
      setSizes([...data_New.sizes])
    }
  }, [selectedShoe])

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const clearValue = () => {
    setBrand("")
    setModel("")
    setPrice(null)
    setImage("")
    setSizes([])
    setSelectedShoe([])
  }
  const addShoe = () => {
    const data = {
      brand: brand,
      id: shoes.length + 1,
      image: image,
      model: model,
      price: price,
      sizes: sizes
    }

    dispatch(add_Shoes(data))
    clearValue()
    setVisible(false)
  }

  const editTheShoe = () => {

    const editedData = shoes.map((item, key) => {
      if (item.id === selectedShoe[0].id) {
        return {
          ...item, id: selectedShoe[0].id, brand: brand, image: image, model: model, price: Number(price), sizes: sizes
        }
      }
      return item
    })
    dispatch(update_Shoes(editedData))
    clearValue()
    setVisible(false)


  }
  return (
    <Modal
      isVisible={visible}
      swipeDirection="down"
      onSwipeComplete={() => {
        clearValue()
        setVisible(false)
        setSelectedShoe([])
      }}
      style={styles.modal}
    >



      <View style={styles.container}>
        <View style={styles.handle} />

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: "305" }}>
          <Text style={styles.title}>{!data ? "Add Shoe" : "Edit Shoe"}</Text>

          <Text style={styles.label}>Brand</Text>

          <TextInput
            placeholder="Nike"
            value={brand}
            onChangeText={setBrand}
            style={styles.input}
          />

          <Text style={styles.label}>Model</Text>

          <TextInput
            placeholder="Air Max 270"
            value={model}
            onChangeText={setModel}
            style={styles.input}
          />

          <Text style={styles.label}>Price</Text>

          <TextInput
            placeholder="8999"
            keyboardType="numeric"
            value={price}
            onChangeText={setPrice}
            style={styles.input}
          />

          <Text style={styles.label}>Available Sizes</Text>

          <View style={styles.sizeContainer}>
            {availableSizes.map((size) => (
              <Pressable
                key={size}
                onPress={() => toggleSize(size)}
                style={[
                  styles.size,
                  sizes.includes(size) && styles.selected,
                ]}
              >
                <Text
                  style={{
                    color: sizes.includes(size) ? "white" : "black",
                  }}
                >
                  {size}
                </Text>
              </Pressable>
            ))}
          </View>

          <Text style={styles.label}>Shoe Image</Text>

          <TouchableOpacity
            style={styles.imageButton}
            onPress={pickImage}
          >
            <Text>Select Image</Text>
          </TouchableOpacity>

          {image !== "" && (
            <Image
              style={{ width: "100%", height: "50%", padding: "10%" }}
              resizeMode="contain"
              source={
                typeof image === "string"
                  ? { uri: image }
                  : image
              }
            />
          )}

          <TouchableOpacity onPress={() => {
            !data ?
              addShoe() : editTheShoe()
          }} style={styles.addButton}>
            <Text style={styles.addText}>{!data ? "Add Shoe" : "Edit Shoe"}</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },

  container: {
    backgroundColor: "white",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
    maxHeight: "90%",

  },

  handle: {
    width: 60,
    height: 5,
    backgroundColor: "#ccc",
    alignSelf: "center",
    borderRadius: 20,
    marginBottom: 20,
  },

  title: {
    fontSize: 25,
    fontWeight: "700",
    marginBottom: 20,
  },

  label: {
    marginTop: 15,
    marginBottom: 8,
    fontWeight: "600",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 15,
  },

  sizeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  size: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },

  selected: {
    backgroundColor: "#2563EB",
    borderColor: "#2563EB",
  },

  imageButton: {
    borderWidth: 1,
    borderColor: "#2563EB",
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
    marginTop: 10,
  },

  preview: {
    width: "100%",
    height: 220,
    borderRadius: 15,
    marginTop: 20,
    resizeMode: "cover",
  },

  addButton: {
    marginTop: 25,
    backgroundColor: "#2563EB",
    padding: 18,
    borderRadius: 15,
    alignItems: "center",
    marginBottom: 25,
  },

  addText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});