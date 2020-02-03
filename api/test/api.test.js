'use strict';
const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../main');
const logger = require('../utils/logger')

describe('testing all the rest apis', () => {

    it('get and post behavior check', (done) => {
        const requestBody = {
            longUrl: 'http://www.amazon.com/Kindle-Wireless-Reading-Display-Globally/dp/B003FSUDM4/ref=amb_link_353259562_2?pf_rd_m=ATVPDKIKX0DER&pf_rd_s=center-10&pf_rd_r=11EYKTN682A79T370AM3&pf_rd_t=201&pf_rd_p=1270985982&pf_rd_i=B002Y27P3M',
        }

        request(app)
            .post('/url/')
            .send(requestBody)
            .end((err, urlPostResponse) => {
                const shortUrl = JSON.parse(JSON.stringify(urlPostResponse.body)).body;
                logger.info('successfully logged in post ' + shortUrl);

                request(app)
                    .get('/url/' + shortUrl)
                    .end((err, urlGetResponse) => {
                        expect(urlPostResponse.statusCode).to.equal(200);
                        expect(urlGetResponse.statusCode).to.equal(302);
                        expect(urlGetResponse.text, "Found. Redirecting to http://www.amazon.com/Kindle-Wireless-Reading-Display-Globally/dp/B003FSUDM4/ref=amb_link_353259562_2?pf_rd_m=ATVPDKIKX0DER&pf_rd_s=center-10&pf_rd_r=11EYKTN682A79T370AM3&pf_rd_t=201&pf_rd_p=1270985982&pf_rd_i=B002Y27P3M");
                        logger.info('a;ll passed ' + shortUrl);
                        done();
                    })

            })

    }).timeout(10000)

})
