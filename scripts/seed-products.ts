import { getCliClient } from "sanity/cli";

const client = getCliClient();

const products = [
  {
    id: "product-chocolate-cake",
    name: "Chocolate Cake",
    slug: "chocolate-cake",
    description:
      "Rich and moist chocolate cake layered with smooth chocolate cream, perfect for birthdays and celebrations.",
    price: 499,
    category: "cakes",
    ingredients: [
      "Refined flour",
      "Cocoa powder",
      "Sugar",
      "Butter",
      "Milk",
      "Eggs",
      "Chocolate",
      "Baking powder",
    ],
    isFeatured: true,
  },
  {
    id: "product-red-velvet-cake",
    name: "Red Velvet Cake",
    slug: "red-velvet-cake",
    description:
      "Soft red velvet sponge layered with creamy frosting for a rich and indulgent celebration cake.",
    price: 599,
    category: "cakes",
    ingredients: [
      "Refined flour",
      "Cocoa powder",
      "Sugar",
      "Butter",
      "Milk",
      "Eggs",
      "Cream cheese",
      "Vanilla",
    ],
    isFeatured: true,
  },
  {
    id: "product-black-forest-cake",
    name: "Black Forest Cake",
    slug: "black-forest-cake",
    description:
      "Classic chocolate sponge layered with whipped cream and cherry filling, finished with chocolate shavings.",
    price: 549,
    category: "cakes",
    ingredients: [
      "Chocolate sponge",
      "Whipped cream",
      "Cherries",
      "Sugar",
      "Chocolate",
      "Milk",
      "Eggs",
    ],
    isFeatured: false,
  },
  {
    id: "product-pineapple-cake",
    name: "Pineapple Cake",
    slug: "pineapple-cake",
    description:
      "Light and fluffy vanilla sponge layered with pineapple and fresh cream for a refreshing sweet treat.",
    price: 499,
    category: "cakes",
    ingredients: [
      "Refined flour",
      "Sugar",
      "Butter",
      "Milk",
      "Eggs",
      "Pineapple",
      "Whipped cream",
      "Vanilla",
    ],
    isFeatured: false,
  },
  {
    id: "product-croissant",
    name: "Croissant",
    slug: "croissant",
    description:
      "Flaky and buttery golden pastry with delicate layers, freshly baked for a perfect breakfast or tea-time snack.",
    price: 149,
    category: "pastries",
    ingredients: [
      "Refined flour",
      "Butter",
      "Milk",
      "Sugar",
      "Yeast",
      "Salt",
    ],
    isFeatured: true,
  },
  {
    id: "product-chocolate-brownie",
    name: "Chocolate Brownie",
    slug: "chocolate-brownie",
    description:
      "Dense and fudgy chocolate brownie with a rich cocoa flavour, perfect for satisfying chocolate cravings.",
    price: 99,
    category: "pastries",
    ingredients: [
      "Chocolate",
      "Cocoa powder",
      "Refined flour",
      "Sugar",
      "Butter",
      "Eggs",
      "Vanilla",
    ],
    isFeatured: false,
  },
  {
    id: "product-chocolate-muffin",
    name: "Chocolate Muffin",
    slug: "chocolate-muffin",
    description:
      "Soft and fluffy chocolate muffin packed with rich cocoa flavour, ideal for breakfast or an evening snack.",
    price: 79,
    category: "pastries",
    ingredients: [
      "Refined flour",
      "Cocoa powder",
      "Sugar",
      "Butter",
      "Milk",
      "Eggs",
      "Chocolate chips",
    ],
    isFeatured: false,
  },
  {
    id: "product-donut",
    name: "Donut",
    slug: "donut",
    description:
      "Soft and fluffy freshly baked donut topped with a delicious sweet glaze.",
    price: 59,
    category: "pastries",
    ingredients: [
      "Refined flour",
      "Sugar",
      "Milk",
      "Butter",
      "Yeast",
      "Vanilla",
    ],
    isFeatured: false,
  },
  {
    id: "product-butter-cookies",
    name: "Butter Cookies",
    slug: "butter-cookies",
    description:
      "Crispy and buttery cookies with a delicate texture, freshly baked for everyday tea-time enjoyment.",
    price: 80,
    category: "cookies-biscuits",
    ingredients: [
      "Refined flour",
      "Butter",
      "Sugar",
      "Milk",
      "Vanilla",
    ],
    isFeatured: false,
  },
  {
    id: "product-jeera-biscuits",
    name: "Jeera Biscuits",
    slug: "jeera-biscuits",
    description:
      "Crispy savoury biscuits flavoured with aromatic cumin seeds, perfect with tea or coffee.",
    price: 70,
    category: "cookies-biscuits",
    ingredients: [
      "Refined flour",
      "Butter",
      "Cumin seeds",
      "Sugar",
      "Salt",
      "Milk",
    ],
    isFeatured: false,
  },
  {
    id: "product-khari",
    name: "Khari",
    slug: "khari",
    description:
      "Light, crispy and flaky puff pastry snack that pairs perfectly with hot tea or coffee.",
    price: 80,
    category: "cookies-biscuits",
    ingredients: [
      "Refined flour",
      "Butter",
      "Salt",
      "Water",
    ],
    isFeatured: false,
  },
  {
    id: "product-garlic-bread",
    name: "Garlic Bread",
    slug: "garlic-bread",
    description:
      "Freshly baked soft bread topped with garlic butter and herbs, served warm and delicious.",
    price: 120,
    category: "breads",
    ingredients: [
      "Refined flour",
      "Butter",
      "Garlic",
      "Milk",
      "Yeast",
      "Mixed herbs",
      "Salt",
    ],
    isFeatured: true,
  },
  {
    id: "product-veg-puff",
    name: "Veg Puff",
    slug: "veg-puff",
    description:
      "Crispy flaky puff pastry filled with a mildly spiced vegetable mixture, perfect for a quick snack.",
    price: 40,
    category: "savouries",
    ingredients: [
      "Refined flour",
      "Butter",
      "Potato",
      "Carrot",
      "Peas",
      "Spices",
      "Salt",
    ],
    isFeatured: true,
  },
  {
    id: "product-paneer-puff",
    name: "Paneer Puff",
    slug: "paneer-puff",
    description:
      "Golden flaky puff pastry filled with seasoned paneer and vegetables for a delicious savoury bite.",
    price: 50,
    category: "savouries",
    ingredients: [
      "Refined flour",
      "Butter",
      "Paneer",
      "Onion",
      "Capsicum",
      "Spices",
      "Salt",
    ],
    isFeatured: false,
  },
];

async function seedProducts() {
  console.log("Fetching categories...");

  const categories = await client.fetch(
    `*[_type == "category"] {
      _id,
      name,
      slug
    }`
  );

  const categoryMap = new Map<string, string>();

  for (const category of categories) {
    if (category.slug?.current) {
      categoryMap.set(category.slug.current, category._id);
    }
  }

  console.log("Categories found:", [...categoryMap.keys()]);

  for (const product of products) {
    const categoryId = categoryMap.get(product.category);

    if (!categoryId) {
      console.error(
        `Skipping ${product.name}: category "${product.category}" not found.`
      );
      continue;
    }

    const document = {
      _id: product.id,
      _type: "product",
      name: product.name,
      slug: {
        _type: "slug",
        current: product.slug,
      },
      description: product.description,
      price: product.price,
      category: {
        _type: "reference",
        _ref: categoryId,
      },
      ingredients: product.ingredients,
      isFeatured: product.isFeatured,
      isAvailable: true,
      createdAt: new Date().toISOString(),
    };

    await client.createIfNotExists(document);

    console.log(`✓ ${product.name}`);
  }

  console.log("\nFinished creating products.");
}

seedProducts().catch((error) => {
  console.error("\n❌ Error:", error);
  process.exit(1);
});