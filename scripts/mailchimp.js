import fetchJsonp from 'fetch-jsonp';

export default function mailchimp(config, user) {
  const params = {
    u: config.u,
    id: config.id,
    EMAIL: user.email,
    FNAME: user.fname,
    LNAME: user.lname,
  };
  const qs = new URLSearchParams(Object.entries(params));

  return fetchJsonp(`https://${config.url}.list-manage.com/subscribe/post-json?${qs}`, {
    jsonpCallback: 'c',
    timeout: 3000,
  });
}
