const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const { test } = require('@jest/globals');
const e = require('express')

const api = supertest(app)


test('blogs are returned as json', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', 'application/json; charset=utf-8')
  console.log('test',response.body)
})

test('Check that returned blogs have id not __id', async () => {   
    const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', 'application/json; charset=utf-8')
    expect(response.body[0].id).toBeDefined()    
})

test('Check that a new blog is added', async () => {
    const response = await api
    .get('/api/blogs')


    const newBlog = {
        title: "test",
        author: "test",
        url: "test",
        likes: 1
    }
    const response2 = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', 'application/json; charset=utf-8');

    expect(response2.body.title).toBe("test")
    expect(response2.body.author).toBe("test")
    expect(response2.body.url).toBe("test")
    expect(response2.body.likes).toBe(1)

    const response3 = await api
    .get('/api/blogs')
    expect(response3.body.length).toBe(response.body.length + 1)

})

test('Check that a new blog is added with likes 0 if not defined', async () => {
    
    const newBlog = {
        title: "test",
        author: "test",
        url: "test"  
    }

    const response2 = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', 'application/json; charset=utf-8');

    expect(response2.body.likes).toBe(0)

})

test('Check that it wount post blog without author or url', async () => {
    
    const newBlog = {
        author: "test",
        url: "test"  
    }

    const response2 = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    
    expect(response2.body.error).toBe('bad request');


})

afterAll(async () => {
  await mongoose.connection.close()
})