export interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    image: string;
    description: string;
}

export const PRODUCTS: Product[] = [
    { 
        id: 1, 
        name: 'Hand-Painted Vase', 
        category: 'Pottery', 
        price: 45.00, 
        image: 'https://images.unsplash.com/photo-1578991621999-5287236d3a7c?q=80&w=800',
        description: 'A beautifully hand-painted vase, crafted with traditional techniques. The intricate patterns are inspired by nature, making each piece unique. Perfect for holding fresh flowers or as a standalone decorative item.'
    },
    { 
        id: 2, 
        name: 'Woven Silk Scarf', 
        category: 'Textiles', 
        price: 75.00, 
        image: 'https://images.unsplash.com/photo-1598897034663-17a23356b579?q=80&w=800',
        description: 'Luxurious silk scarf, hand-woven on a traditional loom. The vibrant colors are achieved using natural dyes, and the soft texture feels wonderful against the skin. A timeless accessory for any season.'
    },
    { 
        id: 3, 
        name: 'Wooden Elephant Toy', 
        category: 'Woodwork', 
        price: 25.00, 
        image: 'https://images.unsplash.com/photo-1599602235900-510613271465?q=80&w=800',
        description: 'A charming, hand-carved wooden elephant toy made from sustainable mango wood. Polished to a smooth finish with non-toxic oils, it is a safe and delightful toy for children or a whimsical decor piece.'
    },
    { 
        id: 4, 
        name: 'Terracotta Pot Set', 
        category: 'Pottery', 
        price: 30.00, 
        image: 'https://images.unsplash.com/photo-1559819225-3b3a32890a8a?q=80&w=800',
        description: 'A set of three rustic terracotta pots, perfect for succulents, herbs, or small plants. Each pot is hand-molded and fired in a traditional kiln, giving it a unique, earthy character.'
    },
    { 
        id: 5, 
        name: 'Madhubani Painting', 
        category: 'Painting', 
        price: 120.00, 
        image: 'https://images.unsplash.com/photo-1618841575168-a2536aade553?q=80&w=800',
        description: 'An authentic Madhubani painting depicting traditional folklore. Created with natural pigments on handmade paper, this intricate piece of art is a celebration of culture and storytelling.'
    },
    { 
        id: 6, 
        name: 'Handloom Table Runner', 
        category: 'Textiles', 
        price: 55.00, 
        image: 'https://images.unsplash.com/photo-1620722399813-9d8a4a55a845?q=80&w=800',
        description: 'Elevate your dining experience with this elegant handloom table runner. Woven with high-quality cotton threads, it features a subtle geometric pattern that adds a touch of sophistication to any table setting.'
    },
    { 
        id: 7, 
        name: 'Tribal Art Mask', 
        category: 'Decor', 
        price: 90.00, 
        image: 'https://images.unsplash.com/photo-1533801338561-1c4b14a275b1?q=80&w=800',
        description: 'A striking tribal art mask, hand-carved from a single piece of wood and adorned with natural colors. This powerful decorative piece represents cultural heritage and adds a bold statement to any wall.'
    },
    { 
        id: 8, 
        name: 'Beaded Necklace', 
        category: 'Jewelry', 
        price: 60.00, 
        image: 'https://images.unsplash.com/photo-1616943846394-1a13ab37175c?q=80&w=800',
        description: 'A vibrant, handcrafted beaded necklace featuring a stunning combination of glass and wooden beads. The unique design and colorful palette make it a perfect accessory to brighten up any outfit.'
    },
];
