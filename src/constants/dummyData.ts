import { shoes } from "@/types/shoes";

export const dummyShoes: shoes[] = [
    {
        id: "1",
        brand: "Nike",
        model: "Air Max 270",
        price: 8999,
        sizes: [7, 8, 9, 10],
        image: require("./../../assets/images/NikeImage.jpeg"),
selectedSize: 0,
        quantity: 0
    },
    {
        id: "2",
        brand: "Adidas",
        model: "Ultraboost 22",
        price: 9999,
        sizes: [7, 8, 9, 10, 11],
        image: require("./../../assets/images/Ultra-Boost-Adidas-Shoes-PNG.png"),
        selectedSize: 0,

        quantity: 0
    },
    {
        id: "3",
        brand: "Puma",
        model: "RS-X",
        price: 7499,
        sizes: [6, 7, 8, 9],
        image: require("./../../assets/images/android-icon-foreground.png"),
        selectedSize: 0,

        quantity: 0

    },
    {
        id: "4",
        brand: "Converse",
        model: "Chuck Taylor 70",
        price: 5999,
        sizes: [7, 8, 9],
        selectedSize: 0,

        image: require("./../../assets/images/images.jpeg"),
        quantity: 0

    },
    {
        id: "5",
        brand: "New Balance",
        model: "574 Classic",
        price: 8499,
        sizes: [8, 9, 10, 11],
        quantity: 0,
        image: require("./../../assets/images/newBalance.jpeg"),
        selectedSize: 0,


    },
];