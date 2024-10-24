const fs = require('fs');
const path = require('path');
const db = require('../models/goalAppModels');
const { Pool } = require('pg');

jest.mock('pg', () => {
    const mPool = {
        query: jest.fn(),
    };
    return { Pool: jest.fn(() => mPool) };    
});



describe ('Database query function', async () => {
    let pool;

    beforeEach(() => {
        pool = new Pool();
    });

    const mockQuery = 'SELECT * FROM users WHERE id = $1';
    const mockParams = [1];
    const mockResponse = { rows: [{id : 1, username: '12345', email:'sunggukjung@gmail.com'}]};

    pool.query.mockReturnValueOnce(mockResponse);

    const result = await db.query(mockQuery, mockParams);

    
})