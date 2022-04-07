const testUser = { username: 'thokkk', password: 'password' };
const testUser2 = { username: 'mukkun', password: 'password' };
const testBlog = {
  title: 'Battle',
  author: 'Thokk',
  url: 'www.battlebeast.com/battle',
  likes: 50,
};
const testBlog2 = {
  title: 'Blood',
  author: 'Thokk',
  url: 'www.battlebeast.com/blood',
  likes: 150,
};
const testBlog3 = {
  title: 'Maces',
  author: 'Thokk',
  url: 'www.battlebeast.com/maces',
  likes: 250,
};

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    cy.request('POST', 'http://localhost:3003/api/users', testUser);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.get('#login-form');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type(testUser.username);
      cy.get('#password').type(testUser.password);
      cy.get('#login-btn').click();
      cy.get('.success');
    });

    it('fails with wrong credentials', function () {
      cy.get('#username').type('no');
      cy.get('#password').type('no');
      cy.get('#login-btn').click();
      cy.get('.err')
        .should('contain', 'invalid')
        .and('have.css', 'color', 'rgb(255, 0, 0)');
      cy.get('html').should('not.contain', 'logged in');
    });
  });
});
describe('When logged in', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    cy.request('POST', 'http://localhost:3003/api/users', testUser);
    cy.login(testUser);
  });
  describe('A blog can be created', function () {
    it('creates new post', function () {
      cy.contains('New Post').click();
      cy.get('#title').type(testBlog.title);
      cy.get('#author').type(testBlog.author);
      cy.get('#url').type(testBlog.url);
      cy.get('#post-btn').click();
      cy.get('html').should('contain', 'Blog added');
      cy.get('.blog-post').contains(testBlog.title);
    });
  });
});
describe('Blog Post Events', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    cy.request('POST', 'http://localhost:3003/api/users', testUser);
    cy.request('POST', 'http://localhost:3003/api/users', testUser2);
    cy.login(testUser);
    cy.createBlog(testBlog);
    cy.createBlog(testBlog2);
    cy.createBlog(testBlog3);
    cy.visit('http://localhost:3000');
  });
  it('likes a post', function () {
    cy.get('.view-btn:first').click();
    cy.get('.like-btn:first').click();
    cy.get('.success').should('contain', 'liked');
    cy.get('.likes:first').should('contain', '1');
  });
  it('deletes a post', function () {
    cy.get('.view-btn:first').click();
    cy.get('.delete-btn:first').click();
    cy.get('.success').should('contain', 'removed');
    cy.get('html').should('not.contain', testBlog3.title);
  });
  it('should fail to delete another users post', function () {
    cy.login(testUser2);
    cy.get('.view-btn:first').click();
    cy.get('.delete-btn:first').click();
    cy.get('.err');
    cy.get('html').should('contain', testBlog.title);
  });
  it('should sort posts according to most liked', function () {
    const blogs = [testBlog3, testBlog2, testBlog];
    cy.visit('http://localhost:3000');
    cy.get('.blog-post').each((post, id) => {
      cy.wrap(post).should('contain', blogs[id].title);
    });
  });
});
