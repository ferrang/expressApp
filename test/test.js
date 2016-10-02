let chai = require('chai');
let expect = chai.expect;
let chaiHttp = require('chai-http');
chai.use(chaiHttp);

let server = require('../app');

describe('Users endpoint', () => {
    it("should return name and user type in json format", function(done) {
        chai
            .request(server)
            .get("/users/:name")
            .end(function(err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.be.an("object");
                expect(res.body).to.have.property("role");
                expect(res.body).to.have.property("name");
                done();
        });
    });
    after(done => {
        console.log("Users endpoint fully tested!");
        done();
    });
});

describe('Posts endpoint', () => {
    it("should return OK for user 1", done => {
        chai
            .request(server)
            .get("/posts/1")
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });
    it("should return KO for /posts", done => {
        chai
            .request(server)
            .get("/posts")
            .end((err, res) => {
                expect(err).to.not.be.null;
                //expect(res).to.not.have.status(200);
                expect(res).to.have.status(404);
                done();
            });
    });
    after(done => {
        console.log("Posts endpoint fully tested!");
        done();
    });
});