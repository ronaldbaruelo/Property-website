const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const session = require('express-session')
const conn = require('./dbConfig')

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
app.get('/', function (req, res) {
  const query = 'SELECT * FROM listing ORDER BY listing_date DESC LIMIT 3'
  conn.query(query, function (err, result) {
    if (err) {
      console.error('Database error:', err)
      res.status(500).send('An error occurred. Please try again later.')
      return
    }
    const view = req.session.loggedin ? 'homeMember' : 'home'
    res.render(view, { title: 'Home', listingData: result })
  })
})

// Property listings
app.get('/listprop', function (req, res) {
  conn.query('SELECT * FROM listing', function (err, result) {
    if (err) {
      console.error('Database error:', err)
      res.status(500).send('An error occurred. Please try again later.')
      return
    }
    res.render('listprop', { title: 'Property Listings', listingData: result })
  })
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
app.post('/auth', function (req, res) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    console.log('Error: Missing email or password');
    return res.status(400).send('Please enter Email and Password!');
  }

  // Query to retrieve the user by email
  const sql = 'SELECT * FROM users WHERE email = ?';
  console.log('Executing SQL:', sql, [email]);

  conn.query(sql, [email], function (error, results) {
    if (error) {
      console.error('Database error:', error);
      return res.status(500).send('An error occurred. Please try again later.');
    }

    if (results.length > 0) {
      const user = results[0];

      // Compare the provided password with the hashed password in the database
      bcrypt.compare(password, user.password, function (err, isMatch) {
        if (err) {
          console.error('Error comparing passwords:', err);
          return res.status(500).send('An error occurred. Please try again later.');
        }

        if (isMatch) {
          // Set session variables for the logged-in user
          req.session.loggedin = true;
          req.session.email = email;
          console.log(`User ${email} logged in successfully.`);
          res.redirect('/membersOnly'); // Redirect to a protected page
        } else {
          console.log('Error: Invalid password');
          res.status(401).send('Incorrect Email and/or Password!');
        }
      });
    } else {
      console.log('Error: User not found');
      res.status(401).send('Incorrect Email and/or Password!');
    }
  });
});

// Contact form submission
app.post('/contact', function (req, res) {
  const { name, phone, email, subject, text_message } = req.body

  if (name && phone && email && subject && text_message) {
    const sql =
      'INSERT INTO message (name, phone, email, subject, text_message) VALUES (?, ?, ?, ?, ?)'
    conn.query(
      sql,
      [name, phone, email, subject, text_message],
      function (err) {
        if (err) {
          console.error('Error inserting message into database:', err)
          res
            .status(500)
            .send(
              'An error occurred while submitting your message. Please try again later.'
            )
          return
        }
        console.log('Message record inserted')
        res.render('login')
      }
    )
  } else {
    console.log('Error: Missing required fields')
    res
      .status(400)
      .send('All fields are required. Please fill out the form completely.')
  }
})

// Members-only page
app.get('/membersOnly', function (req, res) {
  if (req.session.loggedin) {
    conn.query('SELECT * FROM users', function (error, records) {
      if (error) {
        console.error('Error reading from database:', error)
        res
          .status(500)
          .send(
            'An error occurred while retrieving user data. Please try again later.'
          )
        return
      }
      res.render('membersOnly', { users: records })
    })
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

startServer(PORT)
