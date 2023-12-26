const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const { test } = require('@jest/globals');


const api = supertest(app)


test('Check that a new user with existing username wount be added', async () => {

    const newUser = {
        username: "Jypa",
        name: "Jyri",
        password: "salasana"

    }
    
    const response2 = await api
    .post('/api/users')
    .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ikp5cGEiLCJpZCI6IjY1ODgwYzlhMDQ3ODEzYzNkNzY4YzYwNiIsImlhdCI6MTcwMzU5ODAzNywiZXhwIjoxNzAzNjAxNjM3fQ.6mIsEowvsUM_GVUtLdMSRGjcgoIoWqeOsQEIMC1Z8tU')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', 'application/json; charset=utf-8');
    console.log('response2.body',response2.body.error)
    expect(response2.body.error).toBe("username already exists")

})

test('Check that username cant be too short', async () => {

    const newUser = {
        usernama: "Jy",
        name: "Jyri",
        password: "salasana"

    }

    const response2 = await api
    .post('/api/users')
    .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ikp5cGEiLCJpZCI6IjY1ODgwYzlhMDQ3ODEzYzNkNzY4YzYwNiIsImlhdCI6MTcwMzU5ODAzNywiZXhwIjoxNzAzNjAxNjM3fQ.6mIsEowvsUM_GVUtLdMSRGjcgoIoWqeOsQEIMC1Z8tU')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', 'application/json; charset=utf-8');
    console.log('response2.body',response2.body.error)
    expect(response2.body.error).toBe("invalid username or password")

})

