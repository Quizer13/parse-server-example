
var kue = require('kue')
var redisUrl = 'redis://h:p87c0b6cacd9ee92c2a768c58f97a7560e802b2f8c2c537da61fcd01e225928e2@ec2-34-252-120-111.eu-west-1.compute.amazonaws.com:11029'
var jobs = kue.createQueue({ redis: redisUrl })

Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});

/**
 * Create the job for expiring round after 24h
*/
function createRoundExpiredJob(round) {
  jobs.create('roundExpired', {
      objectId: round.id
  })
  .removeOnComplete(true)
  .delay(round.createdAt.addADay())
  .save()
}