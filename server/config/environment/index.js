'use strict';

var path = require('path');
var _ = require('lodash');

function requiredProcessEnv(name) {
  if(!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }
  return process.env[name];
}

// All configurations will extend these options
// ============================================
var all = {
  env: process.env.NODE_ENV,

  // Root path of server
  root: path.normalize(__dirname + '/../../..'),

  // Server port
  port: process.env.PORT || 9000,

  // Attendance verification ratio
  attendanceVerificationRatio: .1,

  // Github API Info
  // Client ID
  githubClientId: process.env.GITHUBCLIENTID || '',

  // Client Secret
  githubClientSecret: process.env.GITHUBCLIENTSECRET || '',

  // Location of image uploads
  imageUploadPath: './uploads/',

  // Should we populate the DB with sample data?
  seedDB: false,

  serverEmail: process.env.SERVER_EMAIL || "test@example.com",

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: 'observatory3-secret'
  },

  // Sendgrid API key for sending emails
  sendgridApiKey: process.env.SENDGRID_API_KEY || '',

  // List of user roles
  userRoles: ['guest', 'user', 'admin'],

  // MongoDB connection options
  mongo: {
    options: {
      db: {
        safe: true
      }
    }
  },

};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
  all,
  require('./' + process.env.NODE_ENV + '.js') || {});
