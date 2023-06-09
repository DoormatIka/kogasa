import Pocketbase, {ListResult} from "pocketbase";
import { Settings } from "../types/settings.js";

export async function addServer (
  pb: Pocketbase,
  serverID: string,
  settings?: Settings
) {
  const nsfwfiltersettings = await createSettings(pb, settings);
  await pb.collection("server").create({
    serverid: serverID,
    nsfwfiltersettings: nsfwfiltersettings.id,
  });
}

export async function setSettings (pb: Pocketbase, server: ListResult, setting: Settings) {
  const nsfwsettingID = server.items[0].nsfwfiltersettings;
  if (server.totalItems >= 1) {
    await pb
      .collection("nsfwfiltersettings")
      .update(nsfwsettingID, setting.nsfwfiltersettings);
  }
}

export async function getSettings (pb: Pocketbase, server: ListResult) {
  return await pb.collection("nsfwfiltersettings")
    .getOne(server.items[0].nsfwfiltersettings);
}

export async function createSettings (pb: Pocketbase, setting?: Settings) {
  const nsfwfiltersettings = await pb
    .collection("nsfwfiltersettings")
    .create(
      setting?.nsfwfiltersettings ?? returnDefaultSettings().nsfwfiltersettings
    );
  return nsfwfiltersettings;
}

export function returnDefaultSettings (): Settings {
  return {
    nsfwfiltersettings: {
      enablensfwfilter: false,
      sexy_limit: 50,
      hentai_limit: 50,
      porn_limit: 50,
    }
  };
}

export async function fetchServerRecord (pb: Pocketbase, serverID: string) {
  return await pb
    .collection("server")
    .getList(1, 1, {
      filter: `serverid="${serverID}"`
    });
}

export default { 
  fetchServerRecord, 
  setSettings, 
  getSettings, 
  createSettings, 
  addServer 
};
