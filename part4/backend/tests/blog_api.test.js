const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const { test } = require('@jest/globals');
const e = require('express');
const exp = require('constants');

const api = supertest(app)



test('blogs are returned as json', async () => {
  const response = await api
    .get('/api/blogs')
    .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ikp5cGEiLCJpZCI6IjY1ODgwYzlhMDQ3ODEzYzNkNzY4YzYwNiIsImlhdCI6MTcwMzQyMzk5MiwiZXhwIjoxNzAzNDI3NTkyfQ.33Xin9-0K4vxnTndzLagBoD258aTZxAfkKPI8FDwOaQ')
    .expect(200)
    .expect('Content-Type', 'application/json; charset=utf-8')
  console.log('test',response.body)
})

test('Check that returned blogs have id not __id', async () => {   
    const response = await api
    .get('/api/blogs')
    .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ikp5cGEiLCJpZCI6IjY1ODgwYzlhMDQ3ODEzYzNkNzY4YzYwNiIsImlhdCI6MTcwMzQyMzk5MiwiZXhwIjoxNzAzNDI3NTkyfQ.33Xin9-0K4vxnTndzLagBoD258aTZxAfkKPI8FDwOaQ')
    .expect(200)
    .expect('Content-Type', 'application/json; charset=utf-8')
    expect(response.body[0].id).toBeDefined()    
})

test('Check that a new blog is added', async () => {
    const response = await api
    .get('/api/blogs')
    .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ikp5cGEiLCJpZCI6IjY1ODgwYzlhMDQ3ODEzYzNkNzY4YzYwNiIsImlhdCI6MTcwMzQyMzk5MiwiZXhwIjoxNzAzNDI3NTkyfQ.33Xin9-0K4vxnTndzLagBoD258aTZxAfkKPI8FDwOaQ')


    const newBlog = {
        title: "test",
        author: "test",
        url: "test",
        likes: 1
    }
    const response2 = await api
    .post('/api/blogs')
    .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ikp5cGEiLCJpZCI6IjY1ODgwYzlhMDQ3ODEzYzNkNzY4YzYwNiIsImlhdCI6MTcwMzQyMzk5MiwiZXhwIjoxNzAzNDI3NTkyfQ.33Xin9-0K4vxnTndzLagBoD258aTZxAfkKPI8FDwOaQ')

    .send(newBlog)
    .expect(201)
    .expect('Content-Type', 'application/json; charset=utf-8');

    expect(response2.body.title).toBe("test")
    expect(response2.body.author).toBe("test")
    expect(response2.body.url).toBe("test")
    expect(response2.body.likes).toBe(1)

    const response3 = await api
    .get('/api/blogs')
    .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ikp5cGEiLCJpZCI6IjY1ODgwYzlhMDQ3ODEzYzNkNzY4YzYwNiIsImlhdCI6MTcwMzQyMzk5MiwiZXhwIjoxNzAzNDI3NTkyfQ.33Xin9-0K4vxnTndzLagBoD258aTZxAfkKPI8FDwOaQ')

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
    .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ikp5cGEiLCJpZCI6IjY1ODgwYzlhMDQ3ODEzYzNkNzY4YzYwNiIsImlhdCI6MTcwMzQyMzk5MiwiZXhwIjoxNzAzNDI3NTkyfQ.33Xin9-0K4vxnTndzLagBoD258aTZxAfkKPI8FDwOaQ')
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
    .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ikp5cGEiLCJpZCI6IjY1ODgwYzlhMDQ3ODEzYzNkNzY4YzYwNiIsImlhdCI6MTcwMzQyMzk5MiwiZXhwIjoxNzAzNDI3NTkyfQ.33Xin9-0K4vxnTndzLagBoD258aTZxAfkKPI8FDwOaQ')

    .send(newBlog)
    .expect(400)

    expect(response2.body.error).toBe('bad request');
})


test('Check that it will delete a blog', async () => {

    const newBlog = {
        title: "testaaja",
        author: "testaaja",
        url: "testaaja",
        likes: 1
    }
    const response2 = await api
    .post('/api/blogs')
    .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ikp5cGEiLCJpZCI6IjY1ODgwYzlhMDQ3ODEzYzNkNzY4YzYwNiIsImlhdCI6MTcwMzQyMzk5MiwiZXhwIjoxNzAzNDI3NTkyfQ.33Xin9-0K4vxnTndzLagBoD258aTZxAfkKPI8FDwOaQ')
    .send(newBlog)

    const id = response2.body.id

    const response3 = await api
    .delete(`/api/blogs/${id}`)
    .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ikp5cGEiLCJpZCI6IjY1ODgwYzlhMDQ3ODEzYzNkNzY4YzYwNiIsImlhdCI6MTcwMzQyMzk5MiwiZXhwIjoxNzAzNDI3NTkyfQ.33Xin9-0K4vxnTndzLagBoD258aTZxAfkKPI8FDwOaQ')
    .expect(204)
})


test('Check that it will update a blog', async () => {

    const newBlog = {
        title: "testaaja",
        author: "testaaja",
        url: "testaaja",
        likes: 1
    }
    const response2 = await api
    .post('/api/blogs')
    .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ikp5cGEiLCJpZCI6IjY1ODgwYzlhMDQ3ODEzYzNkNzY4YzYwNiIsImlhdCI6MTcwMzQyMzk5MiwiZXhwIjoxNzAzNDI3NTkyfQ.33Xin9-0K4vxnTndzLagBoD258aTZxAfkKPI8FDwOaQ')

    .send(newBlog)

    const id = response2.body.id

    const updateBlog = {
        likes: 2,
    }

    const response3 = await api
    .patch(`/api/blogs/${id}`)
    .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ikp5cGEiLCJpZCI6IjY1ODgwYzlhMDQ3ODEzYzNkNzY4YzYwNiIsImlhdCI6MTcwMzQyMzk5MiwiZXhwIjoxNzAzNDI3NTkyfQ.33Xin9-0K4vxnTndzLagBoD258aTZxAfkKPI8FDwOaQ')
    .send(updateBlog)
    .expect(204)

    const response4 = await api
    .get(`/api/blogs/${id}`)
    .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ikp5cGEiLCJpZCI6IjY1ODgwYzlhMDQ3ODEzYzNkNzY4YzYwNiIsImlhdCI6MTcwMzQyMzk5MiwiZXhwIjoxNzAzNDI3NTkyfQ.33Xin9-0K4vxnTndzLagBoD258aTZxAfkKPI8FDwOaQ')
    expect(response4.body.likes).toBe(2)
    
})

afterAll(async () => {
  await mongoose.connection.close()
})