const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../main');
const logger = require('../utils/logger')

describe('testing all the rest apis', () => {

    it('get and post behavior check', async () => {
        const requestBody = {
            longUrl: 'http://www.amazon.com/Kindle-Wireless-Reading-Display-Globally/dp/B003FSUDM4/ref=amb_link_353259562_2?pf_rd_m=ATVPDKIKX0DER&pf_rd_s=center-10&pf_rd_r=11EYKTN682A79T370AM3&pf_rd_t=201&pf_rd_p=1270985982&pf_rd_i=B002Y27P3M',
        }
        const urlPostResponse = await request(app).post('/url/').send(requestBody);
        logger.info(urlPostResponse)
        expect(urlPostResponse.status).to.be.equal(200);

        const shortUrl = JSON.parse(JSON.stringify(urlPostResponse.body)).body;
        logger.info('successfully logged in post '+ shortUrl);

        const urlGetResponse = await request(app).get('/url/'+shortUrl).send();
        logger.info('successfully logged in get '+JSON.stringify(urlGetResponse));

        expect(urlGetResponse.status).to.be.equal(302);
        expect(urlGetResponse.text).to.be.equal("Found. Redirecting to http://www.amazon.com/Kindle-Wireless-Reading-Display-Globally/dp/B003FSUDM4/ref=amb_link_353259562_2?pf_rd_m=ATVPDKIKX0DER&pf_rd_s=center-10&pf_rd_r=11EYKTN682A79T370AM3&pf_rd_t=201&pf_rd_p=1270985982&pf_rd_i=B002Y27P3M");
    })
})
