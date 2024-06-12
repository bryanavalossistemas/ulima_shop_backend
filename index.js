import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { sequelize } from "./database/database.js";
import { User } from "./models/User.js";
import { Order } from "./models/Order.js";
import { Product } from "./models/Product.js";
import { Serie } from "./models/Serie.js";
import { DetailOrder } from "./models/DetailOrder.js";

// Database

async function connectDB() {
  try {
    await sequelize.authenticate();

    Order.belongsTo(User, {
      foreignKey: "userId",
      as: "user",
    });

    Order.hasMany(DetailOrder, {
      foreignKey: "orderId",
      as: "detailsOrder",
    });

    User.hasMany(Order, {
      foreignKey: "userId",
      as: "orders",
    });

    Product.belongsTo(Serie, {
      foreignKey: "serieId",
      as: "serie",
    });

    Serie.hasMany(Product, {
      foreignKey: "serieId",
      as: "products",
    });

    DetailOrder.belongsTo(Product, {
      foreignKey: "productId",
      as: "product",
    });

    DetailOrder.belongsTo(Order, {
      foreignKey: "orderId",
      as: "order",
    });

    // await sequelize.sync({ force: true });
    await sequelize.sync({ alter: true });

    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

await connectDB();

// Express

const app = express();

const port = 4000;

app.use(cors());

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

// End points

// User

app.post("/api/users", async function (req, res) {
  try {
    const { firstName, lastName, email, password, active } = req.body;
    if (!firstName || !lastName || !email || !password || !active) {
      return res.status(500).send("Faltan campos");
    }

    const user = await User.create(req.body);
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).send(error);
  }
});

app.get("/api/users", async function (req, res) {
  try {
    const users = await User.findAll();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).send(error);
  }
});

app.get("/api/users/:id", async function (req, res) {
  try {
    const idParam = req.params.id;
    const id = Number(idParam);
    if (Number.isNaN(id) || !Number.isInteger(id)) {
      return res.status(500).send("Parametro no valido");
    }

    const user = await User.findByPk(id, {
      include: [
        {
          model: Order,
          as: "orders",
          include: [
            {
              model: DetailOrder,
              as: "detailsOrder",
              include: [
                {
                  model: Product,
                  as: "product",
                },
              ],
            },
          ],
        },
      ],
    });
    if (!user) {
      return res.status(404).send("Usuario no encontrado");
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).send(error);
  }
});

app.post("/api/users/login", async function (req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(500).send("Faltan campos");
    }
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).send("Usuario no encontrado");
    }
    if (user.password !== password || user.active === false) {
      return res.status(500).send("Error");
    }
    return res.status(200).json({
      id: user.id,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
});

app.put("/api/users/:id", async function (req, res) {
  try {
    const idParam = req.params.id;
    const id = Number(idParam);
    if (Number.isNaN(id) || !Number.isInteger(id)) {
      return res.status(500).send("Parametro no valido");
    }

    const { firstName, lastName, email } = req.body;
    if (!firstName || !lastName || !email) {
      return res.status(500).send("Faltan campos");
    }

    const response = await User.update(req.body, {
      where: { id },
      returning: true,
    });
    if (response[0] === 0) {
      return res.status(404).send("Usuario no encontrado");
    }
    return res.status(201).json(response[1][0]);
  } catch (error) {
    return res.status(500).send(error);
  }
});

app.patch("/api/users/:id", async function (req, res) {
  try {
    const idParam = req.params.id;
    const id = Number(idParam);
    if (Number.isNaN(id) || !Number.isInteger(id)) {
      return res.status(500).send("Parametro no valido");
    }
    const { currentPassword, password } = req.body;
    if (!password) {
      return res.status(500).send("Faltan campos");
    }

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).send("Usuario no encontrado");
    }

    if (user.password !== currentPassword) {
      throw new Error();
    }

    await user.update(req.body);

    return res.status(201).json("Contraseña actualizada correctamente");
  } catch (error) {
    return res.status(500).send(error);
  }
});

