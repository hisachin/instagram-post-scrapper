//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
import mongoose from 'mongoose';
import chai from 'chai';
import chaiHttp from 'chai-http';
let should = chai.should();
let server = require('../index');

let ScrapeModel = require('../app/models/scrapedSchema');



chai.use(chaiHttp);
//Our parent block
describe('Scrape', () => {
    beforeEach((done) => { //Before each test we empty the database
        ScrapeModel.remove({}, (err) => { 
           done();           
        });        
    });
    
    /*
    * Test the /POST route
    */
    describe('/POST scrape', () => {
        it('it should not POST a Scrape without pages field', (done) => {
            let scrape = {
                url: "https://www.instagram.com/p/B81N6t1D3M_/",
            }
        chai.request(server)
            .post('/api/scrape')
            .send(scrape)
            .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    res.body.errors.should.have.property('pages');
                    res.body.errors.pages.should.have.property('kind').eql('required');
                done();
            });
        });
    });

    /*
    * Test the /DELETE/:id route
    */
    describe('/DELETE/:id scrape', () => {
        it('it should DELETE a url given the id', (done) => {
            let scrape = new ScrapeModel({url: "test.com"})
            scrape.save((err, book) => {
                chai.request(server)
                .delete('/api/scrape/' + scrape.id)
                .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('URL successfully deleted!');
                        res.body.result.should.have.property('ok').eql(1);
                        res.body.result.should.have.property('n').eql(1);
                    done();
                });
            });
        });
    });
});