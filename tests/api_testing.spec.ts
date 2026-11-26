import { test, expect } from '@playwright/test';
import allUsers from '../test-data/reqres_users_response.json';
import singleUser from '../test-data/reqres_single_user.json';
import {
  DELETE_USER,
  GET_USERS,
  REGISTER_USER,
  SINGLE_USER,
  UPDATE_USER,
} from '../test-data/api_url_variables';

test.describe('Users API testing', () => {
  test('GET list of users', async ({ request }) => {
    const response = await request.get(GET_USERS);
    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body).toEqual(allUsers);
  });

  test('Get single user and check a fields', async ({ request }) => {
    const response = await request.get(SINGLE_USER);
    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body).toEqual(singleUser);
    expect(body.data.id).toBe(1);
    expect(body.data.email).toBe('george.bluth@reqres.in');
    expect(body.support.url).toBe('https://reqres.in/go/clerk');
  });

  test.skip('Register a new user', async ({ request }) => {
    const newUser = { email: 'eve.holt@reqres.in', password: 'pistol' };

    const response = await request.post(REGISTER_USER, {
      data: newUser,
      headers: {
        'x-api-key': '...',
        'Content-Type': 'application/json',
      },
    });

    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body.id).toBe(4);
  });

  test.skip('Update the exist user', async ({ request }) => {
    const updatedUserData = { name: 'morpheus', job: 'zion resident' };

    const response = await request.post(UPDATE_USER, {
      data: updatedUserData,
      headers: {
        'x-api-key': '...',
        'Content-Type': 'application/json',
      },
    });

    const body = await response.json();

    expect(response.status()).toBe(201);
    expect(body.name).toBe(updatedUserData.name);
    expect(body.job).toBe(updatedUserData.job);
  });

  test('Delete a user', async ({ request }) => {
    const response = await request.delete(DELETE_USER);

    expect(response.status()).toBe(204);
  });
});
