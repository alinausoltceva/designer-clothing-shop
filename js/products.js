const products = [
    // Коллекция «Цветы империи»
    {
        id: 1,
        name: 'Блуза для девочки',
        price: 4000,
        category: 'kids',
        type: 'blouse',
        collection: 'collection-01',
        image: 'images/products/flowers-blouse-01.jpg'
    },
    {
        id: 2,
        name: 'Брюки для девочки',
        price: 6000,
        category: 'kids',
        type: 'trousers',
        collection: 'collection-01',
        image: 'images/products/flowers-trousers-01.jpg'
    },
    {
        id: 3,
        name: 'Блуза для девочки',
        price: 5000,
        category: 'kids',
        type: 'blouse',
        collection: 'collection-01',
        image: 'images/products/flowers-blouse-02.jpg'
    },
    {
        id: 4,
        name: 'Велосипедики для девочки',
        price: 5000,
        category: 'kids',
        type: 'leggings',
        collection: 'collection-01',
        image: 'images/products/flowers-leggings.jpg'
    },
    {
        id: 5,
        name: 'Блуза для девочки',
        price: 4000,
        category: 'kids',
        type: 'blouse',
        collection: 'collection-01',
        image: 'images/products/flowers-blouse-03.jpg'
    },
    {
        id: 6,
        name: 'Комбинезон для девочки',
        price: 7000,
        category: 'kids',
        type: 'overalls',
        collection: 'collection-01',
        image: 'images/products/flowers-overalls.jpg'
    },
    {
        id: 7,
        name: 'Куртка для девочки',
        price: 7000,
        category: 'kids',
        type: 'jacket',
        collection: 'collection-01',
        image: 'images/products/flowers-jacket.jpg'
    },
    {
        id: 8,
        name: 'Юбка для девочки',
        price: 5000,
        category: 'kids',
        type: 'skirt',
        collection: 'collection-01',
        image: 'images/products/flowers-skirt.jpg'
    },
    {
        id: 9,
        name: 'Блуза для девочки',
        price: 4000,
        category: 'kids',
        type: 'blouse',
        collection: 'collection-01',
        image: 'images/products/flowers-blouse-04.jpg'
    },
    {
        id: 10,
        name: 'Брюки для девочки',
        price: 5000,
        category: 'kids',
        type: 'trousers',
        collection: 'collection-01',
        image: 'images/products/flowers-trousers-02.jpg'
    },

    // Коллекция «54/42»
    {
        id: 11,
        name: 'Лонгслив',
        price: 6000,
        category: 'women',
        type: 'longsleeve',
        collection: 'collection-02',
        image: 'images/products/54-42-longsleeve.jpg'
    },
    {
        id: 12,
        name: 'Брюки',
        price: 8000,
        category: 'women',
        type: 'trousers',
        collection: 'collection-02',
        image: 'images/products/54-42-trousers-01.jpg'
    },
    {
        id: 13,
        name: 'Топ',
        price: 5000,
        category: 'women',
        type: 'top',
        collection: 'collection-02',
        image: 'images/products/54-42-top.jpg'
    },
    {
        id: 14,
        name: 'Юбка',
        price: 5000,
        category: 'women',
        type: 'skirt',
        collection: 'collection-02',
        image: 'images/products/54-42-skirt-01.jpg'
    },
    {
        id: 15,
        name: 'Худи',
        price: 7000,
        category: 'women',
        type: 'hoodie',
        collection: 'collection-02',
        image: 'images/products/54-42-hoodie.jpg'
    },
    {
        id: 16,
        name: 'Брюки',
        price: 6000,
        category: 'women',
        type: 'trousers',
        collection: 'collection-02',
        image: 'images/products/54-42-trousers-02.jpg'
    },
    {
        id: 17,
        name: 'Блуза',
        price: 9000,
        category: 'women',
        type: 'blouse',
        collection: 'collection-02',
        image: 'images/products/54-42-blouse.jpg'
    },
    {
        id: 18,
        name: 'Платье',
        price: 12000,
        category: 'women',
        type: 'dress',
        collection: 'collection-02',
        image: 'images/products/54-42-dress.jpg'
    },
    {
        id: 19,
        name: 'Куртка',
        price: 15000,
        category: 'women',
        type: 'jacket',
        collection: 'collection-02',
        image: 'images/products/54-42-jacket.jpg'
    },
    {
        id: 20,
        name: 'Юбка',
        price: 7000,
        category: 'women',
        type: 'skirt',
        collection: 'collection-02',
        image: 'images/products/54-42-skirt-02.jpg'
    },

    // Коллекция «Весенний сон»
    {
        id: 21,
        name: 'Шорты',
        price: 4000,
        category: 'women',
        type: 'shorts',
        collection: 'collection-03',
        image: 'images/products/spring-shorts.jpg'
    },
    {
        id: 22,
        name: 'Блуза',
        price: 6000,
        category: 'women',
        type: 'blouse',
        collection: 'collection-03',
        image: 'images/products/spring-blouse-01.jpg'
    },
    {
        id: 23,
        name: 'Платье',
        price: 6000,
        category: 'women',
        type: 'dress',
        collection: 'collection-03',
        image: 'images/products/spring-dress-01.jpg'
    },
    {
        id: 24,
        name: 'Сарафан вязаный',
        price: 5000,
        category: 'women',
        type: 'sundress',
        collection: 'collection-03',
        image: 'images/products/spring-sarafan.jpg'
    },
    {
        id: 25,
        name: 'Юбка',
        price: 5000,
        category: 'women',
        type: 'skirt',
        collection: 'collection-03',
        image: 'images/products/spring-skirt.jpg'
    },
    {
        id: 26,
        name: 'Платье',
        price: 6000,
        category: 'women',
        type: 'dress',
        collection: 'collection-03',
        image: 'images/products/spring-dress-02.jpg'
    },
    {
        id: 27,
        name: 'Блуза',
        price: 6000,
        category: 'women',
        type: 'blouse',
        collection: 'collection-03',
        image: 'images/products/spring-blouse-02.jpg'
    },
    {
        id: 28,
        name: 'Брюки',
        price: 7000,
        category: 'women',
        type: 'trousers',
        collection: 'collection-03',
        image: 'images/products/spring-trousers.jpg'
    },
    {
        id: 29,
        name: 'Платье',
        price: 8000,
        category: 'women',
        type: 'dress',
        collection: 'collection-03',
        image: 'images/products/spring-dress-03.jpg'
    }
];