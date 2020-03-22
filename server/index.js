require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/products', (req, res) => {
  const sql = `
  SELECT
    "productId",
    "name",
    "price",
    "image",
    "shortDescription"
  FROM "products"
  `;
  db.query(sql)
    .then(result => {
      const arrData = result.rows;
      res.status(200).json(arrData);
    });
});

app.get('/api/products/:productId', (req, res, next) => {
  const { productId } = req.params;

  const sql = `
  SELECT *
  FROM "products"
  WHERE "productId" = $1
  `;

  if (!Number(productId)) {
    return res.status(400).json({
      error: `${productId} should be a positive integer number`
    });
  }

  db.query(sql, [productId])
    .then(result => {
      const data = result.rows[0];
      if (!data) {
        return res.status(400).json({
          error: 'Product ID does not exist'
        });
      } else {
        return res.status(200).json(data);
      }
    })
    .catch(err => next(err));
}
);
app.get('/api/cart', (req, res, next) => {

  if (!('cartId' in req.session)) {
    return res.status(200).json([]);
  }
  const value = [req.session.cartId];
  const sql = `
  select "c"."cartItemId",
        "c"."price",
        "p"."productId",
        "p"."image",
        "p"."name",
        "p"."shortDescription"
  from "cartItems" as "c"
  join "products" as "p" using ("productId")
  where "c"."cartId" = $1
  `;
  db.query(sql, value)
    .then(data => {
      res.status(200).json(data.rows);
    })
    .catch(err => next(err));
});

app.post('/api/cart', (req, res, next) => {
  const { productId } = req.body;
  const value = [productId];

  if (!Number(productId)) {
    return next(
      new ClientError(`${productId} must be a positive integer`, 400)
    );
  }

  const sql = `
  SELECT "price"
  FROM "products"
  WHERE "productId" = $1
  `;

  db.query(sql, value)
    .then(result => {
      const price = result.rows[0];
      if (!price) {
        throw new ClientError(`productId ${productId} does not exist`, 400);
      }
      const sql = `
      insert into "carts" ("cartId", "createdAt")
      values (default, default)
      returning "cartId"`;
      return db.query(sql).then(cartId => ({
        cartId: cartId.rows[0].cartId,
        price: price.price
      }));
    })
    .then(cardIDprice => {
      req.session.cartId = cardIDprice.cartId;
      const price = cardIDprice.price;
      const values = [cardIDprice.cartId, productId, price];
      const sql = `
        insert into "cartItems" ("cartId", "productId", "price")
        values ($1, $2, $3)
        returning "cartItemId"
      `;

      return db.query(sql, values).then(cartItemId => cartItemId.rows[0]);
    })
    .then(cartItemId => {
      const value = [cartItemId.cartItemId];
      const sql = `
      select "c"."cartItemId",
        "c"."price",
        "p"."productId",
        "p"."image",
        "p"."name",
        "p"."shortDescription"
      from "cartItems" as "c"
      join "products" as "p" using ("productId")
      where "c"."cartItemId" = $1`;
      return db.query(sql, value)
        .then(data => {
          res.status(200).json(data.rows);
        });
    })
    .catch(err => next(err));

});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
