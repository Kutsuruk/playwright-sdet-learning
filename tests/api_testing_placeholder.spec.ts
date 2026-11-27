import { test, expect, request } from '@playwright/test';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const newPost: Post = {
  userId: 2000,
  id: 101,
  title: 'Test string',
  body: 'Test string',
};

test.describe('Practise task for API testing of  jsonplaceholder', () => {
  test('Get post', async ({ request }) => {
    const response = await request.get('/posts/1');
    const body = await response.json();
    const headers = response.headers();

    console.log(body);
    console.log(response);

    expect(response.status()).toBe(200);
    expect(headers['content-type']).toContain('application/json');
    expect(body).toMatchObject({
      userId: 1,
      id: 1,
      title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
      body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
    });
  });

  test('Get posts of first user', async ({ request }) => {
    const response = await request.get('/posts', { params: { userId: 1 } });
    const posts: Post[] = await response.json();

    expect(posts.length).toBeGreaterThan(0);
    expect(posts.every((post) => post.userId === 1)).toBe(true);
  });

  test('Post a post', async ({ request }) => {
    const response = await request.post('/posts', {
      data: newPost,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const body = await response.json();

    expect(response.status()).toBe(201);
    expect(body.userId).toEqual(newPost.userId);
    expect(body.id).toEqual(newPost.id);
    expect(body.title).toEqual(newPost.title);
    expect(body.body).toEqual(newPost.body);
  });

  test('Update a post', async ({ request }) => {
    const response = await request.put('/posts/1', {
      data: {
        userId: 1,
        id: 1,
        title: 'New title',
        body: 'New body',
      },
    });

    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body.title).toBe('New title');
  });

  test('Delete a post', async ({ request }) => {
    const response = await request.delete('/posts/1');

    expect(response.status()).toBe(200);
  });
});
