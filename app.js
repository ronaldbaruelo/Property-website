const express = require('express')
const app = express()
const bcrypt = require('bcryptjs')
const session = require('express-session')
const db = require('./dbConfig')

app.set('view engine', 'ejs')

app.use(
  session({
    secret: 'yoursecret',
    resave: true,
    saveUninitialized: true,
  })
)

app.use('/public', express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Home route
app.get('/', async function (req, res) {
  const sql = 'SELECT * FROM listing ORDER BY listing_date DESC LIMIT 3'
  try {
    const result = await db.query(sql)
    const view = req.session.loggedin ? 'homeMember' : 'home'
    res.render(view, { title: 'Home', listingData: result })
  } catch (err) {
    console.error('Database error:', err)
    res.status(500).send('An error occurred. Please try again later.')
  }
})

// Property listings
app.get('/listprop', async function (req, res) {
  try {
    const result = await db.query('SELECT * FROM listing')
    res.render('listprop', { title: 'Property Listings', listingData: result })
  } catch (err) {
    console.error('Database error:', err)
    res.status(500).send('An error occurred. Please try again later.')
  }
})

// Login page
app.get('/login', function (req, res) {
  res.render('login')
})

// Register page
app.get('/register', function (req, res) {
  res.render('register')
})

// Authentication
/* app.post('/auth', function (req, res) {
  let email = req.body.email
  let password = req.body.password
  if (email && password) {
    conn.query(
      'SELECT * FROM users WHERE email = ? AND password = ?',
      [email, password],
      function (error, results, fields) {
        if (error) throw error
        if (results.length > 0) {
          req.session.loggedin = true
          req.session.email = email
          res.redirect('/membersOnly')
        } else {
          res.send('Incorrect Email and/or Password!')
        }
        res.end()
      }
    )
  } else {
    res.send('Please enter Username and Password!')
    res.end()
  }
})
 */
app.post('/auth', async function (req, res) {
  const email = req.body.email
  const password = req.body.password

  if (!email || !password) {
    console.log('Error: Missing email or password')
    return res.status(400).send('Please enter Email and Password!')
  }

  // Query to retrieve the user by email
  const sql = 'SELECT * FROM users WHERE email = ?'
  console.log('Executing SQL:', sql, [email])

  try {
    const results = await db.query(sql, [email])
    if (results.length > 0) {
      const user = results[0]
      // Compare the provided password with the hashed password in the database
      bcrypt.compare(password, user.password, function (err, isMatch) {
        if (err) {
          console.error('Error comparing passwords:', err)
          return res
            .status(500)
            .send('An error occurred. Please try again later.')
        }

        if (isMatch) {
          req.session.loggedin = true
          req.session.email = email
          console.log(`User ${email} logged in successfully.`)
          res.redirect('/membersOnly')
        } else {
          console.log('Error: Invalid password')
          res.status(401).send('Incorrect Email and/or Password!')
        }
      })
    } else {
      console.log('Error: User not found')
      res.status(401).send('Incorrect Email and/or Password!')
    }
  } catch (error) {
    console.error('Database error:', error)
    res.status(500).send('An error occurred. Please try again later.')
  }
})

// Contact form submission
app.post('/contact', async function (req, res) {
  const { name, phone, email, subject, text_message } = req.body

  if (name && phone && email && subject && text_message) {
    const sql =
      'INSERT INTO message (name, phone, email, subject, text_message) VALUES (?, ?, ?, ?, ?)'
    try {
      await db.query(sql, [name, phone, email, subject, text_message])
      console.log('Message record inserted')
      res.render('login')
    } catch (err) {
      console.error('Error inserting message into database:', err)
      res
        .status(500)
        .send(
          'An error occurred while submitting your message. Please try again later.'
        )
    }
  } else {
    console.log('Error: Missing required fields')
    res
      .status(400)
      .send('All fields are required. Please fill out the form completely.')
  }
})

// Members-only page
app.get('/membersOnly', async function (req, res) {
  if (req.session.loggedin) {
    try {
      const records = await db.query('SELECT * FROM users')
      res.render('membersOnly', { users: records })
    } catch (error) {
      console.error('Error reading from database:', error)
      res
        .status(500)
        .send(
          'An error occurred while retrieving user data. Please try again later.'
        )
    }
  } else {
    res.status(401).send('Please log in to view this page!')
  }
})

// About page
app.get('/about', function (req, res) {
  res.render('about')
})

// Contact page
app.get('/contact', function (req, res) {
  res.render('contact')
})

// Logout
app.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/')
})

// Start server
const PORT = 3000
function startServer(port) {
  app
    .listen(port, () => {
      console.log(`Node app is running on port ${port}`)
    })
    .on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.error(
          `Port ${port} is already in use. Trying a different port...`
        )
        startServer(port + 1)
      } else {
        console.error('An error occurred:', err)
      }
    })
}

if (require.main === module) {
  startServer(PORT)
}
module.exports = app
