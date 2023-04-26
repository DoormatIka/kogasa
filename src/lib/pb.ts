import Pocketbase from "pocketbase";
type Settings = {
  nsfwfiltersettings: {
    enablensfwfilter?: boolean,
    sexy_limit?: number,
    hentai_limit?: number,
    porn_limit?: number
  }
}

export async function addServer (pb: Pocketbase, serverID: string, settings?: Settings) {
  const server = await fetchServerRecord(pb, serverID);
  if (server.totalItems < 1) {
    const nsfwfiltersettings = await createDefaultSettings(pb, settings);
    await pb.collection("server").create({
      serverid: serverID,
      nsfwfiltersettings: nsfwfiltersettings.id,
    });
  }
}

export async function setSettings (pb: Pocketbase, serverID: string, setting: Settings) {
  const server = await fetchServerRecord(pb, serverID);
  const nsfwsettingID = server.items[0].nsfwfiltersettings;
  if (server.totalItems >= 1) {
    await pb
      .collection("nsfwfiltersettings")
      .update(nsfwsettingID, setting.nsfwfiltersettings);
  }
}

export async function getSettings (pb: Pocketbase, serverID: string) {
  const server = await fetchServerRecord(pb, serverID);
  return await pb.collection("nsfwfiltersettings")
    .getOne(server.items[0].nsfwfiltersettings);
}

async function createDefaultSettings (pb: Pocketbase, setting?: Settings) {
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

async function fetchServerRecord (pb: Pocketbase, serverID: string) {
  return await pb
    .collection("server")
    .getList(1, 1, {
      filter: `serverid="${serverID}"`
    });
}