app.patch("/api/users/:id/active", async function (req, res) {
  try {
    const idParam = req.params.id;
    const id = Number(idParam);
    if (Number.isNaN(id) || !Number.isInteger(id)) {
      return res.status(500).send("Parametro no valido");
    }
    const { active } = req.body;
    if (active === null) {
      return res.status(500).send("Faltan campos");
    }

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).send("Usuario no encontrado");
    }

    await user.update(req.body);
    return res.status(201).json("Usuario actualizado correctamente");
  } catch (error) {
    return res.status(500).send(error);
  }
});

app.delete("/api/users/:id", async function (req, res) {
  try {
    const idParam = req.params.id;
    const id = Number(idParam);
    if (Number.isNaN(id) || !Number.isInteger(id)) {
      return res.status(500).send("Parametro no valido");
    }

    const response = await User.destroy({ where: { id } });
    if (response === 0) {
      return res.status(404).send("Usuario no encontrado");
    }
    return res.status(201).send("Usuario eliminado correctamente");
  } catch (error) {
    return res.status(500).send(error);
  }
});

// Order

app.post("/api/orders", async function (req, res) {
  console.log(req.body);
  try {
    const {
      firstDirection,
      district,
      city,
      country,
      shippingMethod,
      paymentMethod,
      userId,
      status,
    } = req.body;
    if (
      !firstDirection ||
      !district ||
      !city ||
      !country ||
      !shippingMethod ||
      !userId ||
      !paymentMethod ||
      !status
    ) {
      return res.status(500).send("Faltan campos");
    }

    const order = await Order.create(req.body);
    console.log(order);
    return res.status(201).json(order);
  } catch (error) {
    return res.status(500).send(error);
  }
});

app.get("/api/orders", async function (req, res) {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: DetailOrder,
          as: "detailsOrder",
          include: [
            {
              model: Product,
              as: "product",
            },
          ],
        },
        {
          model: User,
          as: "user",
        },
      ],
    });
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).send(error);
  }
});

app.get("/api/orders/:id", async function (req, res) {
  try {
    const idParam = req.params.id;
    const id = Number(idParam);
    if (Number.isNaN(id) || !Number.isInteger(id)) {
      return res.status(500).send("Parametro no valido");
    }

    const order = await Order.findByPk(id, {
      include: [
        {
          model: DetailOrder,
          as: "detailsOrder",
          include: [
            {
              model: Product,
              as: "product",
            },
          ],
        },
      ],
    });
    if (!order) {
      return res.status(404).send("Order no encontrada");
    }
    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).send(error);
  }
});

app.get("/api/orders/user/:id", async function (req, res) {
  try {
    const idParam = req.params.id;
    const id = Number(idParam);
    if (Number.isNaN(id) || !Number.isInteger(id)) {
      return res.status(500).send("Parametro no valido");
    }

    const orders = await Order.findAll({
      where: { userId: id },
      include: [
        {
          model: DetailOrder,
          as: "detailsOrder",
          include: [
            {
              model: Product,
              as: "product",
            },
          ],
        },
      ],
    });
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).send(error);
  }
});

app.put("/api/orders/:id", async function (req, res) {
  try {
    const idParam = req.params.id;
    const id = Number(idParam);
    if (Number.isNaN(id) || !Number.isInteger(id)) {
      return res.status(500).send("Parametro no valido");
    }

    const {
      firstDirection,
      district,
      city,
      country,
      shippingMethod,
      status,
      userId,
      paymentMethod,
    } = req.body;
    if (
      !firstDirection ||
      !district ||
      !city ||
      !country ||
      !shippingMethod ||
      !status ||
      !userId ||
      !paymentMethod
    ) {
      return res.status(500).send("Faltan campos");
    }

    const response = await Order.update(req.body, {
      where: { id },
      returning: true,
    });
    if (response[0] === 0) {
      return res.status(404).send("Order no encontrada");
    }
    return res.status(201).json(response[1][0]);
  } catch (error) {
    return res.status(500).send(error);
  }
});

app.delete("/api/orders/:id", async function (req, res) {
  try {
    const idParam = req.params.id;
    const id = Number(idParam);
    if (Number.isNaN(id) || !Number.isInteger(id)) {
      return res.status(500).send("Parametro no valido");
    }

    const response = await Order.destroy({ where: { id } });
    if (response === 0) {
      return res.status(404).send("Order no encontrada");
    }
    return res.status(201).send("Order eliminada correctamente");
  } catch (error) {
    return res.status(500).send(error);
  }
});

