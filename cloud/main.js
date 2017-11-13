
var due = require('kue')
var redisUrl = process.env.REDIS_URL
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