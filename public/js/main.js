const date = new Date()
document.querySelector('.year').innerHTML = date.getFullYear()
// Get the modal
var modal = document.getElementById('myModal')

// Get the button that opens the modal
var btn = document.getElementById('myBtn')

// Get the <span> element that closes the modal
var span = document.getElementsByClassName('close')[0]

// When the user clicks the button, open the modal
btn.onclick = function () {
  modal.style.display = 'block'
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = 'none'
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none'
  }
}

//const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');

allSideMenu.forEach((item) => {
  const li = item.parentElement

  item.addEventListener('click', function () {
    allSideMenu.forEach((i) => {
      i.parentElement.classList.remove('active')
    })
    li.classList.add('active')
  })
})

// TOGGLE SIDEBAR
const menuBar = document.querySelector('#content nav .bx.bx-menu')
const sidebar = document.getElementById('sidebar')

// Sidebar toggle işlemi
menuBar.addEventListener('click', function () {
  sidebar.classList.toggle('hide')
})

// Adjusting sidebar state on page load and size changes
function adjustSidebar() {
  if (window.innerWidth <= 576) {
    sidebar.classList.add('hide') //Sidebar hidden for 576px and below
    sidebar.classList.remove('show')
  } else {
    sidebar.classList.remove('hide') // If it is larger than 576px, the sidebar will be visible.
    sidebar.classList.add('show')
  }
}

// Set sidebar state when page loads and window size changes
window.addEventListener('load', adjustSidebar)
window.addEventListener('resize', adjustSidebar)

// Arama butonunu toggle etme
const searchButton = document.querySelector(
  '#content nav form .form-input button'
)
const searchButtonIcon = document.querySelector(
  '#content nav form .form-input button .bx'
)
const searchForm = document.querySelector('#content nav form')

searchButton.addEventListener('click', function (e) {
  if (window.innerWidth < 768) {
    e.preventDefault()
    searchForm.classList.toggle('show')
    if (searchForm.classList.contains('show')) {
      searchButtonIcon.classList.replace('bx-search', 'bx-x')
    } else {
      searchButtonIcon.classList.replace('bx-x', 'bx-search')
    }
  }
})

// Dark Mode Switch
const switchMode = document.getElementById('switch-mode')

switchMode.addEventListener('change', function () {
  if (this.checked) {
    document.body.classList.add('dark')
  } else {
    document.body.classList.remove('dark')
  }
})

// Notification Menu Toggle
document.querySelector('.notification').addEventListener('click', function () {
  document.querySelector('.notification-menu').classList.toggle('show')
  document.querySelector('.profile-menu').classList.remove('show') // Close profile menu if open
})

// Profile Menu Toggle
document.querySelector('.profile').addEventListener('click', function () {
  document.querySelector('.profile-menu').classList.toggle('show')
  document.querySelector('.notification-menu').classList.remove('show') // Close notification menu if open
})

// Close menus if clicked outside
window.addEventListener('click', function (e) {
  if (!e.target.closest('.notification') && !e.target.closest('.profile')) {
    document.querySelector('.notification-menu').classList.remove('show')
    document.querySelector('.profile-menu').classList.remove('show')
  }
})

// Menülerin açılıp kapanması için fonksiyon
function toggleMenu(menuId) {
  var menu = document.getElementById(menuId)
  var allMenus = document.querySelectorAll('.menu')

  // Diğer tüm menüleri kapat
  allMenus.forEach(function (m) {
    if (m !== menu) {
      m.style.display = 'none'
    }
  })

  // Tıklanan menü varsa aç, yoksa kapat
  if (menu.style.display === 'none' || menu.style.display === '') {
    menu.style.display = 'block'
  } else {
    menu.style.display = 'none'
  }
}

// Başlangıçta tüm menüleri kapalı tut
document.addEventListener('DOMContentLoaded', function () {
  var allMenus = document.querySelectorAll('.menu')
  allMenus.forEach(function (menu) {
    menu.style.display = 'none'
  })
})