// Serie

app.post("/api/series", async function (req, res) {
  try {
    const { name, description, image } = req.body;
    if (!name || !description || !image) {
      return res.status(500).send("Faltan campos");
    }

    const serie = await Serie.create(req.body);
    return res.status(201).json(serie);
  } catch (error) {
    return res.status(500).send(error);
  }
});

app.get("/api/series", async function (req, res) {
  try {
    const series = await Serie.findAll({
      include: { model: Product, as: "products" },
      order: [["createdAt", "DESC"]],
    });
    return res.status(200).json(series);
  } catch (error) {
    return res.status(500).send(error);
  }
});

app.get("/api/series/:id", async function (req, res) {
  try {
    const idParam = req.params.id;
    const id = Number(idParam);
    if (Number.isNaN(id) || !Number.isInteger(id)) {
      return res.status(500).send("Parametro no valido");
    }

    const serie = await Serie.findByPk(id, {
      include: { model: Product, as: "products" },
    });
    if (!serie) {
      return res.status(404).send("Serie no encontrada");
    }
    return res.status(200).json(serie);
  } catch (error) {
    return res.status(500).send(error);
  }
});

app.put("/api/series/:id", async function (req, res) {
  try {
    const idParam = req.params.id;
    const id = Number(idParam);
    if (Number.isNaN(id) || !Number.isInteger(id)) {
      return res.status(500).send("Parametro no valido");
    }

    const { name, description, image } = req.body;
    if (!name || !description || !image) {
      return res.status(500).send("Faltan campos");
    }

    const response = await Serie.update(req.body, {
      where: { id },
      returning: true,
    });
    if (response[0] === 0) {
      return res.status(404).send("Serie no encontrada");
    }
    return res.status(201).json(response[1][0]);
  } catch (error) {
    return res.status(500).send(error);
  }
});

app.delete("/api/series/:id", async function (req, res) {
  try {
    const idParam = req.params.id;
    const id = Number(idParam);
    if (Number.isNaN(id) || !Number.isInteger(id)) {
      return res.status(500).send("Parametro no valido");
    }

    const response = await Serie.destroy({ where: { id } });
    if (response === 0) {
      return res.status(404).send("Serie no encontrada");
    }
    return res.status(201).send("Serie eliminada correctamente");
  } catch (error) {
    return res.status(500).send(error);
  }
});

// Product

app.post("/api/products", async function (req, res) {
  try {
    const {
      name,
      description,
      feature,
      brand,
      type,
      active,
      price,
      stock,
      serieId,
      image,
    } = req.body;
    if (
      !name ||
      !description ||
      !feature ||
      !brand ||
      !type ||
      !active ||
      !price ||
      !stock ||
      !serieId ||
      !image
    ) {
      return res.status(500).json("Faltan campos");
    }

    const product = await Product.create(req.body);
    return res.status(201).json(product);
  } catch (error) {
    return res.status(500).send(error);
  }
});

app.get("/api/products", async function (req, res) {
  try {
    const products = await Product.findAll({
      include: { model: Serie, as: "serie" },
      order: [["createdAt", "DESC"]],
    });
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).send(error);
  }
});

app.get("/api/products/:id", async function (req, res) {
  try {
    const idParam = req.params.id;
    const id = Number(idParam);
    if (Number.isNaN(id) || !Number.isInteger(id)) {
      return res.status(500).send("Parametro no valido");
    }

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).send("Producto no encontrado");
    }
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).send(error);
  }
});

app.put("/api/products/:id", async function (req, res) {
  try {
    const idParam = req.params.id;
    const id = Number(idParam);
    if (Number.isNaN(id) || !Number.isInteger(id)) {
      return res.status(500).send("Parametro no valido");
    }

    const {
      name,
      description,
      feature,
      brand,
      type,
      active,
      price,
      stock,
      serieId,
      image,
    } = req.body;
    if (
      !name ||
      !description ||
      !feature ||
      !brand ||
      !type ||
      !active ||
      !price ||
      !stock ||
      !serieId ||
      !image
    ) {
      return res.status(500).send("Faltan campos");
    }

    const response = await Product.update(req.body, {
      where: { id },
      returning: true,
    });
    if (response[0] === 0) {
      return res.status(404).send("Producto no encontrado");
    }
    return res.status(201).json(response[1][0]);
  } catch (error) {
    return res.status(500).send(error);
  }
});

