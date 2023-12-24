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
    .send(newUser)
    .expect(400)
    .expect('Content-Type', 'application/json; charset=utf-8');
    console.log('response2.body',response2.body.error)
    expect(response2.body.error).toBe("invalid username or password")

})