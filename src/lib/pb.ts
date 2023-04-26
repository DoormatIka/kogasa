import Pocketbase from "pocketbase";

const pb = new Pocketbase("http://127.0.0.1:8090");
async function addServer (serverID: string) {
  const listed = await pb
    .collection("server")
    .getList(1, 1, {
      filter: `serverid="${serverID}"`
    });
  if (listed.totalItems < 1) {
    const setting = await pb
      .collection("settings")
      .create({ sexy_limit: 0, hentai_limit: 0, porn_limit: 0 });

    await pb.collection("server").create({
      serverid: serverID,
      settings: setting.id,
    });
  }
}

await addServer("967277089692745760 0");
