import { expect } from 'chai';
import supertest from 'supertest'
import app from '../../app'
let newlycreateduser;

// describe('POST USER /user', () => {
//     const endpoint = '/v1/auth/signup';
// 	const request = supertest(app);
//     it('should create a new user', (done) => {
//       const user = {
//         firstname: 'kleventh',
//         email: 'test@user.com',
//         lastname: 'Jonji',
//         password: 'pas',
//       };
//       request
//         .post('/v1/auth/signup')
//         .send(user)
//         .end((err, res) => {
//           newlycreateduser = res.body.user;
//           expect(res.status).to.eql(200);
//           expect(res.body.message).to.equal('User has been registered');
//           expect(res.body).to.be.a('object');
//           done();
//         });
//     })
// })


describe('POST /api/v1/auth/signup', () => {
    const endpoint = '/v1/auth/signup';
    const request = supertest(app);
    const userData = {
        firstname: 'kleventh',
        email: 'test@user.com',
        lastname: 'Jonji',
        password: 'pas',
      };
    it('It Should create user one with right signup details', (done) => {
        request
            .post(`${endpoint}`)
            .send(userData)
            .end((err, res) => {
                try {
                    if (err) throw err;

                    const { message, status, user } = res.body;
                    expect(res.status).to.eql(201);
                    expect(status).to.equal('success');
                    expect(status).to.equal(200);
                    expect(res).to.have.property('user');
                    expect(user.id).to.equal(1);
                    expect(user.firstName).to.equal(userData.firstname);
                    expect(user.lastName).to.equal(userData.lastname);
                    expect(user.email).to.equal(userData.email);
                    expect(user.role).to.equal('user');
                    return done();
                } catch (err) {
                    return done(err);
                }
            })
        })
    })