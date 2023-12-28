describe('Blog ', function() {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Jyri Pappinen',
      username: 'Jypa',
      password: 'salainen'
    }
    const user2 = {
      name: 'Jyri Pappinen testi',
      username: 'JypaTest',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user) 
    cy.request('POST', 'http://localhost:3001/api/users/', user2) 
    cy.visit('http://localhost:5173')
  })
  it('Login form is shown', function() {
    cy.visit('http://localhost:5173')
    cy.contains('Log in to application')
    cy.contains('log in').click()
  })
})

describe('When logged in', function() {
  it('front page can be opened', function() {
    cy.visit('http://localhost:5173')
    cy.contains('Log in to application')
    cy.contains('log in').click()
    cy.get('input.username').type('Jypa')
    cy.get('input.password').type('salainen');
    cy.contains('login').click()

  })
  it('login fails with wrong password', function() {
    cy.visit('http://localhost:5173')
    cy.contains('Log in to application')
    cy.contains('log in').click()
    cy.get('input.username').type('Jypa')
    cy.get('input.password').type('wrong');
    cy.contains('login').click()
    cy.contains('wrong credentials')
  })
  it('A blog can be created', function() {
    cy.visit('http://localhost:5173')
    cy.contains('Log in to application')
    cy.contains('log in').click()
    cy.get('input.username').type('Jypa')
    cy.get('input.password').type('salainen');
    cy.contains('login').click()
    cy.contains('create new').click()
    cy.contains('create new').click()
    cy.get('input.title').type('Test Title')
    cy.get('input.author').type('Test Author')
    cy.get('input.url').type('http://example.com')
    cy.get('button.create').click()
  })
  it('A blog can be liked', function() {
    cy.visit('http://localhost:5173')
    cy.contains('Log in to application')
    cy.contains('log in').click()
    cy.get('input.username').type('Jypa')
    cy.get('input.password').type('salainen');
    cy.contains('login').click()
    cy.contains('create new').click()
    cy.contains('create new').click()
    cy.get('input.title').type('Test Title')
    cy.get('input.author').type('Test Author')
    cy.get('input.url').type('http://example.com')
    cy.contains('Show').click()
    cy.contains('vote').click()
  })
  it('A blog can be liked and remove button is only showed for blog owner', function() {
    cy.visit('http://localhost:5173')
    cy.contains('Log in to application')
    cy.contains('log in').click()
    cy.get('input.username').type('Jypa')
    cy.get('input.password').type('salainen');
    cy.contains('login').click()
    cy.contains('create new').click()
    cy.contains('create new').click()
    cy.get('input.title').type('Test Title')
    cy.get('input.author').type('Test Author')
    cy.get('input.url').type('http://example.com')
    cy.contains('Show').click()
    cy.contains('Remove')
    cy.contains('logout').click()
    cy.contains('log in').click()
    cy.get('input.username').type('JypaTest')
    cy.get('input.password').type('salainen');
    cy.contains('login').click()
    cy.contains('Show').click()
    cy.contains('Remove').should('not.exist')
  })
})

describe('Sorting', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Jyri Pappinen',
      username: 'Jypa',
      password: 'salainen'
    }
    const user2 = {
      name: 'Jyri Pappinen testi',
      username: 'JypaTest',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user) 
    cy.request('POST', 'http://localhost:3001/api/users/', user2) 
    cy.visit('http://localhost:5173')
  })
  it('Sort blogs by likes', function() {
    cy.visit('http://localhost:5173');
    cy.contains('Log in to application');
    cy.contains('log in').click();
    cy.get('input.username').type('Jypa');
    cy.get('input.password').type('salainen');
    cy.contains('login').click();
    cy.contains('create new').click();
    cy.contains('create new').click();
    cy.get('input.title').type('Test Title1');
    cy.get('input.author').type('Test Author');
    cy.get('input.url').type('http://example.com');
    cy.get('button.create').click();
    cy.contains('Show').click();
    cy.contains('vote').click();
    cy.contains('create new').click();
    cy.get('input.title').type('Test Title2');
    cy.get('input.author').type('Test Author2');
    cy.get('input.url').type('http://example.com');
    cy.get('button.create').click();
    cy.contains('Show').click();
    cy.contains('vote').click();
    cy.contains('create new').click();
    cy.get('input.title').type('Test Title3');
    cy.get('input.author').type('Test Author3');
    cy.get('input.url').type('http://example.com');
    cy.get('button.create').click();
    cy.contains('Show').click();
    cy.contains('vote').click();
    cy.contains('create new').click();
    cy.get('input.title').type('Test Title4');
    cy.get('input.author').type('Test Author4');
    cy.get('input.url').type('http://example.com');
    cy.get('button.create').click();
    cy.contains('Show').click();
    cy.contains('vote').click();
    cy.contains('create new').click();
    cy.get('input.title').type('Test Title5');
    cy.get('input.author').type('Test Author5');
    cy.get('input.url').type('http://example.com');
    cy.get('button.create').click();
    cy.contains('Show').click();
    cy.get('.vote').eq(3).click();
    cy.get('.blog').eq(0).should('contain', 'Test Title1')
    cy.get('.blog').eq(1).should('contain', 'Test Title4')
  })
})

