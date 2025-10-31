import { UserModel } from "../user/user.model.js";

export default class ProductModel {
  constructor(id, name, desc, imgUrl, category, price, sizes) {
    this.id = id;
    this.name = name;
    this.desc = desc;
    this.imgUrl = imgUrl;
    this.category = category;
    this.price = price;
    this.sizes = sizes;
  }

  static getAll() {
    return products;
  }

  static get(id) {
    const product = products.find((i) => i.id === id);
    return product;
  }

  static add(product) {
    product.id = products.length + 1;
    products.push(product);
    return product;
  }

  static filter(minPrice, maxPrice, category) {
    const result = products.filter((product) => {
      return (
        (!minPrice || product.price >= minPrice) &&
        (!maxPrice || product.price <= maxPrice) &&
        (!category || product.category === category)
      );
    });
    return result;
  }

  static rateProduct(userId, productId, rating) {
    //1.Validate user and product
    const user = UserModel.getAll().find((u) => u.id == userId);

    if (!user) {
      return "User not found";
    }

    //Validate the product
    const product = products.find((p) => p.id == productId);

    if (!product) {
      return "Product not found";
    }
    //2.check if there are any ratings and if not then add ratings array
    if (!product.ratings) {
      product.ratings = [];
      product.ratings.push({
        userId: userId,
        rating: rating,
      });

      //3.check if user has already rated the product
    } else {
      const existingRating = product.ratings.findIndex(
        (r) => r.userId === userId
      );
      if (existingRating >= 0) {
        product.ratings[existingRating].rating = {
          userId: userId,
          rating: rating,
        };
      }
      //If no existing rating
      else {
        product.ratings.push({
          userId: userId,
          rating: rating,
        });
      }
    }
  }
}

var products = [
  new ProductModel(
    1,
    "T-Shirt",
    "A nice t-shirt",
    "https://www.google.com/imgres?q=amazon%20t%20shirts&imgurl=https%3A%2F%2Fm.media-amazon.com%2Fimages%2FI%2F81z3--jN30L._UY1000_.jpg&imgrefurl=https%3A%2F%2Fwww.amazon.com%2FAmazon-Essentials-Mens-Crewneck-T-Shirt%2Fdp%2FB0BG7N1JCT&docid=mQonrCjWVdfCpM&tbnid=fz5LW9qoLT7C8M&vet=12ahUKEwj2p63L1bqPAxX62gIHHWhcEsMQM3oECBEQAA..i&w=986&h=1000&hcb=2&ved=2ahUKEwj2p63L1bqPAxX62gIHHWhcEsMQM3oECBEQAA",
    "category1",
    19.99,

    ["S", "M", "L", "XL"]
  ),

  new ProductModel(
    2,
    "Jeans",
    "Comfortable jeans",
    "https://www.google.com/aclk?sa=L&ai=DChsSEwiAic3v1bqPAxVZxkQHHVb8NgMYACICCAEQBRoCZWY&co=1&ase=2&gclid=CjwKCAjwq9rFBhAIEiwAGVAZP8AyqEdPD7EVd5EgJUvSJ-p5iFNE3qYR4GDFn5XcwRJNykBx-FExlBoCvUYQAvD_BwE&cce=2&category=acrcp_v1_32&sig=AOD64_1hexsLmgS1e91QiAI1K-yUohMg9A&ctype=5&q=&nis=4&ved=2ahUKEwjC4Mbv1bqPAxW5_AIHHVTGOj0Qwg8oAXoECAcQHA&adurl=",
    "category2",
    49.99,
    ["S", "M", "XL"]
  ),

  new ProductModel(
    3,
    "Sneakers",
    "Stylish sneakers",
    "https://www.google.com/imgres?q=amazon%20sneakers&imgurl=https%3A%2F%2Fm.media-amazon.com%2Fimages%2FI%2F71AlnxaNXKL._UY900_.jpg&imgrefurl=https%3A%2F%2Fwww.amazon.com%2Fsomiliss-Sneakers-Patchwork-Non-Slip-Comfortable%2Fdp%2FB0CD3DL7BS&docid=30fqiYRvXjfulM&tbnid=hBXXCZyndO26VM&vet=12ahUKEwiCj8321bqPAxWPywIHHWMoGBMQM3oECBoQAA..i&w=900&h=900&hcb=2&ved=2ahUKEwiCj8321bqPAxWPywIHHWMoGBMQM3oECBoQAA",
    "category3",
    89.99
  ),
];