app.patch("/api/products/:id", async function (req, res) {
  try {
    const idParam = req.params.id;
    const id = Number(idParam);
    if (Number.isNaN(id) || !Number.isInteger(id)) {
      return res.status(500).send("Parametro no valido");
    }

    const { active } = req.body;
    if (active === null) {
      return res.status(500).send("Faltan campos");
    }

    const response = await Product.update(
      { active },
      {
        where: { id },
        returning: true,
      }
    );
    if (response[0] === 0) {
      return res.status(404).send("Producto no encontrado");
    }
    return res.status(201).json(response[1][0]);
  } catch (error) {
    return res.status(500).send(error);
  }
});

app.delete("/api/products/:id", async function (req, res) {
  try {
    const idParam = req.params.id;
    const id = Number(idParam);
    if (Number.isNaN(id) || !Number.isInteger(id)) {
      return res.status(500).send("Parametro no valido");
    }

    const response = await Product.destroy({ where: { id } });
    if (response === 0) {
      return res.status(404).send("Producto no encontrado");
    }
    return res.status(201).send("Producto eliminado correctamente");
  } catch (error) {
    return res.status(500).send(error);
  }
});

// DetailOrder

app.post("/api/detailsOrder", async function (req, res) {
  try {
    const { orderId, productId, quantity } = req.body;
    if (!orderId || !productId || !quantity) {
      return res.status(500).send("Faltan campos");
    }

    const detailOrder = await DetailOrder.create(req.body);
    return res.status(201).json(detailOrder);
  } catch (error) {
    return res.status(500).send(error);
  }
});

app.get("/api/detailsOrder", async function (req, res) {
  try {
    const detailsOrder = await DetailOrder.findAll();
    return res.status(200).json(detailsOrder);
  } catch (error) {
    return res.status(500).send(error);
  }
});

app.get("/api/detailsOrder/:id", async function (req, res) {
  try {
    const idParam = req.params.id;
    const id = Number(idParam);
    if (Number.isNaN(id) || !Number.isInteger(id)) {
      return res.status(500).send("Parametro no valido");
    }

    const detailOrder = await DetailOrder.findByPk(id);
    if (!detailOrder) {
      return res.status(404).send("Detalle de orden no encontrada");
    }
    return res.status(200).json(detailOrder);
  } catch (error) {
    return res.status(500).send(error);
  }
});

app.put("/api/detailsOrder/:id", async function (req, res) {
  try {
    const idParam = req.params.id;
    const id = Number(idParam);
    if (Number.isNaN(id) || !Number.isInteger(id)) {
      return res.status(500).send("Parametro no valido");
    }

    const { orderId, productId, quantity } = req.body;
    if (!orderId || !productId || !quantity) {
      return res.status(500).send("Faltan campos");
    }

    const response = await DetailOrder.update(req.body, {
      where: { id },
      returning: true,
    });
    if (response[0] === 0) {
      return res.status(404).send("Detalle de orden no encontrada");
    }
    return res.status(201).json(response[1][0]);
  } catch (error) {
    return res.status(500).send(error);
  }
});

app.delete("/api/detailsOrder/:id", async function (req, res) {
  try {
    const idParam = req.params.id;
    const id = Number(idParam);
    if (Number.isNaN(id) || !Number.isInteger(id)) {
      return res.status(500).send("Parametro no valido");
    }

    const response = await DetailOrder.destroy({ where: { id } });
    if (response === 0) {
      return res.status(404).send("Detalle de orden no encontrada");
    }
    return res.status(201).send("Detalle de orden eliminada correctamente");
  } catch (error) {
    return res.status(500).send(error);
  }
});

app.listen(port, function () {
  console.log("Servidor funcionando en el puerto: " + port);
});
