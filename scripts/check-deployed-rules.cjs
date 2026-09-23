/**
 * Authoritative check of what rules are ACTUALLY deployed to production:
 * reads the Firestore ruleset from the Firebase Rules API using the service
 * account, then diffs it against the local firestore.rules.
 *
 * Why not anonymous REST calls: App Check is enforced on this project, so a
 * token-less request returns 403 before rules are ever evaluated - that method
 * cannot distinguish "rules denied" from "App Check denied".
 */
const fs = require('fs');
const path = require('path');
const { GoogleAuth } = require('google-auth-library');

const PROJECT = 'guianegocios-prod';
const LOCAL = path.join(process.cwd(), 'firestore.rules');

async function main() {
  const key = require(path.join(process.cwd(), 'serviceAccountKey.json'));
  console.log('service account  :', key.client_email);

  const auth = new GoogleAuth({
    credentials: key,
    scopes: ['https://www.googleapis.com/auth/cloud-platform'],
  });
  const client = await auth.getClient();
  const tokenResponse = await client.getAccessToken();
  const token = tokenResponse.token || tokenResponse;
  if (!token) {
    console.log('\nRESULT: UNVERIFIED - no access token for service account.');
    return 1;
  }
  console.log('token acquired   : yes');

  const call = async (url) => {
    const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
    const text = await res.text();
    if (!res.ok) {
      console.log(`\nAPI ${res.status} for ${url}`);
      console.log(text.slice(0, 400));
      return null;
    }
    return JSON.parse(text);
  };

  const releases = await call(`https://firebaserules.googleapis.com/v1/projects/${PROJECT}/releases`);
  if (!releases) {
    console.log('\nRESULT: UNVERIFIED - cannot list releases with this service account.');
    return 1;
  }

  const release = (releases.releases || []).find((r) => (r.name || '').includes('cloud.firestore'));
  if (!release) {
    console.log('releases:', (releases.releases || []).map((r) => r.name));
    console.log('\nRESULT: UNVERIFIED - no cloud.firestore release found.');
    return 1;
  }

  console.log('release          :', release.name);
  console.log('ruleset          :', release.rulesetName);
  console.log('updateTime       :', release.updateTime);

  const ruleset = await call(`https://firebaserules.googleapis.com/v1/${release.rulesetName}`);
  if (!ruleset) {
    console.log('\nRESULT: UNVERIFIED - cannot fetch ruleset content.');
    return 1;
  }

  const file = (ruleset.source?.files || []).find((f) => f.name === 'firestore.rules');
  const deployed = file ? file.content : '';

  const norm = (t) => t.trim().split('\n').map((l) => l.replace(/\s+$/, '')).filter((l) => l.trim() !== '');
  const depLines = norm(deployed);
  const locLines = norm(fs.readFileSync(LOCAL, 'utf8'));

  console.log('deployed lines   :', depLines.length);
  console.log('local lines      :', locLines.length);

  if (JSON.stringify(depLines) === JSON.stringify(locLines)) {
    console.log('\nRESULT: MATCH - deployed rules are identical to the local file');
    return 0;
  }

  console.log('\nRESULT: MISMATCH');
  const diff = require('diff');
  void diff;
  const setDep = new Set(depLines);
  const onlyLocal = locLines.filter((l) => !setDep.has(l));
  const setLoc = new Set(locLines);
  const onlyDep = depLines.filter((l) => !setLoc.has(l));
  console.log('  lines only in local   :', JSON.stringify(onlyLocal.slice(0, 8), null, 1));
  console.log('  lines only in deployed:', JSON.stringify(onlyDep.slice(0, 8), null, 1));
  return 2;
}

main()
  .then((code) => process.exit(code))
  .catch((e) => {
    console.log('\nFAILED:', e.message);
    process.exit(1);
  });
