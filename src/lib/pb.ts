import Pocketbase from "pocketbase";
type Settings = {
  nsfwfiltersettings: {
    enablensfwfilter?: boolean,
    sexy_limit?: number,
    hentai_limit?: number,
    porn_limit?: number
  }
}

const pb = new Pocketbase("http://127.0.0.1:8090");

export async function addServer (serverID: string, settings?: Settings) {
  const server = await fetchServerRecord(serverID);
  if (server.totalItems < 1) {
    const nsfwfiltersettings = await createDefaultSettings(settings);
    await pb.collection("server").create({
      serverid: serverID,
      nsfwfiltersettings: nsfwfiltersettings.id,
    });
  }
}

export async function setSettings (serverID: string, setting: Settings) {
  const server = await fetchServerRecord(serverID);
  const nsfwsettingID = server.items[0].nsfwfiltersettings;
  if (server.totalItems >= 1) {
    await pb
      .collection("nsfwfiltersettings")
      .update(nsfwsettingID, setting.nsfwfiltersettings);
  }
}

export async function getSettings (serverID: string) {
  const server = await fetchServerRecord(serverID);
  return await pb.collection("nsfwfiltersettings")
    .getOne(server.items[0].nsfwfiltersettings);
}

async function createDefaultSettings (setting?: Settings) {
  const defaultSettings: Settings = {
    nsfwfiltersettings: {
      enablensfwfilter: false,
      sexy_limit: 50,
      hentai_limit: 50,
      porn_limit: 50,
    }
  };
  const nsfwfiltersettings = await pb
    .collection("nsfwfiltersettings")
    .create(setting?.nsfwfiltersettings ?? defaultSettings.nsfwfiltersettings);
  return nsfwfiltersettings;
}

async function fetchServerRecord (serverID: string) {
  return await pb
    .collection("server")
    .getList(1, 1, {
      filter: `serverid="${serverID}"`
    });
}

const servID = "967277089692745760 0";
await addServer(servID);
await setSettings(servID, {
  nsfwfiltersettings: {
    sexy_limit: 30,
    porn_limit: 10,
    enablensfwfilter: true
  }
});
