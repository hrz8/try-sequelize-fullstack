require('dotenv').config();

const { Article } = require('./models');
const express = require('express');

const app = express();
app.use(express.urlencoded({
  extended: true,
}));
app.use(express.json({
  limit: '1mb'
}));

app.set('view engine', 'ejs')

// GET: articles/create -> mengembalikan sebuah form untuk membuat article baru
app.get('/articles/create', (req, res) => {
    res.render('articles/create');
});

// POST: articles -> ngepost menggunakan urlencoded form-data dan mengembalikan sebuah json
app.post('/articles', async (req, res) => {
  const input = {
    title: req.body.title,
    content: req.body.content
  };

  if (!input.title || !input.content) {
    // throw new Error('title or content is required')
    res.status(400).send({
      error: 'title or content is required'
    });
  } else {
    await Article.create(input);
    res.redirect('/articles');
  }
});

// GET: articles -> mengambil semua data articles dari database
// dan mengembalikan html yang berisi list articles
app.get('/articles', async (req, res) => {
  const articles = await Article.findAll();
  res.render('articles/index', {articles}); 
});

// GET: articles/edit/:id -> mengambil data article based on id
// mengembalikan sebuah html yang berupa form yang sudah terisi data dari id tsb
app.get('/articles/edit/:id', async (req, res) => {
    const article = await Article.findOne({
      where: {
        id : parseInt(req.params.id)
      }
    });
    
    res.render('articles/edit', {article});
});

// POST: articles/:id -> mengambil data body dari urlencoded form data
// mengupdata database dengan id yang diberikan
// me-redirect page user untuk ke halaman /articles
app.post('/articles/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const newArticle = {
    title: req.body.title,
    content: req.body.content
  }
  await Article.update(newArticle, {where: {id}});

  res.redirect('/articles');
});

// POST: articles/remove/:id
app.post('/articles/remove/:id', async (req, res) => {
  const id = parseInt(req.params.id);

  await Article.destroy({where: {id}});

  res.redirect('/articles');
});

// app.use(async (err, req, res, next) => {
//   if (err.message === 'title or content is required') {
//     res.status(400).send({
//       error: err.message
//     })
//   } else {
//     res.status(500).send('Internal Server Error');
//   }
// })

app.listen(process.env.APP_PORT);
