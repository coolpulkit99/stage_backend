// list.test.js
require("dotenv").config();

const request = require("supertest");

const app = require('../../index');

const requestInstance = request(app);

const { User, Movie, TvShow, UserList } = require('../../db/models/index');
const { CONTENT_TYPES } = require("../utils/enums");
const { fetchUserListContent } = require("../services/list.services");

const { v4: uuidv4 } = require('uuid');


beforeAll(async () => { 
    user = await User.create({ username: 'tempuser' });
});

describe("Get content list : GET /api/list/fetch", () => {
    it("Test: Should return all movies added to user list", async () => {

        const movie = await Movie.create({
            title: 'test Movie 1',
            description: 'test description 1',
        });
        const tv = await TvShow.create({
            title: 'test Movie 1',
            description: 'test description 1',
        });

        await requestInstance.post("/api/list/add")
            .send({
                "content_id": `${movie.id}`,
                "content_type": CONTENT_TYPES.MOVIE
            })
            .set('Authorization', `{"id":"${user.id}"}`)

        await requestInstance.post("/api/list/add")
            .send({
                "content_id": `${tv.id}`,
                "content_type": CONTENT_TYPES.TV
            })
            .set('Authorization', `{"id":"${user.id}"}`)

        const res = await requestInstance
            .get("/api/list/fetch?content_type=MOVIE&limit=50&page=1")
            .set('Authorization', `{"id":"${user.id}"}`)

        expect(res.statusCode).toBe(200);
        expect(res.body.data).not.toBe(undefined);
        expect(res.body.data.userList).not.toBe(undefined);
        expect(res.body.data.userList.length).toBeGreaterThan(0);
    });
    it("Test: Should return all tv show added to user list", async () => {
        const res = await requestInstance
            .get("/api/list/fetch?content_type=TV&limit=50&page=1")
            .set('Authorization', `{"id":"${user.id}"}`)

        expect(res.statusCode).toBe(200);
        expect(res.body.data).not.toBe(undefined);
        expect(res.body.data.userList).not.toBe(undefined);
        expect(res.body.data.userList.length).toBeGreaterThan(0);
    });
});



describe("Add content to user list : POST /api/list/add", () => {
    it("Test: Add content to user list", async () => {

        const movie = await Movie.create({
            title: 'test Movie 1',
            description: 'test description 1',
        });
        const tv = await TvShow.create({
            title: 'test Movie 1',
            description: 'test description 1',
        });

        const resMovie = await requestInstance.post("/api/list/add")
            .send({
                "content_id": `${movie.id}`,
                "content_type": CONTENT_TYPES.MOVIE
            })
            .set('Authorization', `{"id":"${user.id}"}`)

        const resTv = await requestInstance.post("/api/list/add")
            .send({
                "content_id": `${tv.id}`,
                "content_type": CONTENT_TYPES.TV
            })
            .set('Authorization', `{"id":"${user.id}"}`)

        expect(resMovie.statusCode).toBe(200);
        expect(resTv.statusCode).toBe(200);
    });

    it("Test: Add content already in user list", async () => {

        const movie = await Movie.create({
            title: 'test Movie 1',
            description: 'test description 1',
        });
        await requestInstance.post("/api/list/add")
            .send({
                "content_id": `${movie.id}`,
                "content_type": CONTENT_TYPES.MOVIE
            })
            .set('Authorization', `{"id":"${user.id}"}`)

        const res = await requestInstance.post("/api/list/add")
            .send({
                "content_id": `${movie.id}`,
                "content_type": CONTENT_TYPES.MOVIE
            })
            .set('Authorization', `{"id":"${user.id}"}`)


        expect(res.statusCode).toBe(409);
    });

    it("Test: Add invalid content type to user list", async () => {

        const res = await requestInstance.post("/api/list/add")
            .send({
                "content_id": "e4db01c0-558f-4852-ac98-d1438c5b9470",
                "content_type": "INVALID"
            })
            .set('Authorization', `{"id":"${user.id}"}`)


        expect(res.statusCode).toBe(400);
    });
});


describe("Delete content from list : DELETE /api/list/delete", () => {
    it("Test: Delete content from user list", async () => {
        const movie = await Movie.create({
            title: 'test Movie 1',
            description: 'test description 1',
        });
        await requestInstance.post("/api/list/add")
            .send({
                "content_id": `${movie.id}`,
                "content_type": CONTENT_TYPES.MOVIE
            })
            .set('Authorization', `{"id":"${user.id}"}`)

        const res = await requestInstance.delete("/api/list/delete")
            .send({
                "content_id": `${movie.id}`,
                "content_type": CONTENT_TYPES.MOVIE
            })
            .set('Authorization', `{"id":"${user.id}"}`)


        expect(res.statusCode).toBe(200);
    });
});


describe("List services", () => {
    test("Test: fetchUserListContent : Item is in user list", async () => {
        const movie = await Movie.create({
            title: 'test Movie 1',
            description: 'test description 1',
        });

        await UserList.create({
            user_id: user.id,
            movie_id: movie.id,
            content_type: CONTENT_TYPES.MOVIE
        });

        const userListContent = await fetchUserListContent(user.id, movie.id, CONTENT_TYPES.MOVIE);

        expect(userListContent).not.toBe(undefined);
    });
    test("Test: fetchUserListContent : Item is NOT in user list", async () => {
        const movie = await Movie.create({
            title: 'test Movie 1',
            description: 'test description 1',
        });

        const userListContent = await fetchUserListContent(user.id, movie.id, CONTENT_TYPES.MOVIE);

        expect(userListContent).toBe(null);
    });

    test("Test: fetchUserListContent : Content doesn't exist", async () => {
        try {
            const userListContent = await fetchUserListContent(user.id, uuidv4(), CONTENT_TYPES.MOVIE);
        } catch (e) {
            expect(e.status).toBe(404);
        }
    });


});