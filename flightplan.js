var plan = require('flightplan');
var format = require('util').format;
var argv = require('yargs').argv;
var _ = require('lodash');

plan.target('production', {
    host: 'web.solab.rshu.ru',
    username: 'user',
    agent: process.env.SSH_AUTH_SOCK
  },
  {
    dir: '/home/user/siows-wiki',
    repo: 'https://github.com/nd0ut/Matterwiki.git',
    branch: 'siows-wiki'
  }
);

plan.remote(function(t) {
  var host = plan.runtime.options;

  t.exec(format('mkdir -p', host.dir));
  t.with(format('cd %s', host.dir), function() {

    t.exec(format('git fetch'));
    t.exec(format('git checkout', host.branch));
    t.exec('git pull');
    t.exec('npm install');
    t.exec('npm run start');
  });
});
