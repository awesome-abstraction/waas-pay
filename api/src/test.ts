import { json } from "@helia/json";
import { createHelia } from "helia";
import { CID } from "multiformats/cid";

const run = async () => {
  const helia = await createHelia();
  const j = json(helia);

  // HELLO WORLD TEXT
  const cid = CID.parse(
    "bagaaierasords4njcts6vs7qvdjfcvgnume4hqohf65zsfguprqphs3icwea"
  );
  console.log("cid", cid);
  const result = await j.get(cid);

  console.log(result);
};

void run();
