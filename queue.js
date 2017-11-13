var kue = require('kue')
var redisUrl = process.env.REDIS_URL
var jobs = kue.createQueue({ redis: redisUrl })

var Parse = require('parse/node')
Parse.initialize('myMasterKey')
Parse.serverURL = 'https://shared-cloud-server.herokuapp.com/parse'

/**
 * Process the job for ending a round after 24h
*/
jobs.process('roundExpired', function (job, done) {
    // Your parse related code and when finished (in save callback for instance):
       done()
})